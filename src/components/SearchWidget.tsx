import { useState } from "react";
import { Plane, TrainFront, Building2, Users, Search, ArrowLeftRight, Calendar } from "lucide-react";
import type { PageKey } from "../types";

type Tab = "flights" | "trains" | "hotels" | "guides";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "flights", label: "Pesawat", icon: <Plane size={16} /> },
  { key: "trains", label: "Kereta", icon: <TrainFront size={16} /> },
  { key: "hotels", label: "Hotel", icon: <Building2 size={16} /> },
  { key: "guides", label: "Tour Guide", icon: <Users size={16} /> },
];

export default function SearchWidget({
  onNavigate,
  interest,
  onInterestChange,
}: {
  onNavigate: (page: PageKey) => void;
  interest: string;
  onInterestChange: (value: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("flights");

  return (
    <div className="heritage-frame w-full max-w-3xl rounded-2xl bg-[var(--color-parchment-50)]/95 p-2 shadow-xl">
      <div className="flex gap-1 overflow-x-auto px-2 pt-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.key ? "bg-[var(--color-indigo-800)] text-[var(--color-gold-300)]" : "text-[var(--color-ink-500)] hover:bg-[var(--color-gold-100)]"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-3">
        {(tab === "flights" || tab === "trains") && (
          <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_auto]">
            <FieldBox label="Dari" defaultValue={tab === "flights" ? "Jakarta (CGK)" : "Gambir, Jakarta"} />
            <div className="hidden items-center justify-center md:flex">
              <ArrowLeftRight size={16} className="text-[var(--color-clay-500)]" />
            </div>
            <FieldBox label="Ke" defaultValue="Solo (SOC / SLO)" />
            <FieldBox label="Tanggal" defaultValue="Pilih tanggal" icon={<Calendar size={14} />} />
            <button
              onClick={() => onNavigate(tab)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-clay-500)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Search size={16} /> Cari
            </button>
          </div>
        )}
        {tab === "hotels" && (
          <div className="grid gap-2 md:grid-cols-[1fr_auto_auto]">
            <FieldBox label="Area di Solo" defaultValue="Pusat kota" />
            <FieldBox label="Tanggal Menginap" defaultValue="Pilih tanggal" icon={<Calendar size={14} />} />
            <button
              onClick={() => onNavigate("hotels")}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-clay-500)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Search size={16} /> Cari
            </button>
          </div>
        )}
        {tab === "guides" && (
          <div className="space-y-2">
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink-300)] px-1">
                Minat kamu
              </span>
              <input
                value={interest}
                onChange={(e) => onInterestChange(e.target.value)}
                placeholder="Sejarah, kuliner, fotografi, belanja..."
                className="w-full rounded-xl border border-[var(--color-gold-300)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink-700)] outline-none focus:border-[var(--color-indigo-700)]"
              />
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                onClick={() => onNavigate("roadtrip")}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-indigo-800)] px-5 py-2.5 text-sm font-semibold text-[var(--color-gold-300)]"
              >
                <Search size={16} /> Rute yang Cocok
              </button>
              <button
                onClick={() => onNavigate("guides")}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-clay-500)] px-5 py-2.5 text-sm font-semibold text-white"
              >
                <Search size={16} /> Guide yang Cocok
              </button>
            </div>
            <p className="px-1 text-[11px] text-[var(--color-ink-300)]">
              Isi minat kamu, lalu kami tunjukkan rute jalan kaki & tour guide yang paling sesuai.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FieldBox({ label, defaultValue, icon }: { label: string; defaultValue: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--color-gold-300)] bg-white px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink-300)]">{label}</p>
      <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink-700)]">
        {icon}
        {defaultValue}
      </div>
    </div>
  );
}
