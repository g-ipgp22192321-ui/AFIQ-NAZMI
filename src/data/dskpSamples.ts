import { RPHData, QuizData, BBMData } from '../types';

export const SUBJECT_LIST = [
  'Bahasa Melayu',
  'Bahasa Inggeris (CEFR)',
  'Sains',
  'Matematik',
  'Sejarah',
  'Reka Bentuk & Teknologi (RBT)',
  'Pendidikan Islam',
  'Pendidikan Moral',
  'Pendidikan Jasmani & Kesihatan (PJK)',
  'Pendidikan Seni Visual (PSV)',
  'Geografi',
  'Fizik',
  'Kimia',
  'Biologi',
  'Prinsip Perakaunan',
  'Perniagaan',
];

export const GRADE_LEVELS = [
  'Prasekolah',
  'Tahun 1 (KSSR Semakan)',
  'Tahun 2 (KSSR Semakan)',
  'Tahun 3 (KSSR Semakan)',
  'Tahun 4 (KSSR Semakan)',
  'Tahun 5 (KSSR Semakan)',
  'Tahun 6 (KSSR Semakan)',
  'Tingkatan 1 (KSSM)',
  'Tingkatan 2 (KSSM)',
  'Tingkatan 3 (KSSM)',
  'Tingkatan 4 (KSSM)',
  'Tingkatan 5 (KSSM)',
];

export const PAK21_STRATEGIES = [
  'Think-Pair-Share (Fikir-Pasang-Kongsi)',
  'Gallery Walk (Jelajah Pembelajaran)',
  'Round Robin & Round Table',
  'Hot Seat (Kerusi Panas)',
  'Jigsaw Learning',
  'Bus Stop (Hentian Bas)',
  'Role Play (Main Peranan)',
  'Three Stray One Stay',
  'I-Think Maps (Peta Pemikiran)',
  'Penyelesaian Masalah (Problem-Based Learning)',
];

export const EMK_LIST = [
  'Bahasa',
  'Kelestarian Alam Sekitar',
  'Nilai Murni',
  'Sains & Teknologi',
  'Patriotisme',
  'Kreativiti & Inovasi',
  'Keusahawanan',
  'Teknologi Maklumat & Komunikasi (TMK)',
  'Kelestarian Global',
  'Pendidikan Kewangan',
];

