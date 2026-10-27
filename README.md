# Golden Flower — wedding website

Website for **Hotel Golden Flower & Golden Flower Wedding Arrangement**, No 54 Airport Road, Hingurakgoda.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

Everything a visitor reads lives in `src/content/`. No component needs touching for everyday edits.

| File | What's in it |
| --- | --- |
| `site.ts` | Name, address, phone numbers, WhatsApp, map pin, review counts, nearby places |
| `weddings.ts` | Venues, the "day" timeline, planning steps, packages, FAQ, planner rates |
| `pages.ts` | Rooms, dining, other celebrations |
| `photos.ts` | Every photo: file, size, alt text |

Search the project for `TODO` to find everything that still needs the owner's word: venue capacities, package inclusions and prices, room types, menus, email address, exact Facebook and Instagram URLs, travel times, and the About story.

### Prices
Packages show **"Rates on request"** while `priceFrom` is `null`. Put a number in (LKR) to show "From LKR …".
The planner on `/packages` shows an indicative total only if `plannerRates.perHead` has values.

### Photos
Drop a new file into `public/assets/photos/`, then point a key in `src/content/photos.ts` at it (update `w`, `h` and `alt`). Every page using that key updates.

The current photos come from the business's own Google Maps listing and promo footage. They were enhanced with:
EDSR ×2 neural super-resolution (OpenCV `dnn_superres`) for small originals, light denoise, CLAHE local contrast, a gentle filmic curve, vibrance and a warm grade, then sharpening.
Contact banners and watermarks were cropped out. Originals from the photographer will always look better: swap them in when you have them.

**Before launch:** confirm the couple in `head-table.jpg` and guests in `hall-event.jpg` are happy to appear on the site.

### Video
`public/assets/video/garden-night.mp4` is a 7-second, 360×640 clip. On phones it plays full-screen behind the hero; on desktop it plays in a portrait "film card", because stretching 360p to a wide screen would look soft. A 1080p clip from the venue would improve this.

## Enquiries

The form on `/contact` posts to `src/app/api/enquiry/route.ts` (honeypot + per-IP rate limit).
To receive enquiries by email, copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM_EMAIL` ([resend.com](https://resend.com)). Without them, enquiries are written to the server log.

## Analytics

`src/lib/track.ts` pushes `enquiry_started`, `enquiry_step`, `enquiry_completed`, `whatsapp_click`, `call_click` and `planner_used` to `window.dataLayer`. Add Google Tag Manager or GA4 and the events arrive with no further code.

## Design notes

- Palette comes from the venue itself: frangipani white, the gold chiavari chairs, the deep green of the lawn at dusk.
- Bodoni Moda for display, the system UI font (SF Pro on Apple devices) for everything else, Noto Serif Sinhala for the Sinhala touches.
- Signature moment: on the home page the "day" timeline turns the page from daylight to night once you scroll past sunset. The sunset time is calculated live for the venue's coordinates.
- Motion respects `prefers-reduced-motion`; smooth scrolling and parallax switch off on low-power devices and Save-Data connections.

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com): no configuration needed. Set `NEXT_PUBLIC_SITE_URL` to the real domain so canonical links, the sitemap and Open Graph tags are correct.
