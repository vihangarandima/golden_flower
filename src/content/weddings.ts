import type { PhotoKey } from "./photos";

export type Venue = {
  slug: string;
  name: string;
  setting: "Outdoor" | "Indoor";
  capacity: number | null; // TODO: owner to confirm seated capacity
  bestFor: ("Ceremony" | "Reception" | "Homecoming" | "Engagement")[];
  photo: PhotoKey;
  gallery: PhotoKey[];
  short: string;
  long: string[];
  details: string[];
};

export const venues: Venue[] = [
  {
    slug: "the-garden",
    name: "The Garden",
    setting: "Outdoor",
    capacity: null,
    bestFor: ["Ceremony", "Reception", "Engagement"],
    photo: "garden-ceremony",
    gallery: ["garden-ceremony", "garden-night", "entrance-arch"],
    short: "A lawn under old shade trees. Ceremony by day, a reception under string lights after dark.",
    long: [
      "The garden sits behind the hotel, away from Airport Road. Big trees keep the midday sun off the lawn, which is why morning ceremonies here stay comfortable even in August.",
      "We set the ceremony on a raised green platform with a flower ring or arch, gold chairs in rows facing it. After sunset the same lawn becomes the reception: round tables, warm bulbs strung between the branches, and paper lanterns.",
    ],
    details: [
      "Raised ceremony platform",
      "Poruwa, arch or flower-ring backdrops",
      "String lights and lanterns for evening",
      "Rain plan: move to the hall",
    ],
  },
  {
    slug: "the-hall",
    name: "The Banquet Hall",
    setting: "Indoor",
    capacity: null,
    bestFor: ["Reception", "Homecoming", "Engagement"],
    photo: "banquet-hall",
    gallery: ["banquet-hall", "hall-event", "stage-sofa", "head-table"],
    short: "A pillared hall that takes any colour we dress it in. Weather-proof, with its own stage.",
    long: [
      "The hall is the answer to the monsoon, and to families who want a classic reception with a head table, a dressed stage and a dance floor.",
      "Our décor team builds the stage here: floral walls, carved settees, hanging roses over the head table. Chair covers and sashes are matched to your colours.",
    ],
    details: [
      "Dressed stage with settee",
      "Head table and dance floor",
      "Chair covers in your colours",
      "Kitchen next door for hot buffets",
    ],
  },
];

// The horizontal "spaces" strip on the home page: one place, different moments.
export const moments: { title: string; caption: string; photo: PhotoKey; href: string }[] = [
  { title: "The ceremony lawn", caption: "Morning, under the trees", photo: "garden-ceremony", href: "/venues/the-garden" },
  { title: "The garden after dark", caption: "Reception under the lights", photo: "garden-night", href: "/venues/the-garden" },
  { title: "The stage", caption: "Built by our own décor team", photo: "stage-sofa", href: "/planning" },
  { title: "The table", caption: "Centrepieces made the same morning", photo: "table-centrepiece", href: "/dining" },
  { title: "The hall", caption: "For the monsoon, and for dancing", photo: "banquet-hall", href: "/venues/the-hall" },
];

// The pinned "day" sequence. Times are an example day; the sunset row is calculated live.
export const theDay: { time: string; title: string; body: string; photo: PhotoKey; sunset?: boolean }[] = [
  { time: "8:40 AM", title: "Your nekath", body: "The ceremony starts at the auspicious time your family's astrologer gives, to the minute. We build the day backwards from it.", photo: "garden-ceremony" },
  { time: "9:15 AM", title: "Poruwa & vows", body: "Jayamangala gatha, the white thread, the oil lamp. Or a church blessing, a Hindu ceremony, a registration. We have set all of them on this lawn.", photo: "entrance-arch" },
  { time: "12:30 PM", title: "Lunch in the hall", body: "Rice and curry from our own kitchen, served hot. The hall is a few steps from the lawn.", photo: "banquet-hall" },
  { time: "", title: "Sunset photographs", body: "The light goes gold over the paddy fields around Hingurakgoda. Twenty minutes is enough.", photo: "head-table", sunset: true },
  { time: "7:30 PM", title: "Reception under the lights", body: "The garden again, now with round tables, lanterns and every bulb lit.", photo: "garden-night" },
];

