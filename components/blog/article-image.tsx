import Image from "next/image";
import type { ReactNode } from "react";

/** Attribution for images we don't own (Creative Commons, public domain...). */
export type ImageCredit = {
  /** Author or source name, e.g. "ajay_suresh" or "Wikimedia Commons". */
  author: string;
  authorUrl?: string;
  /** Short license name, e.g. "CC BY 2.0" or "Public domain". */
  license: string;
  licenseUrl?: string;
  /** Page where the original image is published. */
  sourceUrl: string;
  /** Required by CC licenses when we crop or edit the original. */
  modified?: boolean;
};

const creditLinkClass =
  "underline decoration-border underline-offset-2 transition-colors hover:text-ink";

function CreditLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <>{children}</>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={creditLinkClass}>
      {children}
    </a>
  );
}

export function ImageCreditLine({ credit }: { credit: ImageCredit }) {
  return (
    <span className="block text-[12px] text-muted-foreground">
      <CreditLink href={credit.sourceUrl}>Image</CreditLink> by{" "}
      <CreditLink href={credit.authorUrl}>{credit.author}</CreditLink>,{" "}
      <CreditLink href={credit.licenseUrl}>{credit.license}</CreditLink>
      {credit.modified ? ". Cropped." : "."}
    </span>
  );
}

type ArticleImageProps = {
  /** Path under /public, e.g. "/blog/<slug>/<file>.webp". */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
  credit?: ImageCredit;
  /** Use for the cover image (above the fold): loads eagerly with high priority. */
  priority?: boolean;
};

/**
 * Article image with an optional caption and license credit. Images are
 * pre-compressed WebP files in /public, so they're served as-is (unoptimized).
 */
export function ArticleImage({
  src,
  alt,
  width,
  height,
  caption,
  credit,
  priority = false,
}: ArticleImageProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,15,15,0.04)]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes="(min-width: 768px) 720px, 100vw"
          className="block h-auto w-full"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 flex flex-col gap-1 text-[14px] leading-[22px] text-ink-secondary">
          {caption && <span>{caption}</span>}
          {credit && <ImageCreditLine credit={credit} />}
        </figcaption>
      )}
    </figure>
  );
}
