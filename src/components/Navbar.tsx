import { Menu, Plane, TrainFront, Building2, Users, Map, X, ChevronDown, Home, Bus, Tent, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import type { PageKey } from "../types";

const NAV_ITEMS: { key: PageKey; label: string; icon: React.ReactNode }[] = [
  { key: "flights", label: "Pesawat", icon: <Plane size={16} /> },
  { key: "trains", label: "Kereta", icon: <TrainFront size={16} /> },
  { key: "hotels", label: "Hotel", icon: <Building2 size={16} /> },
  { key: "guides", label: "Tour Guide", icon: <Users size={16} /> },
  { key: "roadtrip", label: "Jelajah Rute", icon: <Map size={16} /> },
  { key: "solobox", label: "SoloBox", icon: <ShoppingBasket size={16} /> },
];

const MORE_ITEMS: { key: PageKey; label: string; icon: React.ReactNode }[] = [
  { key: "villas", label: "Villa", icon: <Home size={16} /> },
  { key: "buses", label: "Bus", icon: <Bus size={16} /> },
  { key: "camping", label: "Camping", icon: <Tent size={16} /> },
];

export default function Navbar({
  active,
  onNavigate,
}: {
  active: PageKey;
  onNavigate: (page: PageKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[color-mix(in_srgb,var(--color-gold-500)_35%,transparent)] bg-[var(--color-parchment-50)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <button
          onClick={() => {
            onNavigate("home");
            setOpen(false);
          }}
          className="flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-indigo-800)] text-[var(--color-gold-300)]">
            <Map size={18} strokeWidth={2.2} />
          </span>
          <span className="font-sans text-xl font-extrabold tracking-tight text-[var(--color-indigo-800)]">
            Ke<span className="text-[var(--color-clay-500)]">lana</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === item.key
                  ? "bg-[var(--color-indigo-800)] text-[var(--color-gold-300)]"
                  : "text-[var(--color-ink-700)] hover:bg-[var(--color-gold-100)]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          <div className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                MORE_ITEMS.some((m) => m.key === active)
                  ? "bg-[var(--color-indigo-800)] text-[var(--color-gold-300)]"
                  : "text-[var(--color-ink-700)] hover:bg-[var(--color-gold-100)]"
              }`}
            >
              Lainnya <ChevronDown size={14} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-[var(--color-gold-300)] bg-white shadow-lg">
                {MORE_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      onNavigate(item.key);
                      setMoreOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-[var(--color-ink-700)] hover:bg-[var(--color-gold-100)]"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button
          className="rounded-full border border-[var(--color-gold-500)] p-2 text-[var(--color-indigo-800)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-[var(--color-gold-300)] px-5 py-3 md:hidden">
          {[...NAV_ITEMS, ...MORE_ITEMS].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onNavigate(item.key);
                setOpen(false);
              }}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                active === item.key
                  ? "bg-[var(--color-indigo-800)] text-[var(--color-gold-300)]"
                  : "text-[var(--color-ink-700)]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
