"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { formatColombo, sunset } from "@/lib/sun";

/** Today's sunset at the venue's coordinates, in Sri Lanka time. Rendered after mount (date-dependent). */
export function SunsetTime({ fallback = "around 6 PM" }: { fallback?: string }) {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => setT(formatColombo(sunset(new Date(), site.geo.lat, site.geo.lng))), []);
  return <time className="tabular-nums" suppressHydrationWarning>{t ?? fallback}</time>;
}
