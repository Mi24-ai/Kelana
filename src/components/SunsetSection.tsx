import type { ReactNode } from "react";
import { Plane, Camera, Luggage, MapPin } from "lucide-react";

export default function SunsetSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`sunset-section px-5 py-14 md:px-8 ${className}`}>
      {/* doodle dekoratif mengambang, ala mood board perjalanan */}
      <Plane size={30} className="animate-float-slow absolute left-[6%] top-[10%] rotate-[18deg] text-[var(--color-indigo-950)]/25" />
      <Camera size={26} className="animate-float-slower absolute right-[8%] top-[16%] -rotate-[10deg] text-[var(--color-indigo-950)]/20" />
      <Luggage size={26} className="animate-float-slow absolute left-[12%] bottom-[10%] rotate-[6deg] text-[var(--color-indigo-950)]/20" />
      <MapPin size={24} className="animate-float-slower absolute right-[14%] bottom-[14%] text-[var(--color-indigo-950)]/25" />
      <div className="relative mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
