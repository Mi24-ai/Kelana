import { useState } from "react";
import { TrainFront, ArrowRight, ShieldCheck } from "lucide-react";
import { trains } from "../data/trains";
import { formatIDR } from "../lib/format";
import BookingWizard from "../components/BookingWizard";
import PageHero from "../components/PageHero";
import type { Train } from "../types";

export default function TrainsPage() {
  const [pending, setPending] = useState<{ train: Train; cls: Train["classes"][number] } | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <PageHero
        eyebrow="Tiket Kereta Api"
        icon={<TrainFront size={16} />}
        title="Menuju Solo Balapan"
        description="Jadwal & ketersediaan kursi disinkronkan dari sistem KAI Access — pembayaran diselesaikan langsung di LelanaSolo tanpa berpindah aplikasi."
        rightSlot={
          <div className="flex items-center gap-2 rounded-full border border-[var(--color-emerald-500)]/70 bg-white/10 px-4 py-2 text-xs font-semibold text-[var(--color-emerald-500)]">
            <ShieldCheck size={15} />
            Terintegrasi KAI Access
          </div>
        }
      />

      <div className="mt-7 space-y-4">
        {trains.map((t) => (
          <div key={t.id} className="rounded-2xl border border-[var(--color-gold-300)] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-indigo-800)] text-[var(--color-gold-300)]">
                  <TrainFront size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-ink-700)]">{t.name}</p>
                  <div className="flex items-center gap-2 font-[var(--font-mono)] text-sm text-[var(--color-indigo-800)]">
                    <span className="tabular font-semibold">{t.departTime}</span>
                    <span className="text-xs text-[var(--color-ink-300)]">{t.fromCode}</span>
                    <ArrowRight size={13} className="text-[var(--color-clay-500)]" />
                    <span className="tabular font-semibold">{t.arriveTime}</span>
                    <span className="text-xs text-[var(--color-ink-300)]">{t.toCode}</span>
                  </div>
                  <p className="text-xs text-[var(--color-ink-500)]">
                    {t.from} → {t.to} · {t.durationLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {t.classes.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setPending({ train: t, cls: c })}
                  className="group flex flex-col items-start gap-1 rounded-xl border border-[var(--color-gold-300)] bg-[var(--color-parchment-100)] p-3 text-left transition-colors hover:border-[var(--color-clay-500)] hover:bg-white"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-indigo-800)]">{c.name}</span>
                  <span className="tabular font-[var(--font-display)] text-lg font-semibold text-[var(--color-clay-500)]">
                    {formatIDR(c.price)}
                  </span>
                  <span className="text-[11px] text-[var(--color-ink-500)]">Sisa {c.seatsLeft} kursi</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {pending && (
        <BookingWizard
          kind="train"
          title={`${pending.train.name} · ${pending.cls.name}`}
          subtitle={`${pending.train.from} → ${pending.train.to}, berangkat ${pending.train.departTime}`}
          summaryLines={[
            { label: "Kereta", value: pending.train.name },
            { label: "Rute", value: `${pending.train.from} → ${pending.train.to}` },
            { label: "Jadwal", value: `${pending.train.departTime} – ${pending.train.arriveTime}` },
            { label: "Kelas", value: pending.cls.name },
          ]}
          total={pending.cls.price}
          onClose={() => setPending(null)}
        />
      )}
    </div>
  );
}