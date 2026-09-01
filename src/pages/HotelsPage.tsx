import { useState } from "react";
import { Star, MapPin, Wifi, Waves, Dumbbell, Coffee, Car, Sparkles, ShieldCheck, X, Building2 } from "lucide-react";
import { hotels } from "../data/hotels";
import { formatIDR } from "../lib/format";
import BookingWizard from "../components/BookingWizard";
import PageHero from "../components/PageHero";
import TravelIllustration from "../components/TravelIllustration";
import type { Hotel } from "../types";

const FACILITY_ICON: Record<string, React.ReactNode> = {
  "Kolam renang": <Waves size={13} />,
  "Wifi gratis": <Wifi size={13} />,
  Gym: <Dumbbell size={13} />,
  Sarapan: <Coffee size={13} />,
  "Sarapan tradisional": <Coffee size={13} />,
  "Parkir valet": <Car size={13} />,
  Spa: <Sparkles size={13} />,
  "Spa jamu": <Sparkles size={13} />,
};

function HotelPhoto({ photo, illustration, className }: { photo?: string; illustration: Hotel["illustration"]; className: string }) {
  if (photo) {
    return <img src={photo} alt="" className={`${className} object-cover`} loading="lazy" />;
  }
  return <TravelIllustration variant={illustration} className={className} />;
}

