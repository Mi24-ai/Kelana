import { useMemo, useState } from "react";
import { Plane, Luggage, Users2 } from "lucide-react";
import { flights, flightOrigins } from "../data/flights";
import { formatIDR } from "../lib/format";
import BookingWizard from "../components/BookingWizard";
import PageHero from "../components/PageHero";
import type { Flight } from "../types";

export default function FlightsPage() {
  const [origin, setOrigin] = useState("Semua kota");
  const [sortBy, setSortBy] = useState<"price" | "depart">("price");
  const [selected, setSelected] = useState<Flight | null>(null);

  const filtered = useMemo(() => {
    let list = flights.filter((f) => origin === "Semua kota" || f.from === origin);
    list = [...list].sort((a, b) => (sortBy === "price" ? a.price - b.price : a.departTime.localeCompare(b.departTime)));
    return list;
  }, [origin, sortBy]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <PageHero
        eyebrow="Tiket Pesawat"
        icon={<Plane size={16} />}
        title="Menuju Solo (SOC)"
        description="Pilih penerbangan yang paling cocok — harga sudah termasuk pajak bandara."
        rightSlot={
          <p className="tabular font-accent text-sm italic text-[var(--color-gold-300)]">
            {filtered.length} penerbangan tersedia
          </p>
        }
      />

      <div className="mb-6 mt-7 flex flex-wrap items-center gap-3">
        <select
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="rounded-full border border-[var(--color-gold-300)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink-700)]"
        >
          <option>Semua kota</option>
          {flightOrigins.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <div className="flex gap-1 rounded-full border border-[var(--color-gold-300)] bg-white p-1">
          <button
            onClick={() => setSortBy("price")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${sortBy === "price" ? "bg-[var(--color-indigo-800)] text-[var(--color-gold-300)]" : "text-[var(--color-ink-500)]"}`}
          >
            Termurah
          </button>
          <button
            onClick={() => setSortBy("depart")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${sortBy === "depart" ? "bg-[var(--color-indigo-800)] text-[var(--color-gold-300)]" : "text-[var(--color-ink-500)]"}`}
          >
            Keberangkatan tercepat
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((f, i) => (
          <div
            key={f.id}
            className="animate-fade-up flex flex-col gap-5 rounded-2xl border border-[var(--color-gold-300)] bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {/* logo maskapai */}
            <div className="flex items-center gap-4 sm:w-44 sm:shrink-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-parchment-300)] bg-white">
                {f.logo ? (
                  <img src={f.logo} alt={f.airline} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <span className="font-[var(--font-mono)] text-xs font-bold text-[var(--color-indigo-800)]">{f.logoInitial}</span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-ink-700)]">{f.airline}</p>
                <p className="text-[11px] text-[var(--color-ink-300)]">{f.class}</p>
              </div>
            </div>

            {/* rute: jam, kode bandara, garis penerbangan */}
            <div className="flex flex-1 items-center gap-3 border-t border-dashed border-[var(--color-parchment-300)] pt-4 sm:border-t-0 sm:pt-0">
              <div className="text-right">
                <p className="tabular font-[var(--font-display)] text-lg font-semibold text-[var(--color-indigo-800)]">{f.departTime}</p>
                <p className="text-xs text-[var(--color-ink-300)]">{f.fromCode}</p>
              </div>

              <div className="relative flex flex-1 flex-col items-center px-1">
                <p className="mb-1 text-[11px] font-medium text-[var(--color-ink-500)]">{f.durationLabel}</p>
                <div className="relative flex w-full items-center">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-clay-500)]" />
                  <span className="h-px flex-1 border-t border-dashed border-[var(--color-gold-500)]" />
                  <Plane size={13} className="shrink-0 rotate-90 text-[var(--color-clay-500)]" />
                  <span className="h-px flex-1 border-t border-dashed border-[var(--color-gold-500)]" />
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-indigo-800)]" />
                </div>
                <p className="mt-1 text-[11px] text-[var(--color-ink-300)]">
                  {f.stops === 0 ? "Langsung" : `${f.stops} transit`}
                </p>
              </div>

              <div className="text-left">
                <p className="tabular font-[var(--font-display)] text-lg font-semibold text-[var(--color-indigo-800)]">{f.arriveTime}</p>
                <p className="text-xs text-[var(--color-ink-300)]">{f.toCode}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-[var(--color-ink-300)] sm:hidden">
              <span className="flex items-center gap-1">
                <Luggage size={12} /> {f.baggageKg} kg
              </span>
              <span className="flex items-center gap-1">
                <Users2 size={12} /> Sisa {f.seatsLeft} kursi
              </span>
            </div>

            {/* harga & aksi */}
            <div className="flex items-center justify-between gap-3 border-t border-dashed border-[var(--color-parchment-300)] pt-4 sm:w-44 sm:flex-col sm:items-end sm:border-l sm:border-t-0 sm:border-dashed sm:border-[var(--color-parchment-300)] sm:pl-5 sm:pt-0">
              <div className="hidden items-center gap-3 text-[11px] text-[var(--color-ink-300)] sm:flex">
                <span className="flex items-center gap-1">
                  <Luggage size={12} /> {f.baggageKg} kg
                </span>
                <span className="flex items-center gap-1">
                  <Users2 size={12} /> {f.seatsLeft} kursi
                </span>
              </div>
              <p className="tabular font-[var(--font-display)] text-xl font-semibold text-[var(--color-clay-500)]">
                {formatIDR(f.price)}
              </p>
              <button
                onClick={() => setSelected(f)}
                className="w-full rounded-full bg-[var(--color-indigo-800)] px-5 py-2 text-sm font-semibold text-[var(--color-gold-300)] transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                Pilih
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[var(--color-gold-300)] p-10 text-center text-sm text-[var(--color-ink-500)]">
            <Plane className="mx-auto mb-2 text-[var(--color-gold-500)]" />
            Tidak ada penerbangan untuk filter ini.
          </div>
        )}
      </div>

      {selected && (
        <BookingWizard
          kind="flight"
          title={`${selected.airline} · ${selected.fromCode}–${selected.toCode}`}
          subtitle={`Penerbangan ${selected.class} langsung, berangkat ${selected.departTime}`}
          summaryLines={[
            { label: "Rute", value: `${selected.from} → ${selected.to}` },
            { label: "Jadwal", value: `${selected.departTime} – ${selected.arriveTime} (${selected.durationLabel})` },
            { label: "Kelas", value: selected.class },
            { label: "Bagasi", value: `${selected.baggageKg} kg` },
          ]}
          total={selected.price}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}