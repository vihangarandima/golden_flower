// Hand-tuned 1.5px icons, sized to sit on the text baseline.
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const ArrowRight = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base}><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" /></svg>
);
export const ArrowUpRight = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base}><path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" /></svg>
);
export const Plus = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base}><path d="M8 2.5v11M2.5 8h11" /></svg>
);
export const Phone = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base}><path d="M5.6 2.5H3.8a1.3 1.3 0 0 0-1.3 1.4 10.3 10.3 0 0 0 9.6 9.6 1.3 1.3 0 0 0 1.4-1.3v-1.8l-2.6-1.1-1.3 1.3a7.2 7.2 0 0 1-3-3l1.3-1.3z" /></svg>
);
export const Pin = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base}><path d="M8 14s4.5-4 4.5-7.5a4.5 4.5 0 0 0-9 0C3.5 10 8 14 8 14z" /><circle cx="8" cy="6.5" r="1.6" /></svg>
);
export const Star = ({ className = "size-3.5" }: P) => (
  <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden><path d="m8 1.8 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z" /></svg>
);
export const Sun = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base}><path d="M1.5 11.5h13M4 11.5a4 4 0 0 1 8 0M8 3v1.5M3.2 5.7l1 1M12.8 5.7l-1 1" /></svg>
);
export const WhatsApp = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3z" />
  </svg>
);

// Brand mark: eight petals of dots around a centre, after the flower in the Golden Flower logo.
export const Mark = ({ className = "size-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <g fill="currentColor">
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <g key={i}>
            <circle cx={16 + Math.cos(a) * 9.5} cy={16 + Math.sin(a) * 9.5} r="2.4" />
            <circle cx={16 + Math.cos(a + Math.PI / 8) * 13.4} cy={16 + Math.sin(a + Math.PI / 8) * 13.4} r="1.1" opacity=".7" />
          </g>
        );
      })}
      <circle cx="16" cy="16" r="4" />
    </g>
  </svg>
);
