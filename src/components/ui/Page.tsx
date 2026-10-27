import { ViewTransition, type ReactNode } from "react";
import { Words } from "./Words";

// Each route's content cross-fades on navigation (React <ViewTransition>, no animation library).
export function Page({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <main id="main">{children}</main>
    </ViewTransition>
  );
}

// Standard inner-page opener: kicker, big headline, a line of plain copy.
export function PageHead({ kicker, title, lede, children }: { kicker: string; title: string; lede?: string; children?: ReactNode }) {
  return (
    <header className="wrap pt-36 md:pt-48 pb-12 md:pb-20">
      <p className="kicker" data-fade>{kicker}</p>
      <Words as="h1" text={title} className="display mt-6 text-[clamp(3rem,9vw,8.5rem)] max-w-[14ch]" />
      {lede && <p className="mt-8 max-w-[52ch] text-lg md:text-xl text-ink-2" data-fade>{lede}</p>}
      {children}
    </header>
  );
}
