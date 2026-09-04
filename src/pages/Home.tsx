import { ArrowRight, Footprints, Flame } from "lucide-react";
import SearchWidget from "../components/SearchWidget";
import ServiceGrid from "../components/ServiceGrid";
import BatikMotifBackground from "../components/BatikMotifBackground";
import SunsetSection from "../components/SunsetSection";
import AttractionsSection from "../components/AttractionsSection";
import BatikDivider from "../components/BatikDivider";
import StampBadge from "../components/StampBadge";
import TravelIllustration from "../components/TravelIllustration";
import { itineraries } from "../data/itineraries";
import { guides } from "../data/guides";
import type { PageKey } from "../types";

const ITINERARY_PHOTO: Record<string, string> = {
  "it-warisan-keraton": "/image/Keraton.jpg",
  "it-malam-ngarsopuro": "/image/ngarsopuro.jpg",
  "it-laweyan-lereng": "/image/laweyan.jpg",
};

function RouteThumb({ id, illustration }: { id: string; illustration: (typeof itineraries)[number]["illustration"] }) {
  const photo = ITINERARY_PHOTO[id];
  if (photo) {
    return <img src={photo} alt="" className="h-full w-full object-cover" loading="lazy" />;
  }
  return <TravelIllustration variant={illustration} className="h-full w-full" />;
}

export default function Home({
  onNavigate,
  interest,
  onInterestChange,
}: {
  onNavigate: (page: PageKey) => void;
  interest: string;
  onInterestChange: (value: string) => void;
}) {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-16 pt-14 text-center md:pb-24 md:pt-20">
        <BatikMotifBackground />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-3 inline-block rounded-full border border-[var(--color-gold-500)]/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-300)]">
            Surakarta · Jawa Tengah
          </p>
          <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-tight text-[var(--color-parchment-50)] md:text-6xl">
            Satu Perjalanan, Seribu Warisan Nusantara
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-clay-500)] md:text-lg">
            Pesan pesawat, kereta, dan hotel lalu jelajahi Kota Solo bersama pemandu lokal terverifikasi, mengikuti
            rute budaya yang sudah kami rangkai untukmu.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-9 flex justify-center">
          <SearchWidget onNavigate={onNavigate} interest={interest} onInterestChange={onInterestChange} />
        </div>

        <div className="relative z-10 mx-auto mt-8 flex justify-center px-2">
          <ServiceGrid onNavigate={onNavigate} />
        </div>
      </section>
      <BatikDivider tone="parchment" className="bg-[var(--color-indigo-800)]" />

      {/* WISATA SOLO RAYA — kenalan dulu sebelum susun