export const SAMPLE_RPH: RPHData = {
  tajuk: "RPH Sains: Kemandirian Spesies Haiwan",
  mataPelajaran: "Sains",
  tingkatanTahun: "Tahun 5 (KSSR Semakan)",
  temaBidang: "Sains Hayat / Kemandirian Spesies",
  tarikhMasa: "Isnin | 8:30 Pagi - 9:30 Pagi (60 Minit)",
  standardKandungan: "3.1 Kemandirian Spesies Haiwan",
  standardPembelajaran: "3.1.1 Menjelaskan dengan contoh ciri dan tingkah laku khas haiwan untuk melindungi diri daripada musuh.\n3.1.2 Menaakul kepentingan kemandirian spesies haiwan bagi mengekalkan keseimbangan ekosistem.",
  objektifPembelajaran: [
    "Pada akhir PdP, sekurang-kurangnya 80% murid dapat mengenal pasti dan menyatakan sekurang-kurangnya 4 ciri khas haiwan melindungi diri daripada musuh dengan tepat.",
    "Murid dapat menghuraikan sekurang-kurangnya satu kepentingan kemandirian spesies dalam carta rantai makanan secara bertulis."
  ],
  kriteriaKejayaan: [
    "Saya boleh menamakan 4 ciri fizikal khas haiwan (cth: cangkerang keras, duri tajam, tanduk, sengat berbisa).",
    "Saya boleh memadankan tingkah laku khas (cth: memutuskan anggota, menyamar, menggulungkan diri) dengan haiwan yang betul.",
    "Saya boleh melengkapkan aktiviti Gallery Walk bersama kumpulan dengan membentangkan satu haiwan pilihan."
  ],
  konsepKosaKata: ["Kemandirian Spesies", "Penyamaran (Camouflage)", "Pemangsa", "Autotomi", "Keseimbangan Ekosistem"],
  bahanBantuMengajar: [
    "Slaid Canva & Video Pendek National Geographic",
    "Kad Gambar Haiwan & Kertas Sebak",
    "Pen penanda pelbagai warna (PAK-21)",
    "Lembaran Kerja Pentaksiran Bilik Darjah (PBD)"
  ],
  elemenMerentasKurikulum: ["Kelestarian Alam Sekitar", "Nilai Murni (Menyayangi Alam)", "Sains & Teknologi"],
  kemahiranBerfikirArasTinggi: "Menganalisis & Mengaplikasi (Membanding beza tingkah laku haiwan gurun vs kutub)",
  strategiPak21: "Gallery Walk & Think-Pair-Share",
  aktiviti: {
    setInduksi: {
      masa: "5 Minit",
      huraian: "Guru menayangkan video klip 45 saat sesumpah yang menukar warna badan di dahan pokok. Guru melontarkan soalan pencetus minda: 'Mengapa sesumpah berbuat demikian? Apa yang berlaku jika haiwan tidak dapat melindungi diri?'. Murid memberikan respons spontan.",
      catatan: "Menjana sifat ingin tahu dan mengaitkan dengan pengalaman sedia ada."
    },
    fasaPerkembangan: [
      {
        langkah: "Langkah 1 (Penerokaan & Pembelajaran Konsep)",
        masa: "15 Minit",
        aktivitiGuruMurid: "Guru membimbing penerokaan 2 kategori perlindungan: (1) Ciri Khas Badan (duri, cangkerang, bisa, sisik tebal) dan (2) Tingkah Laku Khas (menggulung badan, menyamar, autotomi, menyembur dakwat hitam). Murid mencatat kata kunci dalam Peta Buih Berpasangan.",
        strategiPembezaan: "Kumpulan sokongan dibekalkan senarai kata kunci bergambar; kumpulan lanjutan digalakkan memberi contoh haiwan endemik Malaysia (cth: Tenggiling)."
      },
      {
        langkah: "Langkah 2 (Aktiviti Kolaboratif PAK-21 - Gallery Walk)",
        masa: "20 Minit",
        aktivitiGuruMurid: "Murid dibahagikan kepada 5 kumpulan kecil. Setiap kumpulan menerima satu habitat (Hutan Hujan Tropika, Gurun Panas, Laut Dalam, Kutub, Sungai). Kumpulan menghasilkan poster mini mengenai strategi kemandirian haiwan habitat tersebut. Selepas siap, murid menjalankan Gallery Walk: 1 ahli tinggal sebagai penerang, ahli lain melawat stesen lain dan memberi maklum balas menggunakan pelekat bintang (Two Stars and a Wish).",
        strategiPembezaan: "Peranan dalam kumpulan diagihkan mengikut kebolehan (pelukis peta minda, pencatat fakta, pembentang utama)."
      },
      {
        langkah: "Langkah 3 (Pengukuhan & Penilaian PBD)",
        masa: "15 Minit",
        aktivitiGuruMurid: "Murid menjawab lembaran kerja formatif PBD secara individu yang mengandungi soalan padanan dan soalan KBAT: 'Sekiranya semua tenggiling diburu sehingga pupus, apakah kesan kepada populasi serangga dan ekosistem?'. Guru membimbing murid yang memerlukan sokongan.",
        strategiPembezaan: "Soalan aras rendah (padanan gambar) untuk murid asas; soalan esei pendek KBAT untuk murid penguasaan tinggi."
      }
    ],
    penutup: {
      masa: "5 Minit",
      huraian: "Seorang wakil murid membuat rumusan pembelajaran hari ini. Guru menekankan nilai murni mensyukuri keunikan ciptaan Tuhan dan kepentingan memelihara haiwan daripada kepupusan. Guru mengedarkan tiket keluar (Exit Ticket) ringkas.",
      refleksiGuru: "PdP berjalan lancar dengan penyertaan aktif murid dalam Gallery Walk. Refleksi sebenar diisi selepas tamat sesi PdP."
    }
  },
  pentaksiranBilikDarjah: {
    kaedah: "Pemerhatian semasa aktiviti Gallery Walk & Pentaksiran bertulis melalui Lembaran Kerja",
    instrumen: "Senarai Semak Kemahiran Sains & Rubrik PBD Tahap Penguasaan TP 3 - TP 5",
    tahapPenguasaanSasaran: "TP 3 (Menjelaskan dengan contoh) hingga TP 5 (Menaakul kepentingan bagi mengekalkan keseimbangan)"
  },
  refleksiCatatan: "Kehadiran: 32 / 34 murid. 28 orang murid mencapai objektif pembelajaran. 4 orang murid diberi bimbingan rakan sebaya (peer coaching) pada waktu pengukuhan."
};

