import { useState } from "react";
import { Star, MapPin, Users2, BedDouble } from "lucide-react";
import { villas } from "../data/villas";
import { formatIDR } from "../lib/format";
import BookingWizard from "../components/BookingWizard";
import TravelIllustration from "../components/TravelIllustration";
import type { Villa } from "../types";

export default function VillaPage() {
  const [selected, setSelected] = useState<Villa | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-clay-500)]">Sewa Villa</p>
        <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-indigo-800)]">Villa di Sekitar Solo</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-500)]">Cocok untuk keluarga besar atau rombongan teman, lengkap dengan dapur pribadi.</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {villas.map((v) => (
          <div key={v.id} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-gold-300)] bg-white">
            <div className="relative h-36">
              {v.photo ? (
                <img
                  src={v.photo}
                  alt={v.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <TravelIllustration variant={v.illustration} className="h-full w-full" />
              )}
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[var(--color-gold-900)]">
                <Star size={12} fill="currentColor" /> {v.rating}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-indigo-800)]">{v.name}</h3>
                <p className="flex items-center gap-1 text-xs text-[var(--color-ink-500)]">
                  <MapPin size={12} /> {v.area}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-ink-500)]">{v.description}</p>
              <div className="flex items-center gap-4 text-xs text-[var(--color-ink-500)]">
                <span className="flex items-center gap-1">
                  <Users2 size={13} /> Maks {v.capacity} tamu
                </span>
                <span className="flex items-center gap-1">
                  <BedDouble size={13} /> {v.bedrooms} kamar tidur
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {v.facilities.slice(0, 4).map((f) => (
                  <span key={f} className="rounded-full bg-[var(--color-parchment-200)] px-2.5 py-1 text-[11px] text-[var(--color-ink-700)]">
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-1 flex items-end justify-between border-t border-dashed border-[var(--color-parchment-300)] pt-3">
                <p className="tabular font-[var(--font-display)] text-xl font-semibold text-[var(--color-clay-500)]">
                  {formatIDR(v.pricePerNight)} <span className="text-xs font-normal text-[var(--color-ink-500)]">/malam</span>
                </p>
                <button
                  onClick={() => setSelected(v)}
                  className="rounded-full bg-[var(--color-indigo-800)] px-5 py-2 text-xs font-semibold text-[var(--color-gold-300)]"
                >
                  Pesan Villa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <BookingWizard
          kind="villa"
          title={selected.name}
          subtitle={`${selected.bedrooms} kamar tidur · maks ${selected.capacity} tamu`}
          summaryLines={[
            { label: "Villa", value: selected.name },
            { label: "Lokasi", value: selected.area },
            { label: "Kapasitas", value: `${selected.capacity} tamu, ${selected.bedrooms} kamar` },
          ]}
          total={selected.pricePerNight}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
