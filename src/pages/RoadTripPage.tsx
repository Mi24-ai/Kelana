import { useMemo, useState, useEffect } from "react";
import { Footprints, Clock, MapPin, Users, Flame, Sparkles, Map } from "lucide-react";
import { itineraries } from "../data/itineraries";
import MiniMap from "../components/MiniMap";
import TravelIllustration from "../components/TravelIllustration";
import PageHero from "../components/PageHero";
import type { PageKey } from "../types";

function matchesInterest(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.some((k) => k.length > 1 && lower.includes(k));
}

export default function RoadTripPage({
  onNavigate,
  interest = "",
}: {
  onNavigate: (page: PageKey) => void;
  interest?: string;
}) {
  const keywords = useMemo(
    () =>
      interest
        .toLowerCase()
        .split(/[,\s]+/)
        .map((k) => k.trim())
        .filter(Boolean),
    [interest]
  );

  const rankedItineraries = useMemo(() => {
    if (keywords.length === 0) return itineraries.map((it) => ({ it, match: false }));
    return [...itineraries]
      .map((it) => {
        const haystack = `${it.theme} ${it.stops.map((s) => `${s.category} ${s.name} ${s.note}`).join(" ")}`;
        return { it, match: matchesInterest(haystack, keywords) };
      })
      .sort((a, b) => Number(b.match) - Number(a.match));
  }, [keywords]);

  const [activeId, setActiveId] = useState(itineraries[0].id);

  // begitu minat berubah, otomatis pindah ke rute paling cocok
  useEffect(() => {
    if (keywords.length > 0 && rankedItineraries[0]?.match) {
      setActiveId(rankedItineraries[0].it.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interest]);

  const active = itineraries.find((i) => i.id === activeId)!;
  const activeIsMatch = rankedItineraries.find((r) => r.it.id === activeId)?.match ?? false;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <PageHero
        eyebrow="Jelajah Rute"
        icon={<Map size={16} />}
        title="Road Trip Budaya di Solo"
        description="Pilih rute, lihat peta mini, dan susuri titik-titik budaya dengan estimasi jalan kaki antar lokasi."
        rightSlot={
          <p className="tabular font-accent text-sm italic text-[var(--color-gold-300)]">{itineraries.length} rute terkurasi</p>
        }
      />

      {keywords.length > 0 && (
        <div className="mb-5 mt-7 flex items-center gap-2 rounded-xl border border-[var(--color-gold-500)] bg-[var(--color-gold-100)] px-4 py-2.5 text-sm text-[var(--color-indigo-800)]">
          <Sparkles size={15} className="shrink-0 text-[var(--color-clay-500)]" />
          {rankedItineraries[0]?.match ? (
            <span>
              Menampilkan rute yang cocok dengan minatmu: <strong>"{interest}"</strong>
            </span>
          ) : (
            <span>
              Belum ada rute yang persis cocok dengan <strong>"{interest}"</strong> — berikut semua rute yang tersedia.
            </span>
          )}
        </div>
      )}

      <div className={`mb-6 flex gap-2 overflow-x-auto pb-1 ${keywords.length === 0 ? "mt-7" : ""}`}>
        {rankedItineraries.map(({ it, match }) => (
          <button
            key={it.id}
            onClick={() => setActiveId(it.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeId === it.id ? "bg-[var(--color-indigo-800)] text-[var(--color-gold-300)]" : "border border-[var(--color-gold-300)] bg-white text-[var(--color-ink-700)] hover:border-[var(--color-clay-500)]"
            }`}
          >
            {it.trending && <Flame size={13} className="text-[var(--color-clay-500)]" />}
            {match && keywords.length > 0 && <Sparkles size={13} className="text-[var(--color-gold-500)]" />}
            {it.title}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
<div className="heritage-frame relative h-44 overflow-hidden rounded-2xl">
  {active.coverImage ? (
    <img
      src={active.coverImage}
      alt={active.title}
      className="h-full w-full object-cover"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  ) : (
    <TravelIllustration variant={active.illustration} className="h-full w-full" />
  )}
  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-indigo-950)]/80 to-transparent" />
  <div className="absolute inset-x-0 bottom-0 p-4">
    {active.trending && (
      <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[var(--color-clay-500)] px-2.5 py-1 text-[11px] font-semibold text-white">
        <Flame size={11} /> Lagi hits di kalangan Gen Z
      </span>
    )}
    {activeIsMatch && keywords.length > 0 && (
      <span className="mb-1 ml-1 inline-flex items-center gap-1 rounded-full bg-[var(--color-gold-500)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-indigo-950)]">
        <Sparkles size={11} /> Cocok dengan minatmu
      </span>
    )}
    <h2 className="font-[var(--font-display)] text-2xl font-semibold text-white">{active.title}</h2>
    <p className="font-accent text-sm italic text-[var(--color-parchment-200)]">{active.theme}</p>
  </div>
</div>          <MiniMap stops={active.stops} />
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-ink-500)]">
            <span className="flex items-center gap-1 rounded-full bg-[var(--color-gold-100)] px-3 py-1.5">
              <Clock size={13} /> {active.totalDurationLabel}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[var(--color-gold-100)] px-3 py-1.5">
              <Footprints size={13} /> Total {active.totalWalkKm} km jalan kaki
            </span>
          </div>

          <ol className="space-y-0">
            {active.stops.map((s, i) => (
              <li key={s.id} className="relative pb-6 pl-9 last:pb-0">
                {i < active.stops.length - 1 && (
                  <span className="absolute left-[13px] top-7 h-[calc(100%-14px)] w-px border-l border-dashed border-[var(--color-gold-500)]" />
                )}
                <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-indigo-800)] font-[var(--font-mono)] text-xs font-bold text-[var(--color-gold-300)]">
                  {i + 1}
                </span>
                <div className="rounded-xl border border-[var(--color-gold-300)] bg-white p-4 transition-shadow hover:shadow-md">
                  {s.walkFromPrevMin != null && (
                    <p className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-[var(--color-clay-500)]">
                      <Footprints size={12} /> {s.walkFromPrevMin} menit jalan kaki dari titik sebelumnya
                    </p>
                  )}
                  <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink-300)]">
                    <MapPin size={11} /> {s.category}
                  </p>
                  <p className="mt-0.5 font-[var(--font-display)] font-semibold text-[var(--color-indigo-800)]">{s.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--color-ink-500)]">{s.note}</p>
                  <p className="mt-1.5 text-[11px] text-[var(--color-ink-300)]">Alokasi waktu: {s.durationLabel}</p>
                </div>
              </li>
            ))}
          </ol>

          <button
            onClick={() => onNavigate("guides")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-clay-500)] py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <Users size={16} /> Jelajahi rute ini bersama Tour Guide
          </button>
        </div>
      </div>
    </div>
  );
}