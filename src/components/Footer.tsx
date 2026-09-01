import BatikDivider from "./BatikDivider";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[var(--color-indigo-900)] text-[var(--color-parchment-200)]">
      <BatikDivider tone="gold" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4 md:px-10">
        <div>
          <p className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-gold-300)]">Kelana</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-parchment-300)]">
            Satu platform untuk menjelajahi Kota Solo dapat membantu pengguna mencari transportasi, penginapan, rute budaya, dan pemandu lokal
            terpercaya.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-[var(--color-gold-300)]">Layanan</p>
          <ul className="space-y-2 text-sm text-[var(--color-parchment-300)]">
            <li>Tiket Pesawat</li>
            <li>Tiket Kereta (KAI Access)</li>
            <li>Tiket Bus Antar Kota</li>
            <li>Pemesanan Hotel</li>
            <li>Sewa Villa</li>
            <li>Camping & Glamping</li>
            <li>Sewa Tour Guide</li>
            <li>SoloBox — Oleh-Oleh UMKM</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-[var(--color-gold-300)]">Jelajahi</p>
          <ul className="space-y-2 text-sm text-[var(--color-parchment-300)]">
            <li>Rute Warisan Keraton</li>
            <li>Malam di Ngarsopuro</li>
            <li>Kampung Batik Laweyan</li>
            <li>Ngopi & Konten di Solo</li>
            <li>Thrifting & Vintage Hunt</li>
            <li>Sunset & Live Music</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-[var(--color-gold-300)]">Tentang</p>
          <p className="text-sm text-[var(--color-parchment-300)]">
            Kelana merupakan platform digital yang dirancang untuk mempermudah pengalaman jelajah Kota Solo, memberikan informasi dan layanan terlengkap tentang transportasi, penginapan, rute budaya, dan pemandu lokal terpercaya.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-[var(--color-parchment-300)] md:px-10">
        © {new Date().getFullYear()} Kelana. Dibuat dengan bangga untuk Kota Solo, Nusantara.
      </div>
    </footer>
  );
}
