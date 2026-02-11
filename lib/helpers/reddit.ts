const REDDIT_USER_AGENT =
  "web:com.karmicup.app:v1.0.0 (by /u/karmicup)";

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 500;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type RedditFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export async function redditFetch<T = unknown>(
  path: string,
  options: RedditFetchOptions = {},
): Promise<T> {
  const url = path.startsWith("http")
    ? path
    : `https://www.reddit.com${path}`;

  const headers: Record<string, string> = {
    "User-Agent": REDDIT_USER_AGENT,
    Accept: "application/json",
    ...options.headers,
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      await sleep(RETRY_DELAY_MS * attempt);
    }

    let response: Response;

    try {
      response = await fetch(url, { ...options, headers });
    } catch (networkError) {
      lastError = networkError instanceof Error
        ? networkError
        : new Error(String(networkError));

      if (attempt < MAX_RETRIES) continue;
      throw lastError;
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
