import { NextResponse } from "next/server";

// Simple per-IP rate limit (per server instance). Swap for Upstash/Redis if traffic grows.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000, MAX = 5;

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!).slice(0, 2000);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= MAX) return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  // Honeypot: bots fill every field. Pretend success.
  if (body.company) return NextResponse.json({ ok: true });
  if (!body.names || !body.phone) return NextResponse.json({ ok: false, error: "Missing names or phone" }, { status: 422 });

  const rows = [
    ["Names", body.names], ["Phone", body.phone], ["Email", body.email],
    ["Date", body.date || (body.flexible ? "Flexible" : "")], ["Nekath", body.nekath], ["Guests", body.guests],
    ["Venue", body.venue], ["Ceremony", body.ceremony], ["Services", Array.isArray(body.services) ? body.services.join(", ") : ""],
    ["Message", body.message],
  ];

  const key = process.env.RESEND_API_KEY, to = process.env.ENQUIRY_TO_EMAIL;
  if (key && to) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL ?? "Golden Flower website <onboarding@resend.dev>",
        to,
        reply_to: typeof body.email === "string" && body.email ? body.email : undefined,
        subject: `Wedding enquiry: ${esc(body.names)} · ${esc(body.date || "flexible")}`,
        html: `<table>${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${esc(v)}</td></tr>`).join("")}</table>`,
      }),
    });
    if (!r.ok) return NextResponse.json({ ok: false }, { status: 502 });
  } else {
    // No email provider configured yet: log so enquiries aren't lost in development.
    console.log("[enquiry]", Object.fromEntries(rows));
  }
  return NextResponse.json({ ok: true });
}
