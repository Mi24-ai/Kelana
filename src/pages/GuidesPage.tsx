import { useMemo, useState } from "react";
import { Star, Languages, CheckCircle2, Sparkles } from "lucide-react";
import { guides } from "../data/guides";
import { formatIDR } from "../lib/format";
import BookingWizard from "../components/BookingWizard";
import StampBadge from "../components/StampBadge";
import type { TourGuide } from "../types";

export default function GuidesPage({ interest = "" }: { interest?: string }) {
  const [selected, setSelected] = useState<TourGuide | null>(null);

  const keywords = useMemo(
    () =>
      interest
        .toLowerCase()
        .split(/[,\s]+/)
        .map((k) => k.trim())
        .filter((k) => k.length > 1),
    [interest]
  );

  const rankedGuides = useMemo(() => {
    if (keywords.length === 0) return guides.map((g) => ({ g, match: false }));
    return [...guides]
      .map((g) => {
        const haystack = `${g.specialty} ${g.bio}`.toLowerCase();
        return { g, match: keywords.some((k) => haystack.includes(k)) };
      })
      .sort((a, b) => Number(b.match) - Number(a.match));
  }, [keywords]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-clay-500)]">Mitra Tour Guide</p>
        <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-indigo-800)]">Pemandu Lokal Solo</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-500)]">
          Semua pemandu berikut adalah mitra resmi LelanaSolo — pesan langsung, tanpa perantara.
        </p>
      </header>

      {keywords.length > 0 && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-[var(--color-gold-500)] bg-[var(--color-gold-100)] px-4 py-2.5 text-sm text-[var(--color-indigo-800)]">
          <Sparkles size={15} className="shrink-0 text-[var(--color-clay-500)]" />
          {rankedGuides[0]?.match ? (
            <span>
              Guide dengan spesialisasi <strong>"{interest}"</strong> kami tampilkan lebih dulu.
            </span>
          ) : (
            <span>
              Belum ada guide dengan spesialisasi persis <strong>"{interest}"</strong> — berikut semua guide tersedia.
            </span>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {rankedGuides.map(({ g, match }) => (
          <div key={g.id} className="relative flex flex-col gap-3 rounded-2xl border border-[var(--color-gold-300)] bg-white p-5">
            {g.verified && (
              <div className="absolute -right-2 -top-2">
                <StampBadge label="Asli" size={56} />
              </div>
            )}
            {match && (
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[var(--color-gold-500)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-indigo-950)]">
                <Sparkles size={10} /> Cocok dengan minatmu
              </span>
            )}
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-full bg-[var(--color-indigo-800)]">
                {g.photo ? (
                  <img src={g.photo} alt={g.name} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-[var(--font-display)] text-xl font-semibold text-[var(--color-gold-300)]">
                    {g.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-[var(--color-indigo-800)]">{g.name}</p>
                <p className="text-xs text-[var(--color-ink-500)]">{g.specialty}</p>
                <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-[var(--color-gold-900)]">
                  <Star size={12} fill="currentColor" /> {g.rating} <span className="font-normal text-[var(--color-ink-300)]">({g.reviewCount} ulasan)</span>
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-ink-500)]">{g.bio}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-ink-500)]">
              <span className="flex items-center gap-1">
                <Languages size={13} /> {g.languages.join(", ")}
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} /> {g.toursCompleted} tur selesai
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between border-t border-dashed border-[var(--color-parchment-300)] pt-3">
              <p className="tabular font-[var(--font-display)] text-lg font-semibold text-[var(--color-clay-500)]">
                {formatIDR(g.pricePerDay)} <span className="text-xs font-normal text-[var(--color-ink-500)]">/hari</span>
              </p>
              <button
                onClick={() => setSelected(g)}
                className="rounded-full bg-[var(--color-indigo-800)] px-5 py-2 text-xs font-semibold text-[var(--color-gold-300)]"
              >
                Pesan Guide
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <BookingWizard
          kind="guide"
          title={`Tour Guide · ${selected.name}`}
          subtitle={`${selected.specialty} · Bahasa: ${selected.languages.join(", ")}`}
          summaryLines={[
            { label: "Pemandu", value: selected.name },
            { label: "Spesialisasi", value: selected.specialty },
            { label: "Durasi", value: "1 hari (maks 8 jam)" },
            { label: "Status", value: selected.verified ? "Terverifikasi LelanaSolo" : "Mitra baru" },
          ]}
          total={selected.pricePerDay}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}