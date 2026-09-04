import { useState } from "react";
import { BookOpen, ChevronDown, MapPin, Ticket } from "lucide-react";
import BatikDivider from "./BatikDivider";
import { attractions } from "../data/attractions";

export default function AttractionsSection() {
  const [expanded, setExpanded] = useState<string | null>(attractions[0]?.id ?? null);

  return (
    <section className="px-5 py-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-clay-500)]">
            Kenalan Dulu
          </p>
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-indigo-800)] md:text-3xl">
            Wisata Solo Raya yang Sayang Dilewatkan
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--color-ink-500)]">
            Sebelum menyusun rute, kenali dulu tempat-tempatnya — semuanya punya cerita dan legenda yang menarik
            yang bikin kunjungan terasa lebih dari sekadar foto-foto.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {attractions.map((a) => {
            const isOpen = expanded === a.id;
            return (
              <div key={a.id} className="heritage-frame overflow-hidden rounded-2xl bg-white">
                <div className="relative h-40">
                  <img
                    src={a.image}
                    alt={a.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-clay-500)]">
                    {a.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-indigo-800)]">
                    {a.name}
                  </h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-ink-500)]">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {a.area}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-[var(--color-clay-500)]">
                      <Ticket size={12} /> HTM: {a.htm}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">{a.teaser}</p>
                  {a.story && (
                    <div className="mt-3">
                      <button
                        onClick={() => setExpanded(isOpen ? null : a.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-gold-900)] hover:text-[var(--color-clay-500)]"
                        aria-expanded={isOpen}
                      >
                        <BookOpen size={13} />
                        {isOpen ? "Sembunyikan cerita" : "Baca kisah di baliknya"}
                        <ChevronDown size={13} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="mt-3 rounded-xl border border-[var(--color-gold-300)] bg-[var(--color-parchment-100)] p-4">
                          <BatikDivider tone="gold" className="mb-3 opacity-60" />
                          <p className="text-sm leading-relaxed text-[var(--color-ink-700)]">{a.story}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
