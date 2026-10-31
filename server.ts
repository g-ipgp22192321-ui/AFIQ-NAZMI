import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Initialise GoogleGenAI with aistudio-build user agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for Gemini prompt execution
async function runGemini(prompt: string, systemInstruction?: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    console.log('GEMINI_API_KEY is not configured. Falling back to structured response generator.');
    return '';
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: systemInstruction
      ? {
          systemInstruction,
        }
      : undefined,
  });

  return response.text || '';
}

// 1. Endpoint: Generate RPH (Rancangan Pengajaran Harian)
app.post('/api/generate-rph', async (req, res) => {
  try {
    const {
      subject,
      grade,
      topic,
      contentStandard,
      learningStandard,
      timeDuration,
      pak21,
      emk,
      kbat,
      pbdMethod,
      customNotes,
    } = req.body;

    const systemPrompt = `Anda ialah Pakar Kurikulum dan Perancang PdP (Pengajaran & Pembelajaran) Kementerian Pendidikan Malaysia (KPM) berorientasikan DSKP KSSR Semakan / KSSM serta PAK-21 (Pedagogi Abad Ke-21). Sila bina Rancangan Pengajaran Harian (RPH) yang lengkap, berstruktur, profesional, dan sedia dicetak/digunakan oleh guru.

Balas dalam format JSON yang sah dengan struktur berikut:
{
  "tajuk": "string",
  "mataPelajaran": "string",
  "tingkatanTahun": "string",
  "temaBidang": "string",
  "tarikhMasa": "string",
  "standardKandungan": "string",
  "standardPembelajaran": "string",
  "objektifPembelajaran": ["string", "string"],
  "kriteriaKejayaan": ["string", "string", "string"],
  "konsepKosaKata": ["string", "string"],
  "bahanBantuMengajar": ["string", "string", "string"],
  "elemenMerentasKurikulum": ["string", "string"],
  "kemahiranBerfikirArasTinggi": "string",
  "strategiPak21": "string",
  "aktiviti": {
    "setInduksi": {
      "masa": "5 Minit",
      "huraian": "string",
      "catatan": "string"
    },
    "fasaPerkembangan": [
      {
        "langkah": "Langkah 1 (Fasa Penerokaan & Penyampaian)",
        "masa": "15 Minit",
        "aktivitiGuruMurid": "string",
        "strategiPembezaan": "string"
      },
      {
        "langkah": "Langkah 2 (Fasa Aplikasi & Aktiviti Kumpulan PAK-21)",
        "masa": "20 Minit",
        "aktivitiGuruMurid": "string",
        "strategiPembezaan": "string"
      },
      {
        "langkah": "Langkah 3 (Fasa Penilaian & Pengukuhan PBD)",
        "masa": "15 Minit",
        "aktivitiGuruMurid": "string",
        "strategiPembezaan": "string"
      }
    ],
    "penutup": {
      "masa": "5 Minit",
      "huraian": "string",
      "refleksiGuru": "string"
    }
  },
  "pentaksiranBilikDarjah": {
    "kaedah": "string",
    "instrumen": "string",
    "tahapPenguasaanSasaran": "TP 1 hingga TP 5 (majoriti mencapai sekurang-kurangnya TP 3)"
  },
  "refleksiCatatan": "string"
}`;

    const userPrompt = `Sila jana RPH bagi:
- Mata Pelajaran: ${subject || 'Bahasa Melayu'}
- Tahun / Tingkatan: ${grade || 'Tahun 4'}
- Tema / Tajuk: ${topic || 'Kesihatan dan Kebersihan'}
- Standard Kandungan (SK): ${contentStandard || 'Sila pilih/sesuaikan standard kandungan DSKP yang tepat'}
- Standard Pembelajaran (SP): ${learningStandard || 'Sila huraikan standard pembelajaran yang boleh diukur'}
- Tempoh PdP: ${timeDuration || '60 Minit'}
- Kaedah PAK-21 Diutamakan: ${pak21 || 'Think-Pair-Share & Gallery Walk'}
- Elemen Merentas Kurikulum (EMK): ${emk || 'Kelestarian Global & Nilai Murni'}
- KBAT: ${kbat || 'Menganalisis & Mengaplikasi'}
- Bentuk PBD: ${pbdMethod || 'Pemerhatian & Lembaran Kerja'}
- Arahan Tambahan Guru: ${customNotes || 'Pastikan aktiviti aktif dan berpusatkan murid'}`;

    const text = await runGemini(userPrompt, systemPrompt);
    if (!text) {
      // Intelligent fallback
      return res.json({
        success: true,
        data: {
          tajuk: `RPH ${subject || 'Sains'}: ${topic || 'Kemandirian Spesies Haiwan'}`,
          mataPelajaran: subject || 'Sains',
          tingkatanTahun: grade || 'Tahun 5',
          temaBidang: `${subject || 'Sains'} / ${topic || 'Kemandirian Spesies'}`,
          tarikhMasa: 'Isnin | 8:30 Pagi - 9:30 Pagi (60 Minit)',
          standardKandungan: contentStandard || '3.1 Kemandirian Spesies Haiwan',
          standardPembelajaran: learningStandard || '3.1.1 Menjelaskan dengan contoh ciri dan tingkah laku khas haiwan.\n3.1.2 Menaakul kepentingan kemandirian spesies.',
          objektifPembelajaran: [
            `Pada akhir PdP, sekurang-kurangnya 80% murid dapat menerangkan fakta penting berkaitan ${topic || 'topik'} dengan tepat.`,
            `Murid dapat melengkapkan aktiviti ${pak21 || 'PAK-21'} dalam perbincangan kumpulan berpandukan rubrik.`
          ],
          kriteriaKejayaan: [
            `Saya boleh menyatakan sekurang-kurangnya 3 fakta utama berkaitan ${topic || 'topik'}.`,
            `Saya boleh bekerjasama dalam kumpulan menyempurnakan aktiviti yang diberi.`,
            `Saya boleh menjawab soalan lembaran kerja dengan betul.`
          ],
          konsepKosaKata: ['Konsep Asas', 'Fakta Kunci', 'Kosa Kata Saintifik'],
          bahanBantuMengajar: ['Slaid Pembelajaran', 'Kad Aktiviti', 'Lembaran Kerja PBD'],
          elemenMerentasKurikulum: [emk || 'Nilai Murni'],
          kemahiranBerfikirArasTinggi: kbat || 'Mengaplikasi & Menganalisis',
          strategiPak21: pak21 || 'Think-Pair-Share & Gallery Walk',
          aktiviti: {
            setInduksi: {
              masa: '5 Minit',
              huraian: `Guru memulakan sesi PdP dengan tayangan gambar rangsangan berkaitan ${topic || 'pelajaran'} dan bersoal jawab dengan murid.`,
              catatan: 'Menarik minat murid dan mengaktifkan pengetahuan sedia ada.'
            },
            fasaPerkembangan: [
              {
                langkah: 'Langkah 1 (Fasa Penerokaan)',
                masa: '15 Minit',
                aktivitiGuruMurid: 'Guru menerangkan konsep utama menggunakan bahan visual interaktif. Murid mencatat maklumat penting dalam peta minda.',
                strategiPembezaan: 'Bimbingan khusus untuk murid aras asas; soalan mencabar untuk murid aras tinggi.'
              },
              {
                langkah: 'Langkah 2 (Aktiviti Kolaboratif PAK-21)',
                masa: '20 Minit',
                aktivitiGuruMurid: `Murid menjalankan aktiviti kumpulan berasaskan kaedah ${pak21 || 'Think-Pair-Share'}. Setiap kumpulan berkongsi dapatan mereka.`,
                strategiPembezaan: 'Agihan peranan dalam kumpulan mengikut kebolehan murid.'
              },
              {
                langkah: 'Langkah 3 (Pengukuhan & Penilaian PBD)',
                masa: '15 Minit',
                aktivitiGuruMurid: 'Murid menjawab latihan formatif PBD secara individu untuk mengukur tahap penguasaan.',
                strategiPembezaan: 'Lembaran kerja bertingkat (aras asas dan aras pengayaan).'
              }
            ],
            penutup: {
              masa: '5 Minit',
              huraian: 'Murid merumuskan intipati pembelajaran hari ini dengan bimbingan guru.',
              refleksiGuru: 'PdP berjalan dengan lancar dan mencapai objektif yang disasarkan.'
            }
          },
          pentaksiranBilikDarjah: {
            kaedah: pbdMethod || 'Pemerhatian & Lembaran Kerja',
            instrumen: 'Senarai Semak & Lembaran Kerja',
            tahapPenguasaanSasaran: 'TP 3 hingga TP 5'
          },
          refleksiCatatan: 'Kehadiran memuaskan. Majoriti murid mencapai kriteria kejayaan yang ditetapkan.'
        }
      });
    }

    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating RPH:', error);
    res.status(500).json({ success: false, error: error.message || 'Gagal menjana RPH' });
  }
});

