// Sunset time for a given day and place (NOAA simplified algorithm, ±2 min).
export function sunset(date: Date, lat: number, lng: number): Date {
  const rad = Math.PI / 180;
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 864e5);
  const g = ((2 * Math.PI) / 365) * (day - 1);
  const eqTime = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl)) / rad;
  const minutesUtc = 720 - 4 * (lng - ha) - eqTime;
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) + minutesUtc * 60000);
}

// Sri Lanka has no daylight saving: always UTC+5:30.
export function formatColombo(d: Date) {
  return d.toLocaleTimeString("en-LK", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Colombo" }).replace(/\s?([ap])\.?m\.?/i, (_, x) => ` ${x.toUpperCase()}M`);
}
