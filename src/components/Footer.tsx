import Link from "next/link";
import { site } from "@/content/site";
import { ArrowUpRight, Mark, Star } from "./ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark border-t border-white/10 bg-lawn text-on-lawn">
      <div className="wrap pt-20 pb-24 md:pt-28 md:pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Mark className="size-10 text-gold-light" />
            <p className="display mt-6 text-[clamp(2.4rem,4.6vw,4rem)] leading-none">Golden Flower</p>
            <p className="mt-4 max-w-[34ch] text-on-lawn-2">A hotel, a garden, a hall and a décor team on Airport Road, Hingurakgoda.</p>
            <p lang="si" className="font-sinhala mt-6 text-gold-light">සුභ මංගලම්</p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-sm text-on-lawn-2">Visit</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {site.address.line1}<br />{site.address.town}, {site.address.country}
            </address>
            <a href={site.mapUrl} target="_blank" rel="noopener" className="link-draw mt-3 inline-flex items-center gap-1 text-gold-light">
              Open in Maps <ArrowUpRight className="size-3.5" />
            </a>
            <p className="mt-6 text-sm text-on-lawn-2">{site.officeHours}</p>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-sm text-on-lawn-2">Talk to us</h2>
            <ul className="mt-4 space-y-1.5">
              {site.phones.map((p) => (
                <li key={p.tel} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-1.5">
                  <a href={`tel:${p.tel}`} className="tabular-nums hover:text-gold-light">{p.number}</a>
                  <span className="text-sm text-on-lawn-2">{p.label}</span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-4 pb-1.5">
                <a href={`https://wa.me/${site.whatsapp.intl}`} target="_blank" rel="noopener" className="tabular-nums hover:text-gold-light">{site.whatsapp.number}</a>
                <span className="text-sm text-on-lawn-2">WhatsApp</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-on-lawn-2 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={site.social.facebook} target="_blank" rel="noopener" className="hover:text-on-lawn inline-flex items-center gap-1.5">
              Facebook · <Star className="size-3 text-gold-light" /> {site.reviews.facebook.rating} ({site.reviews.facebook.count} reviews)
            </a>
            <a href={site.reviews.google.url} target="_blank" rel="noopener" className="hover:text-on-lawn inline-flex items-center gap-1.5">
              Google · <Star className="size-3 text-gold-light" /> {site.reviews.google.rating} ({site.reviews.google.count} reviews)
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener" className="hover:text-on-lawn">Instagram</a>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-on-lawn">Privacy</Link>
            <Link href="/terms" className="hover:text-on-lawn">Terms</Link>
            <span>© {year} {site.legalName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
