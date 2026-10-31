export type TabType = 'rph' | 'quiz' | 'pbd' | 'bbm' | 'studio';

export interface RPHData {
  tajuk: string;
  mataPelajaran: string;
  tingkatanTahun: string;
  temaBidang: string;
  tarikhMasa: string;
  standardKandungan: string;
  standardPembelajaran: string;
  objektifPembelajaran: string[];
  kriteriaKejayaan: string[];
  konsepKosaKata?: string[];
  bahanBantuMengajar: string[];
  elemenMerentasKurikulum: string[];
  kemahiranBerfikirArasTinggi: string;
  strategiPak21: string;
  aktiviti: {
    setInduksi: {
      masa: string;
      huraian: string;
      catatan?: string;
    };
    fasaPerkembangan: Array<{
      langkah: string;
      masa: string;
      aktivitiGuruMurid: string;
      strategiPembezaan: string;
    }>;
    penutup: {
      masa: string;
      huraian: string;
      refleksiGuru: string;
    };
  };
  pentaksiranBilikDarjah: {
    kaedah: string;
    instrumen: string;
    tahapPenguasaanSasaran: string;
  };
  refleksiCatatan?: string;
}

export interface QuizQuestion {
  nombor: number;
  jenis: 'objektif' | 'struktur' | 'kbat';
  teksSoalan: string;
  petikanAtauRangsangan?: string;
  pilihan?: string[];
  jawapanBetul: string;
  skemaJawapan: string;
  arasTaksonomi: string;
  markah: number;
}

export interface QuizData {
  tajukKuiz: string;
  arahan: string;
  soalan: QuizQuestion[];
}

export interface PbdStudent {
  id: string;
  nama: string;
  tahapPenguasaan: number; // 1 to 6
  kemahiran: string;
  catatanGuru: string;
  tarikh: string;
}

export interface Flashcard {
  istilahAtauSoalan: string;
  definisiAtauJawapan: string;
  contohAtauPetunjuk: string;
}

export interface IThinkBranch {
  label: string;
  butiran: string[];
}

export interface BBMData {
  tajuk: string;
  peneranganRingkas: string;
  flashcards: Flashcard[];
  latihanIsiTempatKosong: Array<{
    ayat: string;
    kataKunci: string;
    pilihanKata: string[];
  }>;
  petaMindaITHINK: {
    jenisPeta: string;
    fokusUtama: string;
    cabang: IThinkBranch[];
  };
}

export interface StudioAppResponse {
  tajukAplikasi: string;
  ringkasanKonsep: string;
  fiturUtama: string[];
  kandunganInteraktif: {
    arahan: string;
    modul: Array<{
      namaModul: string;
      penerangan: string;
      elemenInteraktif: string;
      dataSampel: string[];
    }>;
  };
  panduanPenggunaan: string;
  cadanganLangkahSeterusnya: string[];
}
