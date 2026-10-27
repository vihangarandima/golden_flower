// Analytics hook. Pushes to window.dataLayer (GTM / GA4 pick it up) and fires a DOM event
// so any other tool can listen without touching components.
type EventName = "enquiry_started" | "enquiry_step" | "enquiry_completed" | "whatsapp_click" | "call_click" | "planner_used";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

export function track(event: EventName, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer ??= []).push({ event, ...data });
  window.dispatchEvent(new CustomEvent("gf:track", { detail: { event, ...data } }));
}

export function whatsappLink(intl: string, text: string) {
  return `https://wa.me/${intl}?text=${encodeURIComponent(text)}`;
}
