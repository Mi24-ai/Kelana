import { Plane, Building2, TrainFront, Home, Bus, User, Tent, ShoppingBasket } from "lucide-react";
import type { PageKey } from "../types";

const SERVICES: { key: PageKey; label: string; icon: React.ReactNode }[] = [
  { key: "flights", label: "Pesawat", icon: <Plane size={22} /> },
  { key: "hotels", label: "Hotel", icon: <Building2 size={22} /> },
  { key: "trains", label: "Kereta", icon: <TrainFront size={22} /> },
  { key: "villas", label: "Villa", icon: <Home size={22} /> },
  { key: "buses", label: "Bus", icon: <Bus size={22} /> },
  { key: "guides", label: "Tour Guide", icon: <User size={22} /> },
  { key: "camping", label: "Camping", icon: <Tent size={22} /> },
  { key: "solobox", label: "SoloBox", icon: <ShoppingBasket size={22} /> },
];

export default function ServiceGrid({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <div className="heritage-frame mx-auto grid w-full max-w-4xl grid-cols-4 gap-3 rounded-2xl bg-[var(--color-parchment-50)]/95 p-5 sm:grid-cols-8">
      {SERVICES.map((s) => (
        <button key={s.key} onClick={() => onNavigate(s.key)} className="group flex flex-col items-center gap-2">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-gold-100)] text-[var(--color-indigo-800)] transition-colors group-hover:bg-[var(--color-indigo-800)] group-hover:text-[var(--color-gold-300)]">
            {s.icon}
          </span>
          <span className="text-center text-xs font-medium text-[var(--color-ink-700)]">{s.label}</span>
        </button>
      ))}
    </div>
  );
}
