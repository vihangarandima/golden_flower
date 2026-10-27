import { Page } from "@/components/ui/Page";
import { Hero } from "@/components/home/Hero";
import { MomentsRail } from "@/components/home/MomentsRail";
import { TheDay } from "@/components/home/TheDay";
import { Proof } from "@/components/home/Proof";
import { DateCheck } from "@/components/home/DateCheck";
import { GalleryPreview, Intro, Marquee, PackagesPreview, Social, StayDine } from "@/components/home/Sections";

export default function Home() {
  return (
    <Page>
      <Hero />
      <Intro />
      <MomentsRail />
      <TheDay />
      <Proof />
      <PackagesPreview />
      <GalleryPreview />
      <Marquee />
      <StayDine />
      <Social />
      <DateCheck />
    </Page>
  );
}
