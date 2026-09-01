import { useState } from "react";
import { Star, MapPin, Tent, Users2 } from "lucide-react";
import { campsites } from "../data/campsites";
import { formatIDR } from "../lib/format";
import BookingWizard from "../components/BookingWizard";
import TravelIllustration from "../components/TravelIllustration";
import type { Campsite } from "../types";

export default function CampingPage() {
  const [selected, setSelected] = useState<Campsite | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-clay-500)]">Camping &amp; Glamping</p>
        <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-indigo-800)]">Bermalam di Alam Sekitar Solo</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-500)]">Dari camping santai sampai glamping mewah — cocok untuk konten dan healing bareng teman.</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {campsites.map((c) => (
          <div key={c.id} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-gold-300)] bg-white">
            <div className="relative h-36">
              <TravelIllustration variant="camp-tent" className="h-full w-full" />
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[var(--color-gold-900)]">
                <Star size={12} fill="currentColor" /> {c.rating}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-indigo-800)]">{c.name}</h3>
                <p className="flex items-center gap-1 text-xs text-[var(--color-ink-500)]">
                  <MapPin size={12} /> {c.area}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-ink-500)]">{c.description}</p>
              <div className="flex items-center gap-4 text-xs text-[var(--color-ink-500)]">
                <span className="flex items-center gap-1">
                  <Tent size={13} /> {c.tentType}
                </span>
                <span className="flex items-center gap-1">
                  <Users2 size={13} /> Maks {c.capacity} orang
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.facilities.map((f) => (
                  <span key={f} className="rounded-full bg-[var(--color-parchment-200)] px-2.5 py-1 text-[11px] text-[var(--color-ink-700)]">
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-1 flex items-end justify-between border-t border-dashed border-[var(--color-parchment-300)] pt-3">
                <p className="tabular font-[var(--font-display)] text-xl font-semibold text-[var(--color-clay-500)]">
                  {formatIDR(c.pricePerNight)} <span className="text-xs font-normal text-[var(--color-ink-500)]">/malam</span>
                </p>
                <button
                  onClick={() => setSelected(c)}
                  className="rounded-full bg-[var(--color-indigo-800)] px-5 py-2 text-xs font-semibold text-[var(--color-gold-300)]"
                >
                  Pesan Tempat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <BookingWizard
          kind="camp"
          title={selected.name}
          subtitle={`${selected.tentType} · maks ${selected.capacity} orang`}
          summaryLines={[
            { label: "Lokasi camping", value: selected.name },
            { label: "Area", value: selected.area },
            { label: "Jenis tenda", value: selected.tentType },
          ]}
          total={selected.pricePerNight}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
