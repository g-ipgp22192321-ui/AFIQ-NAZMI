export type StationId =
  | 'cover'
  | 'map'
  | 'station1' // Nama & Profil Detektif
  | 'station2' // Penerangan & Taklimat Misi
  | 'station3' // Stesen Pemula: Misteri Perpustakaan
  | 'station4' // Stesen Bijak: Misteri Makmal Sains
  | 'station5' // Stesen Master: Portal Menara Jam
  | 'voice'    // Ujian Rakaman Suara Kelancaran
  | 'station6'; // Sijil & Lencana Tamat

export interface DetectiveProfile {
  nama: string;
  kelas: string;
  sekolah: string;
  avatar: string;
  skor: number;
  lencana: string[];
  selesaiStesen: string[];
  rakamanSuaraUrl?: string | null;
  tarikhDaftar: string;
}

export interface ClueItem {
  id: string;
  tajuk: string;
  huraian: string;
  ikon: string;
  dijumpai: boolean;
}

export interface DetectiveQuestion {
  id: string;
  petikan?: string;
  teksSoalan: string;
  pilihan: string[];
  jawapanBetul: string;
  petunjuk: string;
  penerangan: string;
  markah: number;
}