export const journey = [
  { step: "Call or message", body: "Tell us your date (or your nekath) and roughly how many guests. We'll tell you straight away if the garden or hall is free." },
  { step: "Walk the garden", body: "Come and see it, ideally at the time of day your ceremony will be. Bring your parents; they usually have the most questions." },
  { step: "Choose the look", body: "We show you real stages and tables we've built, then sketch yours: colours, flowers, the settee, the backdrop." },
  { step: "Taste the menu", body: "Sit down for a tasting with the people who'll cook on the day. Change anything." },
  { step: "The week before", body: "Final numbers, seating and timings. Our décor team builds the night before and the morning of." },
  { step: "The day, and after", body: "One coordinator stays with your family all day. Rooms are ready upstairs for anyone who'd rather not drive home." },
];

export type Package = {
  name: string;
  for: string;
  priceFrom: number | null; // LKR. null = "rates on request" (current listing policy)
  includes: string[];
  photo: PhotoKey;
};

// TODO: owner to confirm inclusions and, if they want them public, prices.
export const packages: Package[] = [
  {
    name: "Garden Ceremony",
    for: "Morning ceremony with tea or lunch",
    priceFrom: null,
    includes: ["The garden, morning to early afternoon", "Ceremony platform and backdrop", "Gold chairs for guests", "Welcome drink and tea", "Our coordinator on the day"],
    photo: "garden-ceremony",
  },
  {
    name: "Reception",
    for: "Evening in the garden or the hall",
    priceFrom: null,
    includes: ["Garden or hall for the evening", "Dressed stage with settee", "Table centrepieces and chair covers", "Buffet dinner from our kitchen", "Lighting, sound connection, dance floor"],
    photo: "garden-night",
  },
  {
    name: "Wedding & Homecoming",
    for: "Both days, one team",
    priceFrom: null,
    includes: ["Ceremony and reception venues", "Two stage designs, two colour stories", "Lunch and dinner menus", "Rooms for the couple on the night", "One coordinator across both days"],
    photo: "stage-sofa",
  },
];

// Optional per-head rates for the planner. Leave null to keep "rates on request".
export const plannerRates: { perHead: Record<"garden" | "hall", number | null>; currency: string } = {
  perHead: { garden: null, hall: null }, // TODO: e.g. { garden: 6500, hall: 5500 }
  currency: "LKR",
};

export const services = ["Venue", "Décor & stage", "Catering", "Rooms", "Photography contacts", "Cake", "Music & DJ contacts"] as const;

export const ceremonyTypes = ["Poruwa (Buddhist)", "Hindu", "Christian", "Muslim (Nikah)", "Registration only", "Homecoming", "Engagement"] as const;

export const faqs = [
  { q: "Can you work around our nekath time?", a: "Yes. Most of our morning ceremonies start at an auspicious time set by the family's astrologer, sometimes as early as 6 AM. Tell us the time and we plan the whole day from it." },
  { q: "What happens if it rains?", a: "We keep the hall on hold for garden bookings in the monsoon months. If the sky looks wrong on the morning, we decide together and move the setup indoors." },
  { q: "Do you decorate at other venues?", a: "Our décor team (Golden Flower Wedding Arrangement) does take outside bookings. Call us with the venue and date." },
  { q: "Can guests stay overnight?", a: "Yes, we have rooms at the hotel for the couple and family. Book early for wedding weekends; they go first." },
  { q: "Can we bring our own photographer or band?", a: "Of course. We can also introduce people we've worked with many times." },
  { q: "How far ahead should we book?", a: "Popular nekath dates fill months ahead, especially in April and from August to September. Message us as soon as you have a date." },
];