export default function HotelsPage() {
  const [open, setOpen] = useState<Hotel | null>(null);
  const [booking, setBooking] = useState<{ hotel: Hotel; room: Hotel["roomTypes"][number] } | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <PageHero
        eyebrow="Hotel & Penginapan"
        icon={<Building2 size={16} />}
        title="Menginap di Solo"
        description="Detail lengkap fasilitas, pajak, dan kebijakan pembatalan — supaya tidak ada biaya tersembunyi."
        rightSlot={
          <p className="tabular font-accent text-sm italic text-[var(--color-gold-300)]">{hotels.length} penginapan pilihan</p>
        }
      />

      {/* grid ala Traveloka: foto besar di atas, badge rating melayang, harga & CTA di bawah */}
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {hotels.map((h, i) => (
          <button
            key={h.id}
            onClick={() => setOpen(h)}
            className="animate-fade-up group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-gold-300)] bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="relative h-44 w-full overflow-hidden bg-[var(--color-parchment-200)]">
              <HotelPhoto
                photo={h.photo}
                illustration={h.illustration}
                className="h-full w-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-[var(--color-gold-900)] shadow-sm">
                <Star size={12} fill="currentColor" /> {h.rating}
                <span className="font-normal text-[var(--color-ink-300)]">({h.reviewCount})</span>
              </div>
              <p className="absolute bottom-2 left-3 flex items-center gap-1 text-xs font-medium text-white/95">
                <MapPin size={11} /> {h.distanceToCenterKm} km dari pusat kota
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-indigo-800)]">{h.name}</h3>
                <p className="flex items-center gap-1 text-xs text-[var(--color-ink-500)]">
                  <MapPin size={12} /> {h.area}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {h.facilities.slice(0, 4).map((f) => (
                  <span key={f} className="flex items-center gap-1 rounded-full bg-[var(--color-parchment-200)] px-2.5 py-1 text-[11px] text-[var(--color-ink-700)]">
                    {FACILITY_ICON[f]} {f}
                  </span>
                ))}
              </div>
              <div className="mt-1 flex items-end justify-between border-t border-dashed border-[var(--color-parchment-300)] pt-3">
                <div>
                  <p className="text-[11px] text-[var(--color-ink-300)]">mulai dari</p>
                  <p className="tabular font-[var(--font-display)] text-xl font-semibold text-[var(--color-clay-500)]">
                    {formatIDR(h.pricePerNight)} <span className="text-xs font-normal text-[var(--color-ink-500)]">/malam</span>
                  </p>
                </div>
                <span className="rounded-full bg-[var(--color-indigo-800)] px-4 py-2 text-xs font-semibold text-[var(--color-gold-300)]">Lihat Detail</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--color-ink-900)]/60 backdrop-blur-sm md:items-center">
          <div className="heritage-frame animate-rise flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-[var(--color-parchment-50)] md:rounded-3xl">
            {/* hero foto besar ala halaman detail Traveloka */}
            <div className="relative h-56 w-full overflow-hidden bg-[var(--color-parchment-200)]">
              <HotelPhoto photo={open.photo} illustration={open.illustration} className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-indigo-950)]/85 via-[var(--color-indigo-950)]/10 to-transparent" />
              <button onClick={() => setOpen(null)} className="absolute right-3 top-3 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/50">
                <X size={20} />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-1.5 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-[var(--color-gold-900)] w-fit">
                  <Star size={12} fill="currentColor" /> {open.rating} <span className="font-normal text-[var(--color-ink-300)]">({open.reviewCount} ulasan)</span>
                </div>
                <h3 className="font-[var(--font-display)] text-2xl font-semibold text-white">{open.name}</h3>
                <p className="flex items-center gap-1 text-xs text-white/85">
                  <MapPin size={12} /> {open.area}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <p className="text-sm leading-relaxed text-[var(--color-ink-500)]">{open.description}</p>

              <div>
                <p className="mb-2 text-sm font-semibold text-[var(--color-indigo-800)]">Fasilitas</p>
                <div className="flex flex-wrap gap-2">
                  {open.facilities.map((f) => (
                    <span key={f} className="flex items-center gap-1 rounded-full bg-[var(--color-gold-100)] px-3 py-1.5 text-xs text-[var(--color-ink-700)]">
                      {FACILITY_ICON[f]} {f}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-[var(--color-indigo-800)]">Tipe kamar</p>
                <div className="space-y-3">
                  {open.roomTypes.map((r) => {
                    const tax = Math.round(r.price * (open.taxPercent / 100));
                    return (
                      <div key={r.name} className="flex gap-3 overflow-hidden rounded-xl border border-[var(--color-gold-300)] bg-white p-3 shadow-sm">
                        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-[var(--color-parchment-200)]">
                          {r.photo ? (
                            <img src={r.photo} alt={r.name} className="h-full w-full object-cover" loading="lazy" />
                          ) : (
                            <TravelIllustration variant={r.illustration} className="h-full w-full" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-[var(--color-ink-700)]">{r.name}</p>
                              <p className="text-xs text-[var(--color-ink-500)]">{r.note} · maks {r.capacity} tamu</p>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-[var(--color-parchment-300)] pt-2 text-xs text-[var(--color-ink-500)]">
                            <span>
                              {formatIDR(r.price)} + pajak {open.taxPercent}% ({formatIDR(tax)})
                            </span>
                            <button
                              onClick={() => setBooking({ hotel: open, room: r })}
                              className="rounded-full bg-[var(--color-clay-500)] px-4 py-1.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
                            >
                              Pesan · {formatIDR(r.price + tax)}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-[var(--color-emerald-700)]/10 p-3 text-xs text-[var(--color-emerald-700)]">
                <ShieldCheck size={16} />
                Gratis pembatalan hingga {open.freeCancelUntilHours} jam sebelum check-in.
              </div>
            </div>
          </div>
        </div>
      )}

      {booking && (
        <BookingWizard
          kind="hotel"
          title={`${booking.hotel.name} · ${booking.room.name}`}
          subtitle={`${booking.room.note} · maks ${booking.room.capacity} tamu`}
          summaryLines={[
            { label: "Hotel", value: booking.hotel.name },
            { label: "Tipe kamar", value: booking.room.name },
            { label: "Harga/malam", value: formatIDR(booking.room.price) },
            { label: "Pajak", value: `${booking.hotel.taxPercent}%` },
            { label: "Pembatalan gratis", value: `s.d. ${booking.hotel.freeCancelUntilHours} jam sebelum check-in` },
          ]}
          total={Math.round(booking.room.price * (1 + booking.hotel.taxPercent / 100))}
          onClose={() => {
            setBooking(null);
            setOpen(null);
          }}
        />
      )}
    </div>
  );
}