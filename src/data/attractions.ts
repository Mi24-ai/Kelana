import type { IllustrationVariant } from "../types";

export interface Attraction {
  id: string;
  name: string;
  area: string;
  category: string;
  illustration: IllustrationVariant;
  image: string;
  teaser: string;
  story?: string;
}

/**
 * Wisata Solo Raya — ditampilkan di Home sebelum bagian Road Trip, supaya
 * pengunjung kenal dulu "kenapa" suatu tempat layak dikunjungi (bukan cuma
 * nama), lengkap dengan cerita/legenda kalau memang tempatnya punya.
 */
export const attractions: Attraction[] = [
  {
    id: "keraton-kasunanan",
    name: "Keraton Kasunanan Surakarta",
    area: "Kota Solo",
    category: "Sejarah & Budaya",
    illustration: "keraton",
    image: "/image/Keraton.jpg",
    teaser:
      "Istana resmi yang masih dihuni dan berfungsi hingga sekarang. Museumnya menyimpan kereta kencana pusaka, gamelan kuno, dan koleksi keraton yang jarang dipamerkan di tempat lain.",
    story:
      "Keraton ini didirikan tahun 1745 setelah Susuhunan Pakubuwono II memindahkan pusat kerajaan dari Kartasura, yang saat itu porak-poranda akibat pemberontakan Geger Pecinan. Lokasi baru dipilih lewat petunjuk spiritual, dan hingga kini masyarakat Solo masih menganggap kompleks ini sebagai pusat kosmologi kota — segaris lurus dengan Gunung Lawu dan Laut Selatan.",
  },
  {
    id: "pura-mangkunegaran",
    name: "Pura Mangkunegaran",
    area: "Kota Solo",
    category: "Sejarah & Budaya",
    illustration: "mangkunegaran",
    image: "/image/mangkunegaran.jpg",
    teaser:
      "Pendopo tanpa sekat berusia dua abad dengan langit-langit bermotif zodiak Jawa-Eropa. Koleksi keris, topeng, dan perhiasan kerajaannya bisa dilihat dari jarak sangat dekat.",
    story:
      "Berdiri sejak 1757, praja ini lahir dari perjuangan Raden Mas Said — dikenal sebagai Pangeran Sambernyawa karena keberaniannya melawan VOC selama bertahun-tahun sebelum akhirnya berdamai lewat Perjanjian Salatiga. Gelar 'Sambernyawa' sendiri berarti 'penyabar nyawa', julukan yang diberikan lawannya sendiri karena kegigihannya di medan perang.",
  },
  {
    id: "kampung-batik-laweyan",
    name: "Kampung Batik Laweyan",
    area: "Laweyan, Solo",
    category: "Kriya & Belanja",
    illustration: "batik",
    image: "/image/laweyan.jpg",
    teaser:
      "Gang-gang sempit berusia ratusan tahun berisi rumah produksi batik asli. Bisa masuk langsung ke workshop-nya, lihat proses canting, bahkan coba membatik sendiri.",
    story:
      "Laweyan diperkirakan sudah jadi sentra perdagangan batik sejak era Kerajaan Pajang di abad ke-16, jauh sebelum Solo berdiri sebagai kota. Para 'juragan batik' di sini dulu termasuk golongan pedagang terkaya di Jawa, tercermin dari rumah-rumah bergaya indis besar dengan tembok tinggi yang masih berdiri di sepanjang gang hingga sekarang.",
  },
  {
    id: "ngarsopuro-night-market",
    name: "Ngarsopuro Night Market",
    area: "Jl. Diponegoro, Solo",
    category: "Kuliner & Malam",
    illustration: "nightmarket",
    image: "/image/ngarsopuro.jpg",
    teaser:
      "Tiap Sabtu malam, jalan di depan Pura Mangkunegaran berubah jadi pasar malam penuh kuliner kaki lima, kerajinan lokal, dan pertunjukan seni jalanan.",
    story:
      "Kawasan ini direvitalisasi pada 2009 sebagai bagian dari upaya menghidupkan kembali ruang publik heritage Solo — jalur yang sama dulunya rute prosesi kerajaan Mangkunegaran. Sekarang jadi salah satu ruang publik paling ramai di kota, mempertemukan pedagang legendaris dengan generasi muda.",
  },
  {
    id: "grojogan-sewu",
    name: "Air Terjun Grojogan Sewu",
    area: "Tawangmangu, Karanganyar",
    category: "Alam & Lereng Lawu",
    illustration: "waterfall",
    image: "/image/grojogansewu.jpg",
    teaser:
      "Air terjun setinggi 81 meter di lereng barat Gunung Lawu, dikelilingi hutan pinus sejuk. Jalur turunnya berupa anak tangga di antara pepohonan besar, jadi trekking ringan yang menyegarkan.",
    story:
      "Nama 'Grojogan Sewu' berarti 'air terjun seribu' dalam bahasa Jawa — bukan menandakan seribu air terjun literal, melainkan ungkapan untuk derasnya dan banyaknya percikan air yang jatuh dari tebing, seolah pecah jadi ribuan aliran kecil saat menghantam bebatuan di bawahnya.",
  },
  {
    id: "candi-cetho-sukuh",
    name: "Candi Cetho & Candi Sukuh",
    area: "Lereng Gunung Lawu, Karanganyar",
    category: "Sejarah & Spiritual",
    illustration: "candi",
    image: "/image/candi.jpg",
    teaser:
      "Dua candi Hindu peninggalan akhir era Majapahit dengan arsitektur punden berundak yang unik, jauh berbeda dari candi Jawa pada umumnya. Suasananya tenang, berkabut, dan cocok untuk yang suka jalur agak menanjak.",
    story:
      "Konon kedua candi ini dibangun menjelang runtuhnya Majapahit, saat sisa-sisa bangsawan dan pendeta kerajaan menyingkir ke lereng Gunung Lawu. Masyarakat setempat masih memercayai bahwa Prabu Brawijaya V, raja terakhir Majapahit, moksa (menghilang secara gaib) di kawasan Lawu — menjadikan gunung ini tempat yang dianggap sakral hingga kini.",
  },
];