export const SAMPLE_QUIZ: QuizData = {
  tajukKuiz: "Kuiz Formatif Sains Tahun 5: Kemandirian Spesies Haiwan & Tumbuhan",
  arahan: "Jawab semua soalan berikut. Bagi soalan objektif, pilih satu jawapan yang paling tepat. Bagi soalan KBAT, berikan huraian ringkas berserta alasan munasabah.",
  soalan: [
    {
      nombor: 1,
      jenis: "objektif",
      teksSoalan: "Antara haiwan berikut, yang manakah memutuskan anggota badannya (autotomi) untuk melepaskan diri daripada musuh?",
      pilihan: [
        "A. Tenggiling",
        "B. Cicak",
        "C. Landak",
        "D. Sotong kurita"
      ],
      jawapanBetul: "B. Cicak",
      skemaJawapan: "Cicak melakukan autotomi dengan memutuskan ekornya yang masih bergerak-gerak bagi mengalihkan perhatian pemangsa semasa melarikan diri.",
      arasTaksonomi: "Mengingat",
      markah: 1
    },
    {
      nombor: 2,
      jenis: "objektif",
      teksSoalan: "Bagaimanakah ciri fizikal beruang kutub membantunya bermandiri dalam suhu bawah takat beku di Kutub Utara?",
      pilihan: [
        "A. Mempunyai bulu nipis dan telinga besar",
        "B. Mempunyai lapisan lemak tebal di bawah kulit dan bulu berongga",
        "C. Menukar warna kulit menjadi hijau gelap pada musim sejuk",
        "D. Berhibernasi di dalam air laut masin"
      ],
      jawapanBetul: "B. Mempunyai lapisan lemak tebal di bawah kulit dan bulu berongga",
      skemaJawapan: "Lapisan lemak tebal bertindak sebagai penebat haba manakala bulu berongga memerangkap udara hangat untuk mengekalkan suhu badan.",
      arasTaksonomi: "Memahami",
      markah: 1
    },
    {
      nombor: 3,
      jenis: "objektif",
      teksSoalan: "Sesumpah dan belalang daun mempunyai corak warna badan yang menyerupai persekitaran mereka. Apakah istilah sains bagi tingkah laku khas ini?",
      pilihan: [
        "A. Mimikri",
        "B. Penyamaran (Camouflage)",
        "C. Simbiosis",
        "D. Fotosintesis"
      ],
      jawapanBetul: "B. Penyamaran (Camouflage)",
      skemaJawapan: "Penyamaran ialah kebolehan menyamakan warna atau tekstur badan dengan persekitaran agar sukar dikesan oleh pemangsa mahupun mangsa.",
      arasTaksonomi: "Memahami",
      markah: 1
    },
    {
      nombor: 4,
      jenis: "kbat",
      petikanAtauRangsangan: "Aktiviti penerokaan hutan secara haram telah menyebabkan kawasan habitat harimau Malaya semakin mengecil dan terpisah (fragmentasi habitat).",
      teksSoalan: "Ramalkan kesan jangka panjang terhadap kemandirian spesies Harimau Malaya sekiranya aktiviti ini tidak dibendung, dan cadangkan dua langkah konkrit bagi menyelamatkannya.",
      jawapanBetul: "Cadangan jawapan merangkumi risiko kepupusan akibat kekurangan makanan dan langkah pemeliharaan.",
      skemaJawapan: "1. Kesan: Populasi harimau akan pupus akibat kekurangan mangsa dan pembiakan tersekat (1 markah). 2. Langkah: Mewujudkan koridor hidupan liar / pewartaan taman negara serta penguatkuasaan rondaan renjer hutan yang ketat terhadap pemburu haram (2 markah).",
      arasTaksonomi: "Menganalisis",
      markah: 3
    },
    {
      nombor: 5,
      jenis: "kbat",
      teksSoalan: "Mengapakah tumbuhan yang hidup di kawasan gurun seperti kaktus mempunyai daun yang diubah suai menjadi duri tajam?",
      jawapanBetul: "Mengurangkan kehilangan air melalui transpirasi dan melindungi daripada haiwan herbivor.",
      skemaJawapan: "Duri mengurangkan luas permukaan daun untuk meminimumkan kadar transpirasi (kehilangan air) dalam cuaca panas terik, dan sekaligus menghalang haiwan daripada memakannya (2 markah).",
      arasTaksonomi: "Menilai",
      markah: 2
    }
  ]
};

