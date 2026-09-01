import { useState } from "react";
import { Bus, ArrowRight, Users2 } from "lucide-react";
import { busRoutes } from "../data/buses";
import { formatIDR } from "../lib/format";
import BookingWizard from "../components/BookingWizard";
import type { BusRoute } from "../types";

export default function BusPage() {
  const [selected, setSelected] = useState<BusRoute | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-clay-500)]">Tiket Bus Antar Kota</p>
        <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-indigo-800)]">Menuju Terminal Tirtonadi</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-500)]">Pilihan hemat untuk perjalanan darat, dari ekonomi AC sampai sleeper class.</p>
      </header>

      <div className="space-y-4">
        {busRoutes.map((b) => (
          <div key={b.id} className="flex flex-col gap-4 rounded-2xl border border-[var(--color-gold-300)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-indigo-800)] text-[var(--color-gold-300)]">
                <Bus size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-ink-700)]">{b.operator}</p>
                <div className="mt-1 flex items-center gap-2 font-[var(--font-mono)] text-sm text-[var(--color-indigo-800)]">
                  <span className="tabular font-semibold">{b.departTime}</span>
                  <ArrowRight size={13} className="text-[var(--color-clay-500)]" />
                  <span className="tabular font-semibold">{b.arriveTime}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--color-ink-500)]">
                  {b.from} → {b.to} · {b.durationLabel} · {b.busClass}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-[var(--color-ink-300)]">
                  <Users2 size={12} /> Sisa {b.seatsLeft} kursi
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 sm:min-w-[150px]">
              <p className="tabular font-[var(--font-display)] text-xl font-semibold text-[var(--color-clay-500)]">{formatIDR(b.price)}</p>
              <button
                onClick={() => setSelected(b)}
                className="w-full rounded-full bg-[var(--color-indigo-800)] px-5 py-2 text-sm font-semibold text-[var(--color-gold-300)] sm:w-auto"
              >
                Pilih
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <BookingWizard
          kind="bus"
          title={`${selected.operator} · ${selected.busClass}`}
          subtitle={`${selected.from} → ${selected.to}, berangkat ${selected.departTime}`}
          summaryLines={[
            { label: "Operator", value: selected.operator },
            { label: "Rute", value: `${selected.from} → ${selected.to}` },
            { label: "Jadwal", value: `${selected.departTime} – ${selected.arriveTime}` },
            { label: "Kelas", value: selected.busClass },
          ]}
          total={selected.price}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
