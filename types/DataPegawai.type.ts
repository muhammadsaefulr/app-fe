export interface UnitTugas {
  nip: string;
  gol: string;
  eselon: string;
  jabatan: string;
  unit_kerja: string;
}

export interface KontakPegawai {
  nip: string;
  no_hp: string;
  email: string;
  npwp: string;
}

export interface TempatTugas {
  nip: string;
  tempat_tugas: string;
}

export interface Pegawai {
  id: number;
  nip: string;
  nama: string;
  tempat_lahir: string;
  tgl_lahir: string;
  alamat: string;
  gender: string;
  agama: string;
  created_at: string;
  updated_at: string;
  unit_tugas: UnitTugas;
  kontak_pegawai: KontakPegawai;
  tempat_tugas_pegawai: TempatTugas;
}

export interface ApiResponse {
  success: string;
  message: string;
  data: Pegawai[];
}
