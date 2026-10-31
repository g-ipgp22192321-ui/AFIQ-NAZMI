import { ClueItem, DetectiveQuestion } from '../types/game';

export const DEBACA_INFO = {
  title: "DEBACA 4.0: Pengembaraan Detektif",
  subtitle: "Inovasi Pembelajaran Interaktif Bahasa Melayu Tahun 4",
  tagline: "Baca, Siasat, Fikir, Buktikan!",
  dskpStandards: [
    "2.1.1 Membaca dan memahami petikan dengan sebutan yang betul dan intonasi yang sesuai.",
    "2.2.1 Membaca, memahami, dan mengecam maklumat tersurat dan tersirat untuk membuat ramalan.",
    "5.1.4 Memahami dan menggunakan kata tugas mengikut konteks dengan betul (kata hubung, kata sendi nama, kata seru).",
    "2.3.1 Membaca dan menganalisis kandungan teks untuk membuat kesimpulan yang tepat."
  ]
};

export const AVATAR_OPTIONS = [
  { id: 'sherlock_boy', label: 'Detektif Amir (Penyiasat Pantas)', icon: '🕵️‍♂️' },
  { id: 'sherlock_girl', label: 'Detektif Alya (Pemerhati Tajam)', icon: '🕵️‍♀️' },
  { id: 'scout_boy', label: 'Detektif Danial (Pakar Kod Rahsia)', icon: '🧒' },
  { id: 'scout_girl', label: 'Detektif Maya (Pakar Membaca Laju)', icon: '👧' },
];

export const STATION_3_DATA = {
  title: "Stesen 3: Misteri Perpustakaan Purba",
  location: "Bilik Manuskrip Rahsia",
  badgeName: "Lencana Detektif Pemula",
  badgeIcon: "📜",
  story: `Detektif Cilik tiba di Perpustakaan Purba SK Seri Bintang. Rak buku sejarah kelihatan berselerak dan manuskrip lama telah dialihkan! Untuk mendapatkan Petunjuk Kunci Emas pertama, kamu mesti membaca petikan laporan saksi dan menjawab soalan penyiasatan membaca dengan tepat.`,
  readingPassage: `Pada petang semalam, Encik Ramli, pengawas perpustakaan, mendapati pintu bilik arkib terbuka sedikit. Di atas lantai, terdapat tapak kasut berlumpur yang menghala ke arah tingkap timur. Sehelai kain biru gelap tersangkut pada jeriji tingkap yang berkarat. Sebuah buku ensiklopedia terbuka pada halaman 42 yang mencatatkan peta pulau tersembunyi. Pengawas itu segera membunyikan loceng amaran untuk memanggil skuad penyiasat cilik.`,
  questions: [
    {
      id: 's3_q1',
      teksSoalan: "Apakah bukti fizikal pertama yang ditinggalkan oleh penceroboh di atas lantai arkib?",
      pilihan: [
        "A. Tapak kasut berlumpur menghala ke tingkap timur",
        "B. Sebatang pen berdakwat merah",
        "C. Bekas air minuman yang kosong",
        "D. Cermin mata yang pecah"
      ],
      jawapanBetul: "A. Tapak kasut berlumpur menghala ke tingkap timur",
      petunjuk: "Sila baca perenggan kedua petikan dengan teliti.",
      penerangan: "Petikan dengan jelas menyatakan: 'Di atas lantai, terdapat tapak kasut berlumpur yang menghala ke arah tingkap timur.'",
      markah: 20
    },
    {
      id: 's3_q2',
      teksSoalan: "Berdasarkan sehelai kain yang tersangkut pada tingkap, apakah inferens atau rumusan logik yang boleh dibuat oleh Detektif Cilik?",
      pilihan: [
        "A. Penceroboh memakai pakaian berwarna biru gelap ketika melarikan diri melalui tingkap",
        "B. Tingkap tersebut sengaja dicat dengan warna biru",
        "C. Encik Ramli meletakkan kain tersebut untuk mencuci cermin",
        "D. Penceroboh melarikan diri menggunakan pintu hadapan"
      ],
      jawapanBetul: "A. Penceroboh memakai pakaian berwarna biru gelap ketika melarikan diri melalui tingkap",
      petunjuk: "Hubungkan kain tersangkut dengan cara penceroboh keluar.",
      penerangan: "Kain biru gelap yang koyak dan tersangkut membuktikan pakaian suspek bergesel dengan jeriji tingkap semasa memanjat keluar.",
      markah: 20
    },
    {
      id: 's3_q3',
      teksSoalan: "Halaman 42 buku ensiklopedia terbuka mencatatkan maklumat tentang apa?",
      pilihan: [
        "A. Peta pulau tersembunyi",
        "B. Resipi masakan tradisional",
        "C. Jadual waktu peperiksaan akhir tahun",
        "D. Panduan menanam pokok bunga"
      ],
      jawapanBetul: "A. Peta pulau tersembunyi",
      petunjuk: "Periksa ayat keempat dalam teks laporan saksi.",
      penerangan: "Buku ensiklopedia terbuka membayangkan penceroboh sedang mencari koordinat pulau rahsia.",
      markah: 20
    }
  ],
  clueAwarded: {
    id: 'clue_library',
    tajuk: "Cebisan Peta Kuno #1",
    huraian: "Peta menunjukkan laluan rahsia menghubungkan perpustakaan dengan makmal sains bawah tanah.",
    ikon: "🗺️",
    dijumpai: true
  }
};

