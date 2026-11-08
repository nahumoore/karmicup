import { cn } from "@/lib/utils";
import {
  IconArrowBigUp,
  IconCheck,
  IconMessageCircle,
  IconX,
} from "@tabler/icons-react";

type Comment = {
  /** Fictional username shown above the comment. */
  user: string;
  body: string;
  /** Short explanation of why the comment works or doesn't. */
  why: string;
};

function CommentCard({ comment, good }: { comment: Comment; good: boolean }) {
  return (
    <figure
      className={cn(
        "m-0 flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-[0_1px_2px_rgba(15,15,15,0.04)]",
        good ? "border-border" : "border-hairline",
      )}
    >
      <figcaption className="flex items-center gap-2 text-[13px] font-semibold">
        <span
          className={cn(
            "flex size-5 items-center justify-center rounded-full",
            good ? "bg-brand-tint text-primary" : "bg-surface text-muted-foreground",
          )}
        >
          {good ? <IconCheck size={13} stroke={2.5} /> : <IconX size={13} stroke={2.5} />}
        </span>
        <span className={good ? "text-ink" : "text-muted-foreground"}>
          {good ? "Gets upvoted" : "Gets ignored"}
        </span>
      </figcaption>

      <blockquote className="m-0 flex flex-col gap-2 rounded-lg bg-surface p-3.5">
        <p className="m-0 text-[12px] font-medium text-muted-foreground">
          u/{comment.user}
        </p>
        <p className="m-0 text-[15px] leading-6 whitespace-pre-line text-ink">
          {comment.body}
        </p>
        <p
          aria-hidden
          className="m-0 flex items-center gap-3 text-[12px] font-medium text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1">
            <IconArrowBigUp size={14} /> Vote
          </span>
          <span className="inline-flex items-center gap-1">
            <IconMessageCircle size={14} /> Reply
          </span>
        </p>
      </blockquote>

      <p className="m-0 text-[14px] leading-[22px] text-ink-secondary">
        {comment.why}
      </p>
    </figure>
  );
}

/**
 * Side-by-side example of a weak vs a strong Reddit comment replying to the
 * same post. The examples are illustrative, not real Reddit comments.
 */
export function CommentExample({
  post,
  bad,
  good,
}: {
  /** Title of the (fictional) post both comments reply to. */
  post: string;
  bad: Comment;
  good: Comment;
}) {
  return (
    <section
      aria-label="Example: weak vs strong comment"
      className="my-8 rounded-xl border border-border bg-surface p-4 sm:p-5"
    >
      <p className="mt-0 mb-4 text-[13px] text-muted-foreground">
        Example post: <span className="font-semibold text-ink">{post}</span>
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <CommentCard comment={bad} good={false} />
        <CommentCard comment={good} good />
      </div>
    </section>
  );
}
