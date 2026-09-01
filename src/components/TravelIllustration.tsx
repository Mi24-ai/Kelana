import type { IllustrationVariant } from "../types";

interface Props {
  variant: IllustrationVariant;
  className?: string;
}

/**
 * Skema warna langit senja + siluet konsisten, terinspirasi dari mood board
 * (gradasi jingga-emas + doodle jalan-jalan). Setiap varian punya siluet berbeda
 * supaya tiap kartu terasa unik, bukan foto generik/placeholder acak.
 */
export default function TravelIllustration({ variant, className = "" }: Props) {
  return (
    <svg viewBox="0 0 400 240" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-label={variant}>
      <defs>
        <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0954A" />
          <stop offset="55%" stopColor="#F7C463" />
          <stop offset="100%" stopColor="#FFE2A8" />
        </linearGradient>
        <linearGradient id={`sky-cool-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#253A8C" />
          <stop offset="100%" stopColor="#6B7FC4" />
        </linearGradient>
      </defs>

      {["cafe", "thrift", "sunsetmusic", "villa-pool", "camp-tent"].includes(variant) ? null : null}

      <SceneBody variant={variant} />
    </svg>
  );
}

function SceneBody({ variant }: { variant: IllustrationVariant }) {
  const sky = <rect width="400" height="240" fill={`url(#sky-${variant})`} />;
  const sun = <circle cx="330" cy="55" r="26" fill="#FCE4A0" opacity="0.9" />;
  const dottedPath = (
    <path d="M 20 60 Q 120 20 200 70 T 380 40" fill="none" stroke="var(--color-indigo-800)" strokeWidth="2" strokeDasharray="1 10" strokeLinecap="round" opacity="0.5" />
  );
  const plane = (
    <g transform="translate(300,30) rotate(20)" opacity="0.85">
      <path d="M0 0 L14 4 L0 8 L3 4 Z" fill="var(--color-indigo-800)" />
    </g>
  );
  const pin = (x: number, y: number, color = "#A6432A") => (
    <g transform={`translate(${x},${y})`}>
      <path d="M0 0 C -8 -14 -8 -24 0 -24 C 8 -24 8 -14 0 0 Z" fill={color} />
      <circle cx="0" cy="-16" r="4" fill="#FFF" />
    </g>
  );
  const ground = (color: string) => <rect x="0" y="176" width="400" height="64" fill={color} />;

  switch (variant) {
    case "keraton":
      return (
        <>
          {sky}
          {sun}
          {dottedPath}
          {ground("#C9A96A")}
          {/* pendopo joglo silhouette */}
          <g transform="translate(200,178)">
            <polygon points="-130,-6 0,-72 130,-6" fill="var(--color-indigo-800)" />
            <polygon points="-96,-6 0,-56 96,-6" fill="var(--color-indigo-900)" />
            <rect x="-84" y="-6" width="168" height="10" fill="var(--color-indigo-950)" />
            {Array.from({ length: 9 }).map((_, i) => (
              <rect key={i} x={-78 + i * 19.5} y={-6} width="6" height="46" fill="var(--color-indigo-950)" />
            ))}
          </g>
          {pin(60, 150)}
        </>
      );
    case "mangkunegaran":
      return (
        <>
          {sky}
          {sun}
          {ground("#D8B77E")}
          <g transform="translate(200,178)">
            <rect x="-150" y="-70" width="300" height="70" fill="#7A2E1C" opacity="0.92" />
            <polygon points="-160,-70 0,-118 160,-70" fill="#A6432A" />
            {Array.from({ length: 11 }).map((_, i) => (
              <rect key={i} x={-138 + i * 25} y={-64} width="12" height="60" fill="#F5E7C4" opacity="0.85" />
            ))}
          </g>
          {pin(320, 150, "var(--color-indigo-800)")}
        </>
      );
    case "batik":
      return (
        <>
          {sky}
          {ground("#EADFC2")}
          <g transform="translate(60,60)">
            {Array.from({ length: 4 }).map((_, r) =>
              Array.from({ length: 6 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={c * 26} cy={r * 26} r="9" fill="none" stroke="#7A2E1C" strokeWidth="2" opacity="0.55" />
              ))
            )}
          </g>
          <g transform="translate(190,150)">
            <rect x="-90" y="0" width="180" height="26" rx="6" fill="var(--color-indigo-800)" />
            <rect x="-70" y="-22" width="140" height="26" rx="6" fill="#A6432A" />
          </g>
        </>
      );
    case "nightmarket":
      return (
        <>
          <rect width="400" height="240" fill="var(--color-indigo-900)" />
          <circle cx="335" cy="45" r="20" fill="#F5E7C4" opacity="0.9" />
          {ground("var(--color-indigo-950)")}
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${40 + i * 90},150)`}>
              <rect x="-30" y="-40" width="60" height="40" fill="#A6432A" />
              <polygon points="-36,-40 0,-58 36,-40" fill="#C89B3C" />
              <circle cx="0" cy="-64" r="4" fill="#FFE2A8" />
            </g>
          ))}
        </>
      );
    case "waterfall":
      return (
        <>
          <rect width="400" height="240" fill={`url(#sky-cool-${variant})`} />
          <polygon points="0,150 130,40 260,150" fill="#33499e" opacity="0.85" />
          <polygon points="140,170 260,60 400,170" fill="#253A8C" opacity="0.9" />
          <rect x="182" y="30" width="30" height="140" fill="#DCEBFF" opacity="0.85" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={185 + (i % 2) * 4} y={30 + i * 22} width="22" height="14" fill="#F5FAFF" opacity="0.4" />
          ))}
          {ground("#4E9C86")}
        </>
      );
    case "cafe":
      return (
        <>
          {sky}
          {ground("#EADFC2")}
          <g transform="translate(200,150)">
            <rect x="-110" y="-90" width="220" height="90" rx="8" fill="#7A2E1C" />
            <rect x="-90" y="-70" width="70" height="50" rx="4" fill="#FFE2A8" opacity="0.9" />
            <rect x="20" y="-70" width="70" height="50" rx="4" fill="#FFE2A8" opacity="0.9" />
            <rect x="-14" y="-90" width="28" height="20" fill="#C89B3C" />
          </g>
          <g transform="translate(140,175)">
            <rect x="-10" y="-22" width="20" height="22" rx="3" fill="var(--color-indigo-800)" />
            <path d="M-10 -22 Q0 -34 10 -22" fill="none" stroke="var(--color-indigo-800)" strokeWidth="3" />
          </g>
        </>
      );
    case "thrift":
      return (
        <>
          {sky}
          {ground("#EADFC2")}
          <g transform="translate(200,120)">
            <rect x="-140" y="0" width="280" height="6" fill="var(--color-indigo-800)" />
            <rect x="-140" y="-4" width="6" height="60" fill="var(--color-indigo-800)" />
            <rect x="134" y="-4" width="6" height="60" fill="var(--color-indigo-800)" />
            {[-95, -55, -15, 25, 65, 95].map((x, i) => (
              <polygon key={i} points={`${x},6 ${x - 20},50 ${x + 20},50`} fill={i % 2 === 0 ? "#A6432A" : "#C89B3C"} />
            ))}
          </g>
        </>
      );
    case "sunsetmusic":
      return (
        <>
          {sky}
          {sun}
          {ground("#7A2E1C")}
          <g transform="translate(160,178)">
            <ellipse cx="0" cy="-40" rx="26" ry="34" fill="var(--color-indigo-900)" />
            <rect x="-4" y="-70" width="8" height="40" fill="var(--color-indigo-900)" />
          </g>
          <g transform="translate(250,178)" opacity="0.9">
            <rect x="-3" y="-55" width="6" height="55" fill="var(--color-indigo-950)" />
            <circle cx="0" cy="-58" r="10" fill="var(--color-indigo-950)" />
          </g>
        </>
      );
    case "hotel-modern":
      return (
        <>
          {sky}
          {ground("#F3E9D3")}
          <g transform="translate(220,178)">
            <rect x="-60" y="-140" width="120" height="140" fill="var(--color-ink-700)" />
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 4 }).map((_, c) => (
                <rect key={`${r}-${c}`} x={-48 + c * 28} y={-128 + r * 26} width="18" height="16" fill="#F7C463" opacity={(r + c) % 3 === 0 ? 0.95 : 0.5} />
              ))
            )}
          </g>
          <ellipse cx="120" cy="188" rx="90" ry="14" fill="#4E9C86" opacity="0.5" />
        </>
      );
    case "hotel-resort":
      return (
        <>
          {sky}
          {ground("#EADFC2")}
          <ellipse cx="200" cy="185" rx="150" ry="16" fill="#4E9C86" opacity="0.6" />
          <g transform="translate(150,178)">
            <rect x="-70" y="-46" width="140" height="46" fill="#C97952" />
            <polygon points="-80,-46 0,-78 80,-46" fill="#A6432A" />
          </g>
          {[290, 330, 60].map((x, i) => (
            <g key={i} transform={`translate(${x},175) scale(0.8)`}>
              <rect x="-3" y="-46" width="6" height="46" fill="#7A5A1E" />
              <ellipse cx="0" cy="-52" rx="22" ry="10" fill="#164F42" />
            </g>
          ))}
        </>
      );
    case "hotel-heritage":
      return (
        <>
          {sky}
          {ground("#E7D9B8")}
          <g transform="translate(200,178)">
            <rect x="-120" y="-80" width="240" height="80" fill="#F5E7C4" />
            {[-90, -50, -10, 30, 70].map((x, i) => (
              <rect key={i} x={x} y={-72} width="14" height="72" fill="#DBB65C" />
            ))}
            <rect x="-130" y="-90" width="260" height="12" fill="#7A5A1E" />
          </g>
        </>
      );
    case "hotel-joglo":
      return (
        <>
          {sky}
          {ground("#EADFC2")}
          <g transform="translate(200,178)">
            <polygon points="-110,-4 0,-64 110,-4" fill="#7A2E1C" />
            <polygon points="-84,-4 0,-50 84,-4" fill="#A6432A" />
            <rect x="-70" y="-4" width="140" height="8" fill="#4A2415" />
            {Array.from({ length: 7 }).map((_, i) => (
              <rect key={i} x={-64 + i * 21} y={-4} width="5" height="36" fill="#4A2415" />
            ))}
          </g>
        </>
      );
    case "room-standard":
      return (
        <>
          <rect width="400" height="240" fill="#F5E7C4" />
          <rect x="0" y="150" width="400" height="90" fill="#E7D9B8" />
          <rect x="60" y="90" width="180" height="70" rx="8" fill="#FDFAF3" stroke="#C89B3C" strokeWidth="3" />
          <rect x="60" y="90" width="180" height="20" rx="8" fill="var(--color-indigo-800)" />
          <circle cx="270" cy="120" r="26" fill="#DBB65C" opacity="0.6" />
        </>
      );
    case "room-suite":
      return (
        <>
          <rect width="400" height="240" fill="#F5E7C4" />
          <rect x="0" y="150" width="400" height="90" fill="#E7D9B8" />
          <rect x="40" y="100" width="150" height="60" rx="8" fill="#FDFAF3" stroke="#C89B3C" strokeWidth="3" />
          <rect x="40" y="100" width="150" height="18" rx="8" fill="#A6432A" />
          <rect x="220" y="120" width="120" height="40" rx="10" fill="var(--color-indigo-800)" opacity="0.85" />
          <circle cx="360" cy="80" r="20" fill="#DBB65C" opacity="0.6" />
        </>
      );
    case "villa-pool":
      return (
        <>
          {sky}
          {ground("#EADFC2")}
          <g transform="translate(150,170)">
            <rect x="-90" y="-60" width="180" height="60" fill="#F5E7C4" />
            <polygon points="-100,-60 0,-92 100,-60" fill="#164F42" />
          </g>
          <rect x="60" y="182" width="280" height="30" rx="8" fill="#4E9C86" opacity="0.75" />
          <rect x="60" y="182" width="280" height="6" fill="#DCEBFF" opacity="0.7" />
        </>
      );
    case "camp-tent":
      return (
        <>
          <rect width="400" height="240" fill={`url(#sky-cool-${variant})`} />
          {Array.from({ length: 18 }).map((_, i) => (
            <circle key={i} cx={(i * 53) % 400} cy={(i * 37) % 90} r="1.4" fill="#FFF" opacity="0.8" />
          ))}
          <circle cx="330" cy="45" r="18" fill="#F5E7C4" opacity="0.9" />
          <polygon points="60,190 200,190 200,90 60,190" fill="var(--color-indigo-950)" opacity="0" />
          <polygon points="0,190 400,190 400,240 0,240" fill="var(--color-ink-900)" />
          <polygon points="140,100 220,190 60,190" fill="#A6432A" />
          <polygon points="140,100 180,190 100,190" fill="#7A2E1C" />
          <g transform="translate(300,180)">
            <ellipse cx="0" cy="10" rx="26" ry="6" fill="#7A5A1E" opacity="0.5" />
            <path d="M-14 10 L0 -18 L14 10 Z" fill="#F7C463" opacity="0.9" />
          </g>
        </>
      );
    case "bus-travel":
      return (
        <>
          {sky}
          {ground("#EADFC2")}
          <rect x="0" y="185" width="400" height="6" fill="#4A4133" opacity="0.4" />
          <g transform="translate(150,178)">
            <rect x="-110" y="-70" width="220" height="70" rx="12" fill="var(--color-indigo-800)" />
            <rect x="-98" y="-58" width="50" height="30" rx="4" fill="#F7C463" />
            <rect x="-38" y="-58" width="50" height="30" rx="4" fill="#F7C463" />
            <rect x="22" y="-58" width="50" height="30" rx="4" fill="#F7C463" />
            <circle cx="-70" cy="4" r="14" fill="var(--color-indigo-950)" />
            <circle cx="70" cy="4" r="14" fill="var(--color-indigo-950)" />
          </g>
          <polygon points="290,170 340,120 400,170" fill="#33499e" opacity="0.6" />
        </>
      );
    case "candi":
      return (
        <>
          <rect width="400" height="240" fill={`url(#sky-${variant})`} />
          {sun}
          {/* siluet lereng gunung berundak */}
          <polygon points="0,180 130,70 260,180" fill="var(--color-indigo-900)" opacity="0.85" />
          <polygon points="150,190 300,90 400,190" fill="var(--color-indigo-800)" opacity="0.9" />
          {ground("#8A8070")}
          {/* candi berundak ala Sukuh/Cetho */}
          <g transform="translate(190,182)">
            <polygon points="-90,0 90,0 66,-22 -66,-22" fill="#603A1E" />
            <polygon points="-66,-22 66,-22 46,-42 -46,-42" fill="#784A28" />
            <polygon points="-46,-42 46,-42 28,-62 -28,-62" fill="#9C7A2A" />
            <rect x="-10" y="-80" width="20" height="18" fill="#4A2712" />
          </g>
          {pin(320, 150, "var(--color-clay-500)")}
        </>
      );
    case "souvenir":
      return (
        <>
          {sky}
          {ground("#EADFC2")}
          {/* keranjang anyaman */}
          <g transform="translate(200,178)">
            <path d="M -70,0 C -70,-8 70,-8 70,0 L 58,34 C 58,42 -58,42 -58,34 Z" fill="#8A5A2A" />
            {[-50, -25, 0, 25, 50].map((x, i) => (
              <line key={i} x1={x * 0.92} y1={2} x2={x * 0.72} y2={33} stroke="#6B3F1C" strokeWidth={2} opacity={0.6} />
            ))}
            <rect x="-72" y="-10" width="144" height="8" rx="3" fill="#6B3F1C" />
            {/* kain batik terlipat, mengintip dari keranjang */}
            <polygon points="-48,-10 48,-10 34,-38 -34,-38" fill="var(--color-clay-500)" />
            <polygon points="-34,-38 34,-38 22,-56 -22,-56" fill="var(--color-gold-500)" />
            <circle cx="0" cy="-47" r="4" fill="var(--color-indigo-900)" />
          </g>
          {/* toples camilan di sisi kiri */}
          <g transform="translate(95,190)">
            <rect x="-16" y="-46" width="32" height="46" rx="6" fill="#F4EAD0" stroke="#B8863C" strokeWidth={2} />
            <rect x="-18" y="-52" width="36" height="10" rx="3" fill="#8A5A2A" />
            <circle cx="-6" cy="-24" r="3" fill="#B8863C" />
            <circle cx="4" cy="-16" r="3" fill="#B8863C" />
            <circle cx="-2" cy="-8" r="3" fill="#B8863C" />
          </g>
          {pin(310, 145, "var(--color-clay-500)")}
        </>
      );
    default:
      return <>{sky}</>;
  }
}