// 2. Endpoint: Generate Quiz / Exam Questions (UASA / SPM / Pentaksiran)
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { subject, grade, topic, questionType, count, difficulty, kbatRatio } = req.body;

    const systemPrompt = `Anda ialah Penggubal Soalan Peperiksaan KPM berpengalaman (Lembaga Peperiksaan Malaysia & Majlis Peperiksaan).
Bina set soalan berkualiti mengikut format DSKP dan piawaian UASA / SPM terkini.
Balas dalam format JSON yang sah dengan struktur:
{
  "tajukKuiz": "string",
  "arahan": "string",
  "soalan": [
    {
      "nombor": 1,
      "jenis": "objektif" | "struktur" | "kbat",
      "teksSoalan": "string",
      "petikanAtauRangsangan": "string (opsional jika tiada stimulus)",
      "pilihan": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "jawapanBetul": "string",
      "skemaJawapan": "string (huraian/kata kunci markah)",
      "arasTaksonomi": "Mengingat" | "Memahami" | "Mengaplikasi" | "Menganalisis" | "Menilai" | "Mencipta",
      "markah": 1
    }
  ]
}`;

    const userPrompt = `Jana set soalan:
- Mata Pelajaran: ${subject || 'Sains'}
- Tahap: ${grade || 'Tahun 5'}
- Topik / Bab: ${topic || 'Kemandirian Spesies Haiwan'}
- Format Soalan: ${questionType || 'Campuran (Objektif & KBAT)'}
- Bilangan Soalan: ${count || 5}
- Aras Kesukaran: ${difficulty || 'Sederhana'}
- Komposisi KBAT: ${kbatRatio || '40% KBAT'}`;

    const text = await runGemini(userPrompt, systemPrompt);
    if (!text) {
      return res.json({
        success: true,
        data: {
          tajukKuiz: `Kuiz Pengukuhan ${subject || 'Sains'} (${grade || 'Tahun 5'})`,
          arahan: 'Jawab semua soalan berikut dengan teliti berpandukan standard DSKP KPM.',
          soalan: [
            {
              nombor: 1,
              jenis: 'objektif',
              teksSoalan: `Apakah konsep utama yang dipelajari dalam topik ${topic || 'Kemandirian Spesies'}?`,
              pilihan: [
                'A. Memahami ciri-ciri dan fungsi utama hidupan',
                'B. Mengabaikan kitaran ekosistem alam sekitar',
                'C. Mengurangkan kadar kepelbagaian biologi',
                'D. Menghalang proses adaptasi semula jadi'
              ],
              jawapanBetul: 'A. Memahami ciri-ciri dan fungsi utama hidupan',
              skemaJawapan: 'Konsep teras melibatkan pemahaman ciri perlindungan dan interaksi persekitaran (1 markah).',
              arasTaksonomi: 'Mengingat',
              markah: 1
            },
            {
              nombor: 2,
              jenis: 'objektif',
              teksSoalan: 'Bagaimanakah aplikasi pengetahuan ini membantu dalam kehidupan seharian?',
              pilihan: [
                'A. Memupuk amalan kelestarian dan menghargai alam',
                'B. Meningkatkan pembaziran sumber semulajadi',
                'C. Mengelakkan perbincangan kolaboratif',
                'D. Menghapuskan habitat hidupan liar'
              ],
              jawapanBetul: 'A. Memupuk amalan kelestarian dan menghargai alam',
              skemaJawapan: 'Memupuk nilai murni dan kelestarian alam sekitar mengikut elemen EMK KPM (1 markah).',
              arasTaksonomi: 'Mengaplikasi',
              markah: 1
            },
            {
              nombor: 3,
              jenis: 'kbat',
              petikanAtauRangsangan: 'Keseimbangan ekosistem berkait rapat dengan saling kebergantungan antara hidupan dan persekitaran.',
              teksSoalan: `Wajarkan kepentingan menguasai kemahiran dalam topik ${topic || 'ini'} dan cadangkan satu tindakan proaktif murid.`,
              jawapanBetul: 'Menaakul kepentingan kestabilan alam dan mencadangkan kempen kesedaran di sekolah.',
              skemaJawapan: 'Kesan positif (1m), huraian contoh konkrit (1m), cadangan tindakan murid (1m).',
              arasTaksonomi: 'Menilai',
              markah: 3
            }
          ]
        }
      });
    }

    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating Quiz:', error);
    res.status(500).json({ success: false, error: error.message || 'Gagal menjana kuiz' });
  }
});

