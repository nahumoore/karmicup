"use client";

import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useState } from "react";

type YouTubeEmbedProps = {
  /** YouTube video id (the `v=` parameter). */
  id: string;
  title: string;
  channel: string;
  channelUrl: string;
  /** Human-readable length, e.g. "9 min". */
  duration?: string;
  caption?: string;
};

/**
 * Click-to-load YouTube player. Until the reader clicks, the page only loads
 * the thumbnail, so the embed doesn't slow the article down or set YouTube
 * cookies (it uses the youtube-nocookie domain).
 */
export function YouTubeEmbed({
  id,
  title,
  channel,
  channelUrl,
  duration,
  caption,
}: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;

  return (
    <figure className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-ink shadow-[0_1px_2px_rgba(15,15,15,0.04)]">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 flex cursor-pointer items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail, no optimization needed */}
            <img
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-ink/20 transition-colors group-hover:bg-ink/10" />
            <span className="relative flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform group-hover:scale-105">
              <IconPlayerPlayFilled size={26} className="ml-1" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 text-[14px] leading-[22px] text-ink-secondary">
        {caption && <span>{caption}</span>}
        <span className="text-[12px] text-muted-foreground">
          Video:{" "}
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-2 transition-colors hover:text-ink"
          >
            {title}
          </a>{" "}
          by{" "}
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-2 transition-colors hover:text-ink"
          >
            {channel}
          </a>
          {duration ? ` · ${duration}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}
