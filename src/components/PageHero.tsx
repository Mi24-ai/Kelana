import type { ReactNode } from "react";
import BatikDivider from "./BatikDivider";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  rightSlot?: ReactNode;
}

/**
 * Heritage hero banner — dark indigo panel with a fine batik dot texture and
 * a gold parang divider along the base. This is the recurring "signature"
 * across every booking page (Pesawat, Kereta, Hotel, Rute), so the whole
 * booking flow reads as one considered system rather than four separate
 * screens bolted together.
 */
export default function PageHero({ eyebrow, title, description, icon, rightSlot }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[var(--color-indigo-900)]">
      <div className="bg-batik-dot pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-[var(--color-gold-500)]/10 blur-2xl" />

      <div className="relative z-10 flex flex-col gap-4 px-6 py-8 sm:flex-row sm:items-end sm:justify-between md:px-9 md:py-10">
        <div>
          <div className="mb-2 flex items-center gap-2">
            {icon && <span className="text-[var(--color-gold-400)]">{icon}</span>}
            <p className="font-accent text-sm italic tracking-wide text-[var(--color-gold-400)]">{eyebrow}</p>
          </div>
          <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-parchment-50)] md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-parchment-300)]">{description}</p>
          )}
        </div>
        {rightSlot && <div className="shrink-0">{rightSlot}</div>}
      </div>

      <BatikDivider tone="gold" className="relative z-10 opacity-80" />
    </div>
  );
}