// 3. Endpoint: Generate Flashcards & Worksheets (BBM)
app.post('/api/generate-bbm', async (req, res) => {
  try {
    const { topic, subject, grade, type } = req.body;

    const systemPrompt = `Anda ialah Pereka Bahan Bantu Mengajar (BBM) KPM. Jana bahan interaktif untuk PdP.
Balas dalam format JSON:
{
  "tajuk": "string",
  "peneranganRingkas": "string",
  "flashcards": [
    {
      "istilahAtauSoalan": "string",
      "definisiAtauJawapan": "string",
      "contohAtauPetunjuk": "string"
    }
  ],
  "latihanIsiTempatKosong": [
    {
      "ayat": "string (gunakan _____ untuk ruang kosong)",
      "kataKunci": "string",
      "pilihanKata": ["string", "string", "string", "string"]
    }
  ],
  "petaMindaITHINK": {
    "jenisPeta": "Peta Pokok" | "Peta Buih Berganda" | "Peta Alir" | "Peta Dakap",
    "fokusUtama": "string",
    "cabang": [
      {
        "label": "string",
        "butiran": ["string", "string"]
      }
    ]
  }
}`;

    const userPrompt = `Jana BBM untuk:
- Subjek: ${subject || 'Sejarah'}
- Tahap: ${grade || 'Tingkatan 2'}
- Topik: ${topic || 'Kesultanan Melayu Melaka'}
- Jenis Fokus: ${type || 'Kad Imbasan & Peta Minda'}`;

    const text = await runGemini(userPrompt, systemPrompt);
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating BBM:', error);
    res.status(500).json({ success: false, error: error.message || 'Gagal menjana BBM' });
  }
});

