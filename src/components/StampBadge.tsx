interface StampBadgeProps {
  label?: string;
  size?: number;
  tone?: "gold" | "clay";
}

/**
 * Lencana bergaya "cap" batik/stempel tradisional — elemen signature aplikasi.
 * Dipakai untuk menandai guide terverifikasi & konfirmasi pemesanan berhasil.
 */
export default function StampBadge({ label = "Terverifikasi", size = 72, tone = "clay" }: StampBadgeProps) {
  const color = tone === "clay" ? "var(--color-clay-500)" : "var(--color-gold-500)";
  const id = `stamp-arc-${label.replace(/\s+/g, "-")}`;
  return (
    <div
      className="inline-flex select-none items-center justify-center animate-[stamp_0.5s_cubic-bezier(0.2,1.4,0.4,1)_both]"
      style={{ width: size, height: size, transform: "rotate(-8deg)" }}
      aria-label={label}
      role="img"
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <path id={id} d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
        </defs>
        <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6" />
        <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="2.5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
        {/* motif kawung sederhana di tengah */}
        <g fill={color} opacity="0.9">
          <circle cx="50" cy="40" r="7" />
          <circle cx="60" cy="50" r="7" />
          <circle cx="50" cy="60" r="7" />
          <circle cx="40" cy="50" r="7" />
        </g>
        <circle cx="50" cy="50" r="4" fill="var(--color-parchment-50)" />
        <text fontSize="8.2" fontWeight={700} letterSpacing="1.5" fill={color}>
          <textPath href={`#${id}`} startOffset="2%">
            {label.toUpperCase()} • LELANASOLO • {label.toUpperCase()} •
          </textPath>
        </text>
      </svg>
    </div>
  );
}
