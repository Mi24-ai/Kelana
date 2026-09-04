interface Props {
  className?: string;
}

/**
 * Motif kisi ogee (lung-lungan) — diinterpretasi ulang dari batik keraton klasik:
 * belah ketupat lancip berisi sulur bunga, dikelilingi bidang gelap bertekstur
 * titik. Dirender sebagai SVG <pattern> murni (bukan foto), jadi ringan dan
 * bebas isu hak cipta kain foto, sambil tetap terasa "batik" dengan jelas —
 * bukan cuma warna coklat polos.
 */
export default function BatikMotifBackground({ className = "" }: Props) {
  const W = 160;
  const H = 200;
  const bg = "var(--color-ink-900)";
  const cell = "var(--color-clay-600)";
  const ogeeFill = "var(--color-clay-500)";
  const gold = "var(--color-gold-400)";
  const goldSoft = "var(--color-gold-500)";

  const ogeePath = `
    M ${W / 2} 0
    C ${W * 0.8} ${H * 0.07}, ${W} ${H * 0.3}, ${W} ${H / 2}
    C ${W} ${H * 0.7}, ${W * 0.8} ${H * 0.93}, ${W / 2} ${H}
    C ${W * 0.2} ${H * 0.93}, 0 ${H * 0.7}, 0 ${H / 2}
    C 0 ${H * 0.3}, ${W * 0.2} ${H * 0.07}, ${W / 2} 0
    Z
  `;

  // small dotted-cross marks scattered in the negative-space corners, echoing
  // the fine dot texture visible on the reference kain batik
  const corners: [number, number][] = [
    [16, 20], [W - 16, 20], [16, H - 20], [W - 16, H - 20],
    [W / 2, 16], [W / 2, H - 16],
  ];

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="batikOgeeLattice" width={W} height={H} patternUnits="userSpaceOnUse">
          <rect width={W} height={H} fill={bg} />

          {/* tekstur titik di ruang negatif antar belah ketupat */}
          {corners.map(([cx, cy], i) => (
            <g key={i} opacity={0.55}>
              <circle cx={cx} cy={cy} r={1.4} fill={goldSoft} />
              <circle cx={cx - 7} cy={cy} r={0.8} fill={goldSoft} opacity={0.6} />
              <circle cx={cx + 7} cy={cy} r={0.8} fill={goldSoft} opacity={0.6} />
              <circle cx={cx} cy={cy - 7} r={0.8} fill={goldSoft} opacity={0.6} />
              <circle cx={cx} cy={cy + 7} r={0.8} fill={goldSoft} opacity={0.6} />
            </g>
          ))}

          {/* belah ketupat lancip (ogee) */}
          <path d={ogeePath} fill={ogeeFill} stroke={gold} strokeWidth={1.4} opacity={0.9} />
          <path
            d={ogeePath}
            fill="none"
            stroke={cell}
            strokeWidth={5}
            opacity={0.5}
            transform={`translate(${W / 2},${H / 2}) scale(0.92) translate(${-W / 2},${-H / 2})`}
          />

          {/* sulur bunga di dalam ogee, bentuk simetris cermin */}
          <g stroke={gold} strokeWidth={1.6} fill="none" strokeLinecap="round" opacity={0.85}>
            <path d={`M ${W / 2} ${H * 0.32} C ${W * 0.34} ${H * 0.38}, ${W * 0.34} ${H * 0.5}, ${W / 2} ${H * 0.52}`} />
            <path d={`M ${W / 2} ${H * 0.32} C ${W * 0.66} ${H * 0.38}, ${W * 0.66} ${H * 0.5}, ${W / 2} ${H * 0.52}`} />
            <path d={`M ${W / 2} ${H * 0.48} C ${W * 0.36} ${H * 0.54}, ${W * 0.36} ${H * 0.64}, ${W / 2} ${H * 0.68}`} />
            <path d={`M ${W / 2} ${H * 0.48} C ${W * 0.64} ${H * 0.54}, ${W * 0.64} ${H * 0.64}, ${W / 2} ${H * 0.68}`} />
          </g>
          <circle cx={W / 2} cy={H * 0.5} r={4.2} fill={gold} opacity={0.9} />
          <circle cx={W / 2} cy={H * 0.5} r={7} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#batikOgeeLattice)" />
    </svg>
  );
}
