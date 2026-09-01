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

// Foto asli untuk kartu rute unggulan — jika suatu rute belum punya foto di
// sini, kartunya otomatis kembali memakai ilustrasi SVG (lihat RouteThumb).
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
            Solo · Surakarta · Jawa Tengah
          </p>
          <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-tight text-[var(--color-parchment-50)] md:text-6xl">
            Satu Perjalanan, Seribu Warisan Nusantara
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-parchment-300)] md:text-lg">
            Pesan pesawat, kereta, dan hotel — lalu jelajahi Kota Solo bersama pemandu lokal terverifikasi, mengikuti
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

      {/* WISATA SOLO RAYA — kenalan dulu sebelum susun rute */}
      <AttractionsSection />

      {/* FEATURED ITINERARIES — seksi senja hangat & fun */}
      <SunsetSection>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">Rute Jelajah</p>
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-white md:text-3xl">
              Road Trip Pilihan di Solo
            </h2>
          </div>
          <button
            onClick={() => onNavigate("roadtrip")}
            className="hidden items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--color-clay-500)] md:flex"
          >
            Lihat semua rute <ArrowRight size={15} />
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {itineraries.slice(0, 3).map((it) => (
            <button
              key={it.id}
              onClick={() => onNavigate("roadtrip")}
              className="group overflow-hidden rounded-2xl bg-white text-left shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-32">
                <RouteThumb id={it.id} illustration={it.illustration} />
                {it.trending && (
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[var(--color-clay-500)] px-2.5 py-1 text-[10px] font-semibold text-white">
                    <Flame size={11} /> Hits
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-clay-500)]">{it.theme}</p>
                <h3 className="mt-1 font-[var(--font-display)] text-lg font-semibold text-[var(--color-indigo-800)]">
                  {it.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-[var(--color-ink-500)]">
                  <span>{it.totalDurationLabel}</span>
                  <span className="flex items-center gap-1">
                    <Footprints size={13} /> {it.totalWalkKm} km jalan kaki
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-clay-500)] group-hover:underline">
                  Lihat peta mini <ArrowRight size={14} />
                </span>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => onNavigate("roadtrip")}
          className="mt-6 flex w-full items-center justify-center gap-1 rounded-full bg-white/90 px-4 py-2.5 text-sm font-semibold text-[var(--color-clay-500)] md:hidden"
        >
          Lihat semua rute <ArrowRight size={15} />
        </button>
      </SunsetSection>

      {/* FEATURED GUIDES */}
      <section className="px-5 py-14 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-clay-500)]">Mitra Kami</p>
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-indigo-800)] md:text-3xl">
              Pemandu Lokal Terverifikasi
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {guides.slice(0, 4).map((g) => (
              <div key={g.id} className="relative rounded-2xl border border-[var(--color-gold-300)] bg-white p-5">
                {g.verified && (
                  <div className="absolute -right-2 -top-2">
                    <StampBadge label="Asli" size={52} />
                  </div>
                )}
                <div className="h-12 w-12 overflow-hidden rounded-full bg-[var(--color-indigo-800)]">
                  {g.photo ? (
                    <img src={g.photo} alt={g.name} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-[var(--font-display)] text-lg font-semibold text-[var(--color-gold-300)]">
                      {g.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="mt-3 font-semibold text-[var(--color-indigo-800)]">{g.name}</h3>
                <p className="text-xs text-[var(--color-ink-500)]">{g.specialty}</p>
                <button
                  onClick={() => onNavigate("guides")}
                  className="mt-4 w-full rounded-full border border-[var(--color-indigo-800)] py-2 text-xs font-semibold text-[var(--color-indigo-800)] hover:bg-[var(--color-indigo-800)] hover:text-[var(--color-gold-300)]"
                >
                  Lihat Profil
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}