// 4. Endpoint: Custom AI Prompt / Import Studio Project Processor
app.post('/api/process-studio-request', async (req, res) => {
  try {
    const { userPromptText, appletContext } = req.body;

    const systemPrompt = `Anda ialah Pembina Aplikasi Pendidikan Pintar Google AI Studio untuk guru-guru dan pendidik di Malaysia.
Pengguna ingin melaksanakan modul atau keperluan aplikasi yang mereka maksudkan dari sesi AI Studio (termasuk rujukan pautan AI Studio pengguna).
Tafsir keperluan pengguna dan berikan hasil penyelesaian lengkap berstruktur dalam format JSON:
{
  "tajukAplikasi": "string",
  "ringkasanKonsep": "string",
  "fiturUtama": ["string", "string", "string"],
  "kandunganInteraktif": {
    "arahan": "string",
    "modul": [
      {
        "namaModul": "string",
        "penerangan": "string",
        "elemenInteraktif": "string",
        "dataSampel": ["string", "string"]
      }
    ]
  },
  "panduanPenggunaan": "string",
  "cadanganLangkahSeterusnya": ["string", "string"]
}`;

    const text = await runGemini(
      `Pengguna meminta pembangunan aplikasi dengan arahan/konteks: "${userPromptText}"\nKonteks tambahan: "${appletContext || ''}"`,
      systemPrompt
    );

    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error processing studio request:', error);
    res.status(500).json({ success: false, error: error.message || 'Gagal memproses permintaan' });
  }
});

// Static asset serving: ensure /images is always served directly
const publicImagesPath = path.join(__dirname, 'public', 'images');
const publicPath = path.join(__dirname, 'public');
const distPath = path.join(__dirname, 'dist');
const distImagesPath = path.join(distPath, 'images');
const distAssetsPath = path.join(distPath, 'assets');

app.use('/images', express.static(publicImagesPath, { maxAge: '1d' }));
app.use('/images', express.static(distImagesPath, { maxAge: '1d' }));
app.use(express.static(publicPath));

// Vite middleware setup
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use('/assets', express.static(distAssetsPath, { maxAge: '1y', immutable: true }));
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    // Prevent poisoning image and asset requests with index.html
    if (/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|mp3|wav|ogg|json|woff2?|ttf|map)$/i.test(req.path) || req.path.startsWith('/assets/') || req.path.startsWith('/images/')) {
      return res.status(404).type('text/plain').send('Aset tidak dijumpai: ' + req.path);
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`EduStudio Server active on http://0.0.0.0:${port}`);
});
