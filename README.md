# LelanaSolo — Platform Jelajah Solo (Surakarta)

Prototipe platform travel all-in-one untuk lomba coding: pemesanan pesawat, kereta (terintegrasi gaya KAI Access),
dan hotel, dilengkapi rute road trip budaya dengan peta mini interaktif serta marketplace tour guide lokal
terverifikasi. Desain mengangkat tema Nusantara — motif batik parang & kawung, warna Royal Indigo dan Heritage
Gold, serta lencana "cap batik" sebagai elemen khas.

## Menjalankan secara lokal

Prasyarat: Node.js 18+

1. Install dependensi:
   ```
   npm install
   ```
2. Jalankan mode pengembangan:
   ```
   npm run dev
   ```
3. Buka `http://localhost:3000`

## Build produksi

```
npm run build
npm run preview
```

## Struktur proyek

```
src/
  components/   Navbar, Footer, BookingWizard (wizard pemesanan 3 langkah),
                MiniMap (peta Leaflet), StampBadge & BatikDivider (elemen batik khas)
  data/         Data contoh: penerbangan, kereta, hotel, tour guide, itinerary
  pages/        Home, FlightsPage, TrainsPage, HotelsPage, GuidesPage, RoadTripPage
  types.ts      Tipe data bersama
  lib/format.ts Formatter mata uang & kode booking
```

## Catatan integrasi

- **Kereta Api**: alur pemesanan disiapkan agar mudah dihubungkan ke API resmi KAI Access; saat ini memakai
  data simulasi dengan label "Terintegrasi dengan KAI Access".
- **Pembayaran**: wizard pemesanan (`BookingWizard.tsx`) mensimulasikan pemilihan metode bayar & konfirmasi —
  belum terhubung payment gateway sungguhan.
- **Peta**: `MiniMap.tsx` memakai react-leaflet + tile OpenStreetMap gratis, sudah berisi koordinat asli
  titik-titik budaya di Solo (Keraton Kasunanan, Kampung Batik Kauman, Pura Mangkunegaran, dll).

## Ide pengembangan lanjutan

- Hubungkan `data/*.ts` ke backend/API sungguhan (harga & jadwal real-time)
- Tambahkan autentikasi pengguna & riwayat pemesanan
- Tambahkan galeri foto asli untuk tiap hotel/itinerary
