import { createElement, type ElementType } from "react";

// Splits a heading into masked words for the rising reveal. Wrap words in *asterisks* to set them in italic.
// Rendered on the server, so the text is in the HTML for search engines and no-JS visitors.
export function Words({ as = "h2", text, className = "", delay = 0 }: { as?: ElementType; text: string; className?: string; delay?: number }) {
  let italic = false;
  const parts = text.split(/(\*)/).flatMap((chunk) => {
    if (chunk === "*") { italic = !italic; return []; }
    return chunk.split(/(\s+)/).filter(Boolean).map((w) => ({ w, italic }));
  });
  return createElement(
    as,
    { className, "data-reveal": "", "data-delay": delay || undefined },
    <span className="sr-only">{text.replace(/\*/g, "")}</span>,
    ...parts.map(({ w, italic }, i) =>
      /^\s+$/.test(w) ? " " : (
        <span className="w" key={i} aria-hidden>
          <span>{italic ? <em>{w}</em> : w}</span>
        </span>
      ),
    ),
  );
}