export const STATION_4_DATA = {
  title: "Stesen 4: Misteri Makmal Sains Rahsia",
  location: "Makmal Eksperimen Bawah Tanah",
  badgeName: "Lencana Detektif Bijak",
  badgeIcon: "⚗️",
  story: `Detektif Cilik berjaya menjejaki laluan rahsia hingga ke Makmal Sains. Di sini, suspek telah mengunci pintu kebuk kebal dengan sistem kod tatabahasa kata hubung dan kata kerja! Selesaikan teka-teki bahasa untuk membuka pintu keselamatan.`,
  readingPassage: `Detektif Amir melangkah dengan berhati-hati ________ lantai makmal licin dan berair. Detektif Alya pula segera mencatat nombor plat van yang kelihatan mencurigakan di luar bangunan. Mereka bekerjasama bagai aur dengan tebing ________ menyelesaikan misteri ini sebelum senja berlabuh.`,
  questions: [
    {
      id: 's4_q1',
      teksSoalan: "Pilih kata hubung pancangan keterangan yang paling sesuai untuk mengisi tempat kosong pertama dalam ayat:",
      pilihan: [
        "A. kerana",
        "B. manakala",
        "C. lalu",
        "D. atau"
      ],
      jawapanBetul: "A. kerana",
      petunjuk: "Ia menyatakan sebab atau alasan Amir perlu melangkah berhati-hati.",
      penerangan: "'kerana' ialah kata hubung keterangan yang memberi sebab lantai makmal licin.",
      markah: 20
    },
    {
      id: 's4_q2',
      teksSoalan: "Apakah peribahasa 'bagai aur dengan tebing' yang digunakan dalam teks tersebut menggambarkan?",
      pilihan: [
        "A. Semangat kerjasama dan tolong-menolong yang erat",
        "B. Keadaan sungai yang deras",
        "C. Perasaan takut dan cemas",
        "D. Persaingan sengit antara detektif"
      ],
      jawapanBetul: "A. Semangat kerjasama dan tolong-menolong yang erat",
      petunjuk: "Kaitkan hubungan antara Amir dan Alya ketika menyiasat.",
      penerangan: "Peribahasa 'bagai aur dengan tebing' bermaksud saling membantu dan bekerjasama padu.",
      markah: 20
    },
    {
      id: 's4_q3',
      teksSoalan: "Kenal pasti kata kerja pasif berimbuhan 'di-...' dalam ayat penyiasatan berikut: 'Bendalir hijau itu ________ oleh pembantu makmal ke dalam tabung uji bertutup.'",
      pilihan: [
        "A. dituangkan",
        "B. menuangkan",
        "C. tertuang",
        "D. menuang"
      ],
      jawapanBetul: "A. dituangkan",
      petunjuk: "Kata kerja pasif untuk subjek tak bernyawa (bendalir hijau) yang dikenakan perbuatan.",
      penerangan: "'dituangkan' ialah bentuk kata kerja pasif transitif yang gramatis.",
      markah: 20
    }
  ],
  clueAwarded: {
    id: 'clue_lab',
    tajuk: "Tiub Formula Penawar #2",
    huraian: "Bendalir bercahaya keemasan yang mendedahkan nombor rahsia untuk portal menara jam.",
    ikon: "🧪",
    dijumpai: true
  }
};

