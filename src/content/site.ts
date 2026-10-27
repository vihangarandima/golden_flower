// Everything a couple reads about the business lives here.
// Facts marked "verified" came from the Google Business listing / Facebook page / the
// decor banner in the promo footage (Oct 2026). Anything marked TODO needs the owner's word.

export const site = {
  name: "Golden Flower",
  legalName: "Hotel Golden Flower & Golden Flower Wedding Arrangement", // verified (Google)
  tagline: "Weddings in the garden on Airport Road",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://goldenflower.lk", // TODO: real domain

  address: {
    line1: "No 54, Airport Road", // verified (decor banner)
    town: "Hingurakgoda",
    district: "Polonnaruwa District",
    country: "Sri Lanka",
  },
  geo: { lat: 8.0431788, lng: 80.9569833 }, // verified (Google Maps pin)
  mapUrl:
    "https://www.google.com/maps/place/Hotel+Golden+Flower+%26+Golden+flower+Wedding+Arrangement/@8.0431788,80.9569833,17z",

  phones: [
    { label: "Weddings & décor", number: "077 337 6871", tel: "+94773376871" }, // verified (banner)
    { label: "Weddings & décor", number: "071 992 2350", tel: "+94719922350" }, // verified (banner)
    { label: "Bookings", number: "071 160 9609", tel: "+94711609609" }, // verified (Facebook)
    { label: "Hotel front desk", number: "027 224 6339", tel: "+94272246339" }, // verified (Google)
  ],
  whatsapp: { number: "071 992 2366", intl: "94719922366" }, // verified (banner)
  email: "", // TODO: add a real address; the enquiry form still works without it
  officeHours: "Office opens 9 AM daily", // verified opening time; TODO: closing time

  social: {
    facebook: "https://www.facebook.com/search/top?q=Golden%20Flower%20Wedding%20Arrangement", // TODO: exact page URL
    instagram: "https://www.instagram.com/explore/search/keyword/?q=golden%20flower%20wedding%20arrangement", // TODO: exact handle
  },

  reviews: {
    google: { rating: 3.9, count: 265, url: "https://www.google.com/maps/place/Hotel+Golden+Flower+%26+Golden+flower+Wedding+Arrangement/@8.0431788,80.9569833,17z" },
    facebook: { rating: 4.6, count: 18, followers: "6.2K" },
  },

  // Plain-language travel times. TODO: confirm with the owner before launch.
  nearby: [
    { place: "Minneriya National Park", note: "the elephant gathering, Jul–Oct", time: "about 20 min" },
    { place: "Polonnaruwa ancient city", note: "UNESCO World Heritage", time: "about 40 min" },
    { place: "Giritale tank", note: "sunset photographs", time: "about 30 min" },
    { place: "Sigiriya", note: "for a day-after outing", time: "about 1 hr 15 min" },
  ],
} as const;

export const nav = [
  { href: "/weddings", label: "Weddings" },
  { href: "/venues", label: "Venues" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/stay", label: "Stay" },
] as const;

export const menu = [
  { href: "/weddings", label: "Weddings", photo: "garden-ceremony" },
  { href: "/venues", label: "The garden & hall", photo: "garden-night" },
  { href: "/packages", label: "Packages", photo: "table-centrepiece" },
  { href: "/planning", label: "How we plan", photo: "stage-sofa" },
  { href: "/gallery", label: "Gallery", photo: "head-table" },
  { href: "/stay", label: "Rooms", photo: "room" },
  { href: "/dining", label: "Food & catering", photo: "table-centrepiece" },
  { href: "/celebrations", label: "Other celebrations", photo: "banquet-hall" },
  { href: "/about", label: "About us", photo: "entrance-arch" },
  { href: "/contact", label: "Contact", photo: "reception-lobby" },
] as const;
