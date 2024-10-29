<template>
    <DialogContent class="max-w-[600px] sm:max-w-[80vw] max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Tambah Pegawai Baru</DialogTitle>
      <DialogDescription>
        Masukkan informasi pegawai di formulir di bawah ini.
      </DialogDescription>
    </DialogHeader>
    <div class="grid gap-6 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="nip" class="text-right">NIP</Label>
        <Input id="nip" v-model="form.nip" placeholder="Masukkan NIP" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="nama" class="text-right">Nama</Label>
        <Input id="nama" v-model="form.nama" placeholder="Masukkan nama" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="tempat_lahir" class="text-right">Tempat Lahir</Label>
        <Input id="tempat_lahir" v-model="form.tempat_lahir" placeholder="Masukkan tempat lahir" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="tgl_lahir" class="text-right">Tanggal Lahir</Label>
        <Input id="tgl_lahir" type="date" v-model="form.tgl_lahir" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="alamat" class="text-right">Alamat</Label>
        <Input id="alamat" v-model="form.alamat" placeholder="Masukkan alamat" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="gender" class="text-right">Jenis Kelamin</Label>
        <Select v-model="form.gender" id="gender" class="col-span-3">
          <SelectTrigger>
            <SelectValue placeholder="Pilih jenis kelamin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Laki-laki</SelectItem>
            <SelectItem value="P">Perempuan</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="agama" class="text-right">Agama</Label>
        <Input id="agama" v-model="form.agama" placeholder="Masukkan agama" class="col-span-3" />
      </div>
      
      <Separator />
      
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="no_hp" class="text-right">Nomor Telepon</Label>
        <Input id="no_hp" v-model="form.no_hp" placeholder="Masukkan nomor telepon" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="email" class="text-right">Email</Label>
        <Input id="email" type="email" v-model="form.email" placeholder="Masukkan email" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="npwp" class="text-right">NPWP</Label>
        <Input id="npwp" v-model="form.npwp" placeholder="Masukkan NPWP" class="col-span-3" />
      </div>
      
      <Separator />
      
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="gol" class="text-right">Pilih Golongan</Label>
        <Select v-model="form.gol" id="gol" class="col-span-3">
          <SelectTrigger>
            <SelectValue placeholder="Pilih Golongan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="I">I</SelectItem>
            <SelectItem value="II">II</SelectItem>
            <SelectItem value="III">III</SelectItem>
            <SelectItem value="IV">IV</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="eselon" class="text-right">Pilih Eselon</Label>
        <Select v-model="form.eselon" id="eselon" class="col-span-3">
          <SelectTrigger>
            <SelectValue placeholder="Pilih Eselon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Eselon I">Eselon I</SelectItem>
            <SelectItem value="Eselon II">Eselon II</SelectItem>
            <SelectItem value="Eselon III">Eselon III</SelectItem>
            <SelectItem value="Eselon IV">Eselon IV</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="jabatan" class="text-right">Jabatan</Label>
        <Input id="jabatan" v-model="form.jabatan" placeholder="Masukkan jabatan" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="unit_kerja" class="text-right">Unit Kerja</Label>
        <Input id="unit_kerja" v-model="form.unit_kerja" placeholder="Masukkan unit kerja" class="col-span-3" />
      </div>
      
      <div class="grid grid-cols-4 items-center gap-4">
  <div class="col-span-3" v-if="form.foto_pegawai">
    <img :src="`http://localhost:8000/storage/${form.foto_pegawai}`" class="rounded-full h-24 w-24 object-cover" alt="Foto Pegawai" />       
  </div>
</div>


      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="foto_pegawai" class="text-right">Foto Pegawai</Label>
        <Input type="file" id="foto_pegawai" @change="onFileChange" class="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <Button type="button" @click="onSubmit">Kirim</Button>
    </DialogFooter>
  </DialogContent>
  </template>
  
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
  import { Separator } from "@/components/ui/separator";
  import { Button } from "@/components/ui/button";
  
  const form = ref({
    nip: '',
    nama: '',
    tempat_lahir: '',
    tgl_lahir: '',
    alamat: '',
    gender: '',
    agama: '',
    no_hp: '',
    email: '',
    npwp: '',
    gol: '',
    eselon: '',
    jabatan: '',
    unit_kerja: '',
    tempat_tugas: '',
    foto_pegawai: null, 
  });

  const props = defineProps({
  nip: {
    type: String,
    required: true,
  },
  });

  const fetchPegawaiData = async (nip: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/pegawai/data/${nip}`);
    if (response.ok) {
      const data = await response.json();
      form.value = {
        ...form.value,
        ...data,
        ...data.unit_tugas, 
        ...data.kontak_pegawai,
        ...data.tempat_tugas_pegawai, 
      };
    } else {
      console.error('Error fetching pegawai data:', response.statusText);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

  onMounted(() => {
    fetchPegawaiData(props.nip);
  });
  
  const onFileChange = (event: any) => {
    const file = event.target.files[0];
    form.value.foto_pegawai = file; 
  };
  
  const submitPegawaiData = async () => {
    const formData = new FormData();
    formData.append('nip', form.value.nip);
    formData.append('nama', form.value.nama);
    formData.append('tempat_lahir', form.value.tempat_lahir);
    formData.append('tgl_lahir', form.value.tgl_lahir);
    formData.append('alamat', form.value.alamat);
    formData.append('gender', form.value.gender);
    formData.append('agama', form.value.agama);
  
    if (form.value.foto_pegawai) {
      formData.append('foto_pegawai', form.value.foto_pegawai);
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/pegawai/data', {
        method: 'PUT',
        body: formData,
      });
  
      // Cek apakah respons berhasil atau tidak
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data.message || 'Data berhasil dikirim');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message || 'Data gagal dikirim'); 
      }
    } catch (error: any) {
      console.error('Fetch error:', error.message);
    }
  };
  
  const submitKontakPegawai = async () => {
    const dataKontak = {
      nip: form.value.nip,
      no_hp: form.value.no_hp,
      npwp: form.value.npwp,
    };
  
    await fetch('http://localhost:8000/api/pegawai/kontak', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataKontak),
    });
  };
  
  const submitTempatTugasPegawai = async () => {
    const dataTempatTugas = {
      nip: form.value.nip,
      tempat_tugas: form.value.tempat_tugas,
    };
  
    await fetch('http://localhost:8000/api/pegawai/tempat-tugas', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataTempatTugas),
    });
  };
  
  const submitUnitTugasPegawai = async () => {
    const dataUnitTugas = {
      nip: form.value.nip,
      gol: form.value.gol,
      eselon: form.value.eselon,
      jabatan: form.value.jabatan,
      unit_kerja: form.value.unit_kerja,
    };
  
    await fetch('http://localhost:8000/api/pegawai/unit-tugas', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUnitTugas),
    });
  };
  
  const onSubmit = async () => {
    try {
      await submitPegawaiData();
      await submitKontakPegawai();
      await submitTempatTugasPegawai();
      await submitUnitTugasPegawai();
      console.log("Data berhasil dikirim ke semua endpoint.");
    } catch (error) {
      console.error("Error dalam pengiriman data:", error);
    }
  };
  </script>
  