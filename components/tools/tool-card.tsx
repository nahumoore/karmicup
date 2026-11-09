import { TOOL_ICONS, ToolPreview } from "@/components/tools/tool-preview";
import type { FreeTool } from "@/content/tools/registry";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

/** Card linking to a free tool, with a mini preview of its result. */
export function ToolCard({
  tool,
  headingLevel = "h2",
}: {
  tool: FreeTool;
  headingLevel?: "h2" | "h3";
}) {
  const Icon = TOOL_ICONS[tool.preview];
  const Heading = headingLevel;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-[0_1px_2px_rgba(15,15,15,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-[#D5D5D1] hover:shadow-[0_1px_2px_rgba(15,15,15,0.04),0_16px_40px_rgba(15,15,15,0.08)]">
      <ToolPreview kind={tool.preview} />
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand-tint text-primary">
          <Icon size={18} />
        </span>
        <Heading className="m-0 font-heading text-[20px] leading-[1.25] font-bold tracking-[-0.02em] text-ink">
          <Link
            href={`/tools/${tool.slug}`}
            className="after:absolute after:inset-0 group-hover:text-primary"
          >
            {tool.name}
          </Link>
        </Heading>
        <p className="m-0 text-[15px] leading-6 text-ink-secondary">{tool.excerpt}</p>
        <p className="mt-auto flex items-center justify-between gap-3 pt-3 text-[13px]">
          <span className="text-muted-foreground">Input: {tool.input}</span>
          <span className="inline-flex shrink-0 items-center gap-1 font-medium text-ink">
            Open tool
            <IconArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </p>
      </div>
    </article>
  );
}
