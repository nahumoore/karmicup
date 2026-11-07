/**
 * Renders a JSON-LD structured data block. Server component: the script is
 * part of the initial HTML, so crawlers that don't run JS (most LLM bots) see it.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
