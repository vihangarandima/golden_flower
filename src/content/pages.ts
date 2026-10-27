import type { PhotoKey } from "./photos";

// TODO: room types, counts and rates from the owner.
export const rooms: { name: string; body: string; photo?: PhotoKey; features: string[] }[] = [
  {
    name: "Family rooms",
    body: "Simple, clean rooms with a double and a single bed, nets and air conditioning, a staircase away from the celebration.",
    photo: "room-bed",
    features: ["Double + single bed", "Air conditioning", "Mosquito nets", "Hot water"],
  },
  {
    name: "The couple's room",
    body: "Kept for the bride and groom on the night, with flowers from the day's stage brought upstairs.",
    // TODO: add a photo of the couple's room; none on the listing yet
    features: ["Held for wedding couples", "Flowers from your stage", "Late breakfast"],
  },
];

// TODO: menus from the kitchen.
export const dining: { title: string; body: string }[] = [
  { title: "Rice and curry, done properly", body: "Yellow rice, three or four curries, mallum, papadam, chutneys. The buffet guests actually remember." },
  { title: "Western and Chinese menus", body: "For receptions where the family wants a mixed table: roasts, devilled dishes, fried rice and noodles." },
  { title: "Welcome drinks and tea", body: "King coconut, faluda or iced tea on arrival; milk rice and kavum for ceremonies that call for it." },
  { title: "Cake structures", body: "We can arrange the cake structure and wedding cake boxes for guests to take home." },
];

export const celebrations: { title: string; body: string; photo: PhotoKey }[] = [
  { title: "Homecomings", body: "The second day, in the hall, with a fresh stage and colours that differ from the wedding.", photo: "banquet-hall" },
  { title: "Engagements", body: "Smaller, often in the garden in the late afternoon, with a ring-exchange table under the trees.", photo: "garden-ceremony" },
  { title: "Birthdays & parties", body: "Garden evenings under the lights, with a buffet and space for a DJ.", photo: "garden-night" },
  { title: "Décor at your venue", body: "Our décor team travels: stages, floral walls, centrepieces and arches set up wherever you're celebrating.", photo: "stage-sofa" },
  { title: "Company events", body: "Meetings, award nights and staff dinners in the hall, with catering from our kitchen.", photo: "hall-event" },
];