export const SAMPLE_BBM: BBMData = {
  tajuk: "Kad Imbasan & Peta Minda: Ciri Khas Kemandirian Haiwan",
  peneranganRingkas: "Bahan bantu mengajar interaktif untuk aktiviti stesen PdP dan pengukuhan bilik darjah.",
  flashcards: [
    {
      istilahAtauSoalan: "Apakah maksud Kemandirian Spesies?",
      definisiAtauJawapan: "Keupayaan hidupan untuk mengekalkan spesiesnya daripada pupus dengan melahirkan anak atau bertelur dan melindungi diri.",
      contohAtauPetunjuk: "Contoh: Penyu bertelur banyak di pantai pada waktu malam."
    },
    {
      istilahAtauSoalan: "Apakah itu Penyamaran (Camouflage)?",
      definisiAtauJawapan: "Ciri atau tingkah laku haiwan yang menyesuaikan warna dan bentuk badan dengan persekitaran supaya tidak mudah dikesan musuh.",
      contohAtauPetunjuk: "Contoh: Mentadak daun menyerupai daun hijau."
    },
    {
      istilahAtauSoalan: "Bagaimanakah Tenggiling melindungi diri?",
      definisiAtauJawapan: "Tenggiling mempunyai sisik keras daripada keratin dan akan menggulungkan badannya menjadi bola apabila diancam.",
      contohAtauPetunjuk: "Contoh: Sisik tebal yang sukar ditembusi gigi pemangsa."
    },
    {
      istilahAtauSoalan: "Apakah Autotomi?",
      definisiAtauJawapan: "Tingkah laku haiwan memutuskan bahagian badannya secara sukarela untuk mengelirukan pemangsa.",
      contohAtauPetunjuk: "Contoh: Cicak dan kurita kurita."
    }
  ],
  latihanIsiTempatKosong: [
    {
      ayat: "Landak mempunyai _____ yang tajam untuk menakutkan dan mencederakan pemangsa.",
      kataKunci: "duri",
      pilihanKata: ["duri", "sisik", "cangkerang", "bisa"]
    },
    {
      ayat: "Kala jengking menyuntikkan cecair _____ melalui sengat di hujung ekornya.",
      kataKunci: "berbisa",
      pilihanKata: ["berbisa", "manis", "berbau busuk", "berminyak"]
    },
    {
      ayat: "Skunk atau cipan mengeluarkan bau yang amat _____ bagi menghalau musuh yang mendekatinya.",
      kataKunci: "busuk",
      pilihanKata: ["busuk", "wangi", "pedas", "sejuk"]
    }
  ],
  petaMindaITHINK: {
    jenisPeta: "Peta Pokok",
    fokusUtama: "Strategi Kemandirian Haiwan Melindungi Diri",
    cabang: [
      {
        label: "Ciri Khas Fizikal",
        butiran: ["Cangkerang keras (Kura-kura)", "Duri tajam (Landak)", "Tanduk runcing (Rusa, Kerbau)", "Sisik tebal (Tenggiling)"]
      },
      {
        label: "Tingkah Laku Khas",
        butiran: ["Menggulungkan diri (Ulat gonggok)", "Menyamar warna persekitaran (Sesumpah)", "Memutuskan anggota badan (Cicak)", "Menyembur dakwat hitam (Sotong)"]
      },
      {
        label: "Hidup Berkumpulan",
        butiran: ["Kawanan gajah melindungi anak", "Ikan bilis berenang dalam kumpulan besar", "Burung layang-layang terbang berkelompok"]
      }
    ]
  }
};

