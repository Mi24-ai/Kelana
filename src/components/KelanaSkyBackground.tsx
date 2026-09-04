interface Props {
  className?: string;
}

/**
 * Background hero Kelana — memakai foto ilustrasi langit senja & pendopo
 * Joglo yang sudah dibuat, dipasang sebagai cover image full-bleed dengan
 * overlay gradasi tipis di bagian bawah supaya teks/konten di atasnya
 * tetap terbaca.
 */
export default function BatikMotifBackground({ className = "" }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/image/kelana bg.jpeg')` }}
      />
      {/* overlay tipis agar konten di atasnya kontras & tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-ink-900)]/25" />
    </div>
  );
}
