interface BatikDividerProps {
  tone?: "gold" | "parchment";
  className?: string;
}

/** Garis pembatas motif parang miring — dipakai berulang sebagai identitas visual antar seksi. */
export default function BatikDivider({ tone = "gold", className = "" }: BatikDividerProps) {
  const stroke = tone === "gold" ? "var(--color-gold-500)" : "var(--color-parchment-300)";
  return (
    <svg
      className={`block w-full ${className}`}
      height="14"
      viewBox="0 0 240 14"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <path
          key={i}
          d={`M ${i * 20} 14 L ${i * 20 + 10} 0 L ${i * 20 + 20} 14`}
          fill="none"
          stroke={stroke}
          strokeWidth="1.25"
          opacity={0.7}
        />
      ))}
    </svg>
  );
}
