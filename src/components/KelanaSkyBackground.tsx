interface Props {
  className?: string;
}

/**
 * KelanaSkyBackground — replikasi komposisi hero: langit gradasi jingga-emas,
 * siluet pendopo Joglo di tengah bawah, awan lembut di kedua sisi, dan
 * elemen dekoratif perjalanan (pin+jalur penerbangan, koper, pesawat,
 * kamera "explore", stempel TRAVEL, kartu TOUR GUIDE, kuliner) tersebar
 * di langit — semua vektor SVG dengan token warna dari globals.css.
 */
export default function KelanaSkyBackground({ className = "" }: Props) {
  const W = 1440;
  const H = 760;

  const ink = "var(--color-ink-700)";
  const inkDark = "var(--color-ink-900)";
  const trim = "var(--color-gold-400)";
  const trimSoft = "var(--color-gold-500)";
  const card = "var(--color-parchment-50)";
  const cloud = "var(--color-parchment-200)";

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="kelanaSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7B84A" />
            <stop offset="45%" stopColor="#F3A431" />
            <stop offset="100%" stopColor="#EE8F2B" />
          </linearGradient>
          <radialGradient id="kelanaGlow" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FDE3AE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FDE3AE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* langit — WAJIB paling bawah, isi penuh */}
        <rect width={W} height={H} fill="url(#kelanaSky)" />
        <rect width={W} height={H} fill="url(#kelanaGlow)" />

        {/* jalur pin lokasi kiri atas */}
        <g stroke={inkDark} strokeWidth={2.5} strokeDasharray="6 7" fill="none" opacity={0.75}>
          <path d="M60 190 C 130 140, 180 260, 250 150 C 300 78, 390 98, 450 122" />
        </g>
        <path d="M60 165 a17 17 0 1 1 -0.1 0 Z" fill="var(--color-clay-600)" />
        <circle cx="60" cy="162" r="6" fill={trim} />
        <path d="M225 132 a13 13 0 1 1 -0.1 0 Z" fill="var(--color-clay-500)" />
        <circle cx="225" cy="129" r={4.5} fill={card} />
        <path d="M450 110 a11 11 0 1 1 -0.1 0 Z" fill={trimSoft} />

        {/* koper + pesawat kanan atas */}
        <g transform="translate(1230,90)" className="animate-float-slow">
          <rect x="-40" y="0" width="80" height="60" rx="10" fill="var(--color-gold-300)" stroke={trimSoft} strokeWidth={2.5} />
          <rect x="-40" y="22" width="80" height="8" fill={trimSoft} opacity={0.6} />
          <path d="M-16 0 v-14 a16 16 0 0 1 32 0 v14" fill="none" stroke={trimSoft} strokeWidth={3} />
          <circle cx="-18" cy="18" r="3.5" fill={card} />
          <circle cx="14" cy="34" r="3" fill="var(--color-clay-500)" />
        </g>
        <g stroke={inkDark} strokeWidth={2.5} strokeDasharray="6 7" fill="none" opacity={0.75}>
          <path d="M1270 120 C 1330 150, 1300 200, 1360 210 C 1400 216, 1390 175, 1420 155" />
        </g>
        <path d="M1408 68 l26 -10 l-8 16 l8 16 l-26 -10 l-10 6 l2 -12 l-2 -12 z" fill={inkDark} />

        {/* kartu TOUR GUIDE kanan */}
        <g transform="translate(1300,260)">
          <rect x="0" y="0" width="90" height="60" rx="6" fill={card} stroke={trimSoft} strokeWidth={2} />
          <text x="10" y="24" fontFamily="var(--font-sans)" fontSize="11" fontWeight={700} fill={ink}>TOUR</text>
          <text x="10" y="38" fontFamily="var(--font-sans)" fontSize="11" fontWeight={700} fill={ink}>GUIDE</text>
          <line x1="10" y1="46" x2="80" y2="46" stroke={trimSoft} strokeWidth={1.5} />
          <circle cx="16" cy="52" r="3" fill={trim} />
        </g>

        {/* kamera + "explore" kiri */}
        <g transform="translate(80,300)">
          <rect x="0" y="10" width="46" height="32" rx="5" fill={cloud} stroke={inkDark} strokeWidth={2} />
          <circle cx="23" cy="26" r="10" fill="none" stroke={inkDark} strokeWidth={2.5} />
          <rect x="14" y="2" width="14" height="10" rx="2" fill={cloud} stroke={inkDark} strokeWidth={2} />
          <text x="4" y="64" fontFamily="var(--font-accent)" fontStyle="italic" fontSize="16" fill={ink} opacity={0.85}>explore</text>
        </g>

        {/* stempel TRAVEL kiri bawah */}
        <g transform="translate(190,420)">
          <rect x="0" y="0" width="66" height="66" rx="4" fill="none" stroke={inkDark} strokeWidth={2} strokeDasharray="3 3" />
          <circle cx="33" cy="26" r="12" fill="none" stroke={inkDark} strokeWidth={2} />
          <text x="33" y="52" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" letterSpacing="1" fontWeight={700} fill={ink}>TRAVEL</text>
        </g>

        {/* awan kiri & kanan */}
        <g fill={cloud} opacity={0.9}>
          <ellipse cx="140" cy="600" rx="240" ry="100" />
          <ellipse cx="20" cy="650" rx="170" ry="80" />
          <ellipse cx="1320" cy="600" rx="240" ry="100" />
          <ellipse cx="1430" cy="660" rx="170" ry="80" />
        </g>

        {/* kuliner kanan bawah */}
        <g transform="translate(1330,580)">
          <circle cx="0" cy="0" r="46" fill="var(--color-gold-300)" opacity={0.9} />
          <circle cx="-10" cy="-8" r="16" fill={card} stroke={trimSoft} strokeWidth={1.5} />
          <circle cx="18" cy="-4" r="14" fill="var(--color-parchment-100)" stroke={trimSoft} strokeWidth={1.5} />
          <circle cx="2" cy="20" r="13" fill="var(--color-clay-500)" opacity={0.85} />
        </g>

        {/* siluet pendopo Joglo */}
        <g transform={`translate(${W / 2},${H - 30})`}>
          <path d="M0 -260 L120 -160 L340 -100 L0 -70 L-340 -100 L-120 -160 Z" fill={ink} />
          <path d="M0 -260 L60 -190 L0 -180 L-60 -190 Z" fill={inkDark} />
          <path d="M-340 -100 L-360 -70 L360 -70 L340 -100 Z" fill={ink} opacity={0.95} />
          <path d="M-90 -70 C -90 -110, -40 -120, 0 -122 C 40 -120, 90 -110, 90 -70" fill="none" stroke={trim} strokeWidth={5} />
          <path d="M-60 -70 C -60 -95, -25 -102, 0 -103 C 25 -102, 60 -95, 60 -70" fill={inkDark} stroke={trim} strokeWidth={2.5} />
          <circle cx="0" cy="-92" r="6" fill={trim} />
          {[-300, -220, -140, -60, 60, 140, 220, 300].map((x, i) => (
            <rect key={i} x={x - 4} y={-70} width={8} height={110} fill={trimSoft} opacity={0.85} />
          ))}
          <rect x={-4} y={-100} width={8} height={140} fill={trim} />
          <ellipse cx="0" cy="42" rx="380" ry="16" fill={inkDark} opacity={0.25} />
        </g>
      </svg>
    </div>
  );
}
