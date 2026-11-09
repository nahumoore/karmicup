const REDDIT_USER_AGENT =
  "web:com.karmicup.app:v1.0.0 (by /u/karmicup)";

const PUBLIC_BASE_URL = "https://www.reddit.com";
const OAUTH_BASE_URL = "https://oauth.reddit.com";
const TOKEN_URL = "https://www.reddit.com/api/v1/access_token";

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 500;
/** Renew the token this long before Reddit says it expires. */
const TOKEN_EXPIRY_MARGIN_MS = 5 * 60 * 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type RedditFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

// ---------------------------------------------------------------------------
// OAuth (app-only)
// ---------------------------------------------------------------------------

/**
 * Reddit answers 403 to unauthenticated requests from datacenter IPs,
 * including Cloudflare Workers. With REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET
 * set, requests use an app-only OAuth token ("client_credentials", no Reddit
 * user involved) against oauth.reddit.com, which isn't blocked. App-only
 * requests see the same public data as a logged-out visitor.
 */
let cachedToken: { value: string; expiresAt: number } | null = null;
let pendingToken: Promise<string> | null = null;

function oauthCredentials(): { id: string; secret: string } | null {
  const id = process.env.REDDIT_CLIENT_ID;
  const secret = process.env.REDDIT_CLIENT_SECRET;
  return id && secret ? { id, secret } : null;
}

async function requestAppToken(id: string, secret: string): Promise<string> {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": REDDIT_USER_AGENT,
      Accept: "application/json",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new RedditApiError(
      response.status,
      `Reddit OAuth error: ${response.status} ${response.statusText}`,
    );
  }

  const body = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!body.access_token) {
    throw new RedditApiError(401, "Reddit OAuth error: no access token returned");
  }

  cachedToken = {
    value: body.access_token,
    expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 - TOKEN_EXPIRY_MARGIN_MS,
  };
  return cachedToken.value;
}

/** App-only token, cached per worker instance. Null when no credentials are set. */
async function getAppToken(): Promise<string | null> {
  const credentials = oauthCredentials();
  if (!credentials) return null;
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  // Concurrent requests share one token request.
  pendingToken ??= requestAppToken(credentials.id, credentials.secret).finally(() => {
    pendingToken = null;
  });
  return pendingToken;
}

/** Relative paths and www/old.reddit.com URLs → the host that matches the auth mode. */
function toRedditUrl(path: string, useOAuth: boolean): string {
  const base = useOAuth ? OAUTH_BASE_URL : PUBLIC_BASE_URL;
  if (!path.startsWith("http")) return `${base}${path}`;
  return useOAuth
    ? path.replace(/^https?:\/\/(?:www\.|old\.)?reddit\.com/i, OAUTH_BASE_URL)
    : path;
}

// ---------------------------------------------------------------------------
// Requests
// ---------------------------------------------------------------------------

/**
 * Server-side request to Reddit's JSON API. Use it for every Reddit call
 * (see "Reddit API Calls" in AGENTS.md):
 * - `User-Agent` header (required by Reddit) and OAuth token when configured
 * - retries (up to 2) on network errors and 5xx, waits on 429 (`Retry-After`)
 * - no retries on other 4xx; an expired token (401) is renewed once
 */
export async function redditFetch<T = unknown>(
  path: string,
  options: RedditFetchOptions = {},
): Promise<T> {
  let token = await getAppToken();
  let renewedToken = false;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      await sleep(RETRY_DELAY_MS * attempt);
    }

    const url = toRedditUrl(path, Boolean(token));
    const headers: Record<string, string> = {
      "User-Agent": REDDIT_USER_AGENT,
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    let response: Response;

    try {
      response = await fetch(url, {
        ...options,
        headers,
        cache: "no-store",
        // Cloudflare Workers: bypass subrequest cache so Reddit always returns fresh data
        cf: { cacheTtl: 0, cacheEverything: false },
      } as RequestInit);
    } catch (networkError) {
      lastError = networkError instanceof Error
        ? networkError
        : new Error(String(networkError));

      if (attempt < MAX_RETRIES) continue;
      throw lastError;
    }

    // Token expired or revoked: get a new one and try again, once.
    if (response.status === 401 && token && !renewedToken) {
      cachedToken = null;
      token = await getAppToken();
      renewedToken = true;
      attempt--;
      continue;
    }

    // Don't retry on 4xx (client errors), except 429 (rate limited)
    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : RETRY_DELAY_MS * (attempt + 1);

      if (attempt < MAX_RETRIES) {
        await sleep(waitMs);
        continue;
      }
    }

    if (response.status >= 400 && response.status < 500 && response.status !== 429) {
      throw new RedditApiError(response.status, `Reddit API error: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      lastError = new RedditApiError(response.status, `Reddit API error: ${response.status} ${response.statusText}`);

      if (attempt < MAX_RETRIES) continue;
      throw lastError;
    }

    return response.json() as Promise<T>;
  }

  throw lastError ?? new Error("Reddit fetch failed after retries");
}

export class RedditApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "RedditApiError";
  }
}