export const INITIAL_STUDENTS = [
  { id: '1', nama: 'Muhammad Amirul Haqimi bin Azhar', tahapPenguasaan: 5, kemahiran: 'Penerangan & Penaakulan', catatanGuru: 'Sangat aktif menerangkan konsep kemandirian spesies.', tarikh: '31/10/2026' },
  { id: '2', nama: 'Nur Aisyah Humaira binti Razali', tahapPenguasaan: 4, kemahiran: 'Aktiviti Gallery Walk', catatanGuru: 'Berjaya melengkapkan poster kumpulan dengan tersusun.', tarikh: '31/10/2026' },
  { id: '3', nama: 'Tan Zhi Wei', tahapPenguasaan: 5, kemahiran: 'Kemahiran Berfikir KBAT', catatanGuru: 'Idea bernas tentang kesan kepupusan dalam ekosistem.', tarikh: '31/10/2026' },
  { id: '4', nama: 'Kavitha a/p Subramaniam', tahapPenguasaan: 6, kemahiran: 'Penerokaan Inovatif', catatanGuru: 'Mencapai TP6, boleh membimbing rakan sebaya dengan teliti.', tarikh: '31/10/2026' },
  { id: '5', nama: 'Ahmad Danial bin Firdaus', tahapPenguasaan: 3, kemahiran: 'Memahami Konsep Asas', catatanGuru: 'Mencapai TP3. Perlu latihan pengukuhan istilah autotomi.', tarikh: '31/10/2026' },
  { id: '6', nama: 'Siti Sarah binti Kamaruddin', tahapPenguasaan: 4, kemahiran: 'Latihan Lembaran Kerja', catatanGuru: 'Tugasan siap tepat pada masanya dengan markah baik.', tarikh: '31/10/2026' },
];

export const PBD_DESCRIPTORS: Record<number, { tajuk: string; deskripsi: string; tahap: string; warna: string }> = {
  1: {
    tahap: "TP 1",
    tajuk: "Tahu",
    deskripsi: "Murid tahu perkara asas atau boleh melakukan kemahiran asas atau memberi respons terhadap perkara yang sangat asas.",
    warna: "bg-red-50 text-red-700 border-red-200"
  },
  2: {
    tahap: "TP 2",
    tajuk: "Tahu dan Faham",
    deskripsi: "Murid menunjukkan kefahaman pada perkara asas dengan menterjemahkan dan menjelaskan apa yang dipelajari.",
    warna: "bg-orange-50 text-orange-700 border-orange-200"
  },
  3: {
    tahap: "TP 3",
    tajuk: "Tahu, Faham dan Boleh Buat",
    deskripsi: "Murid menggunakan pengetahuan untuk melaksanakan kemahiran pada suatu situasi standard (Tahap Minimum Penguasaan).",
    warna: "bg-amber-50 text-amber-700 border-amber-200"
  },
  4: {
    tahap: "TP 4",
    tajuk: "Tahu, Faham dan Boleh Buat dengan Beradab",
    deskripsi: "Murid melaksanakan sesuatu kemahiran dengan beradab iaitu mengikut prosedur atau secara analitikal dan sistematik.",
    warna: "bg-blue-50 text-blue-700 border-blue-200"
  },
  5: {
    tahap: "TP 5",
    tajuk: "Tahu, Faham dan Boleh Buat dengan Beradab Terpuji",
    deskripsi: "Murid melaksanakan kemahiran pada situasi baharu dengan mengikut prosedur atau secara sistematik serta tekal dan positif.",
    warna: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  6: {
    tahap: "TP 6",
    tajuk: "Tahu, Faham dan Boleh Buat dengan Beradab Mithali",
    deskripsi: "Murid berupaya menggunakan pengetahuan dan kemahiran sedia ada untuk digunakan pada situasi baharu secara kreatif, inovatif, serta menjadi contoh/teladan kepada rakan sebaya.",
    warna: "bg-purple-50 text-purple-700 border-purple-200"
  }
};