export const STATION_5_DATA = {
  title: "Stesen 5: Portal Menara Jam & Kod Rahsia",
  location: "Menara Jam Waktu Kuno",
  badgeName: "Lencana Detektif Master",
  badgeIcon: "⏰",
  story: `Inilah kemuncak pengembaraan! Detektif Cilik berdiri di hadapan pintu gerbang Menara Jam. Jarum jam menunjukkan pukul 11:55. Tinggal 5 minit sebelum suspek melarikan manuskrip ke seberang laut! Buktikan kemahiran penaakulan dan kemahiran membaca analitikal kamu untuk menyelesaikan kes.`,
  readingPassage: `Empat orang suspek telah disoal siasat di balai pengawal:
1. Saksi A: 'Saya berada di kafetaria membeli roti pada pukul 5 petang.'
2. Saksi B: 'Saya melihat van putih dipandu laju menghala ke jeti laut pada pukul 5:15 petang.'
3. Saksi C: 'Pakaian saya kotor kerana kasut saya terkena lumpur di tepi tingkap arkib.'
4. Saksi D: 'Saya mengunci semua pintu pagar sekolah pada pukul 6 petang.'`,
  questions: [
    {
      id: 's5_q1',
      teksSoalan: "Berdasarkan bukti tapak kasut berlumpur dan kain biru gelap di Stesen 3, suspek manakah yang paling mencurigakan dan perlu disoal siasat lanjut?",
      pilihan: [
        "A. Saksi C (kerana kasutnya berlumpur di lokasi tingkap arkib)",
        "B. Saksi A (berada di kafetaria)",
        "C. Saksi D (mengunci pintu pagar)",
        "D. Saksi B (hanya melihat van)"
      ],
      jawapanBetul: "A. Saksi C (kerana kasutnya berlumpur di lokasi tingkap arkib)",
      petunjuk: "Bandingkan kenyataan Saksi C dengan petunjuk di tingkap arkib.",
      penerangan: "Pengakuan Saksi C bahawa kasutnya terkena lumpur di tepi tingkap arkib sepadan tepat dengan bukti fizikal tapak kasut berlumpur!",
      markah: 25
    },
    {
      id: 's5_q2',
      teksSoalan: "Apakah pengajaran atau nilai murni utama yang diperoleh daripada kes penyiasatan membaca DEBACA 4.0 ini?",
      pilihan: [
        "A. Kejujuran, ketelitian membaca bukti, dan bekerjasama adalah kunci kejayaan",
        "B. Menghukum orang lain tanpa bukti kukuh",
        "C. Menyimpan rahsia bersendirian tanpa memberitahu guru",
        "D. Melarikan diri daripada masalah yang rumit"
      ],
      jawapanBetul: "A. Kejujuran, ketelitian membaca bukti, dan bekerjasama adalah kunci kejayaan",
      petunjuk: "Pilih nilai positif selaras dengan aspirasi murid KPM.",
      penerangan: "Detektif yang cemerlang sentiasa mengamalkan nilai kejujuran, membaca fakta secara teliti dan berhemah.",
      markah: 25
    }
  ],
  clueAwarded: {
    id: 'clue_clock',
    tajuk: "Kunci Emas Master Manuskrip #3",
    huraian: "Kunci gerbang menara jam yang membuktikan manuskrip telah berjaya diselamatkan!",
    ikon: "🗝️",
    dijumpai: true
  }
};
