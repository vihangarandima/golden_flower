// Photos come from the business's own Google listing, enhanced (EDSR x2 upscale,
// denoise, local contrast, warm grade) — see README. Replace with originals from the
// photographer when available; keep the same keys and the whole site updates.

export type PhotoKey = keyof typeof photos;

export const photos = {
  "garden-ceremony": {
    src: "/assets/photos/garden-ceremony.jpg",
    w: 2400, h: 1350,
    alt: "Ceremony lawn set with gold chairs, white floral arches and a pink-and-white flower ring under string lights",
    caption: "The ceremony lawn, set for a morning wedding",
  },
  "garden-night": {
    src: "/assets/photos/garden-night.jpg",
    w: 1080, h: 1920,
    alt: "The garden at night: guests at round tables beneath strings of warm bulbs and paper lanterns",
    caption: "The same lawn after dark",
  },
  "stage-sofa": {
    src: "/assets/photos/stage-sofa.jpg",
    w: 2400, h: 1110,
    alt: "A carved gold settee in front of a wall of white roses and greenery, lit from below",
    caption: "A stage by our décor team",
  },
  "table-centrepiece": {
    src: "/assets/photos/table-centrepiece.jpg",
    w: 2400, h: 844,
    alt: "Round table with a tall pink and white rose centrepiece, mustard napkins and glassware",
    caption: "Centrepieces, made the same morning",
  },
  "entrance-arch": {
    src: "/assets/photos/entrance-arch.jpg",
    w: 2048, h: 1460,
    alt: "The hotel's green pavilion entrance framed by a white flower arch",
    caption: "The entrance pavilion",
  },
  "head-table": {
    src: "/assets/photos/head-table.jpg",
    w: 2400, h: 1800,
    alt: "A couple at the head table beneath hanging roses and filament bulbs",
    caption: "The head table",
  },
  "banquet-hall": {
    src: "/assets/photos/banquet-hall.jpg",
    w: 2400, h: 1800,
    alt: "The banquet hall dressed for a reception, with a painted mural wall and flower arrangements",
    caption: "The hall, dressed for a reception",
  },
  "reception-lobby": {
    src: "/assets/photos/reception-lobby.jpg",
    w: 2400, h: 1800,
    alt: "Hotel reception desk with a wooden counter",
    caption: "Reception",
  },
  room: {
    src: "/assets/photos/room.jpg",
    w: 1280, h: 960,
    alt: "Guest room with a double and a single bed, mosquito nets and bright cushions",
    caption: "A family room",
  },
  "room-bed": {
    src: "/assets/photos/room-bed.jpg",
    w: 1024, h: 672,
    alt: "Guest room bed with red and yellow cushions and a wooden headboard",
    caption: "A family room",
  },
  "hall-event": {
    src: "/assets/photos/hall-event.jpg",
    w: 1920, h: 1080,
    alt: "Guests seated in the hall at tables with white chair covers",
    caption: "An evening in the hall",
  },
} as const;
