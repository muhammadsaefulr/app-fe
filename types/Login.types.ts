export interface User {
    id: number
    nip: string
    nama: string
    tempat_lahir: string
    tgl_lahir: string
    alamat: string
    gender: string
    agama: string
    created_at: string
    updated_at: string
  }
  
  export interface AuthResponse {
    data: User
    token: string
    message: string
  }