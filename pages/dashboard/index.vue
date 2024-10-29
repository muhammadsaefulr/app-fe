<template>
  <main>
    <h1 class="text-3xl font-bold mb-6">Dashboard Overview</h1>

    <div v-if="loading" class="flex justify-center items-center h-96">
      <Spinner />
    </div>

    <div v-else>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium">Total Pegawai</CardTitle>
            <Icon
              icon="mdi:account-group"
              class="h-4 w-4 text-muted-foreground"
            />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ PegawaiData.length }}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium">Total Unit Kerja</CardTitle>
            <Icon icon="mdi:briefcase" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ uniqueUnitKerja.length - 1 }}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium">Jumlah Jabatan</CardTitle>
            <Icon
              icon="mdi:office-building"
              class="h-4 w-4 text-muted-foreground"
            />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <div class="flex justify-between items-center mb-4">
        <div class="relative w-64">
          <Icon
            icon="mdi:magnify"
            class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
          />
          <Input
            placeholder="Cari pegawai..."
            class="pl-8"
            v-model="searchTerm"
          />
        </div>

        <Select v-model="filterUnitKerja">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Filter Unit Kerja" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Unit Kerja</SelectItem>
            <SelectItem
              v-for="unit in uniqueUnitKerja"
              :key="unit"
              :value="unit"
            >
              {{ unit }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent>
          <Tabs default-value="all">
            <TabsContent value="all">
              <CardHeader>
                <CardTitle>Data Pegawai</CardTitle>
                <CardDescription
                  >Manage your Pegawai and view their
                  details.</CardDescription
                >
              </CardHeader>
              <CardContent>
                <div class="w-full mx-auto max-w-[88vw] overflow-x-auto">
                  <div class="min-w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead class="whitespace-nowrap">No</TableHead>
                          <TableHead class="whitespace-nowrap">NIP</TableHead>
                          <TableHead class="whitespace-nowrap">Nama</TableHead>
                          <TableHead class="whitespace-nowrap"
                            >Tempat Lahir</TableHead
                          >
                          <TableHead class="whitespace-nowrap"
                            >Alamat</TableHead
                          >
                          <TableHead class="whitespace-nowrap"
                            >Tgl Lahir</TableHead
                          >
                          <TableHead class="whitespace-nowrap">L/P</TableHead>
                          <TableHead class="whitespace-nowrap"
                            >Unit Kerja</TableHead
                          >
                          <TableHead class="whitespace-nowrap"
                            >Eselon</TableHead
                          >
                          <TableHead class="whitespace-nowrap"
                            >Jabatan</TableHead
                          >
                          <TableHead class="whitespace-nowrap">Agama</TableHead>
                          <TableHead class="whitespace-nowrap"
                            >No. HP</TableHead
                          >
                          <TableHead class="whitespace-nowrap">NPWP</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow
                          v-for="(row, index) in paginatedPegawai"
                          :key="row.nip"
                        >
                          <TableCell class="whitespace-nowrap">{{
                            (currentPage - 1) * itemsPerPage + index + 1
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.nip || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.nama || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.tempat_lahir || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.alamat || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.tgl_lahir || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.gender || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.unit_tugas.unit_kerja || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.unit_tugas.eselon || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.unit_tugas.jabatan || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.agama || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.kontak_pegawai.no_hp || "-"
                          }}</TableCell>
                          <TableCell class="whitespace-nowrap">{{
                            row.kontak_pegawai.npwp || "-"
                          }}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter class="flex items-center justify-between">
                <div class="text-xs text-muted-foreground">
                  Showing
                  <strong>{{ startIndex + 1 }}-{{ endIndex }}</strong> of
                  <strong>{{ filteredPegawai.length }}</strong> Data
                </div>

                <div class="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    :disabled="currentPage === 1"
                    @click="previousPage"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    :disabled="currentPage === totalPages"
                    @click="nextPage"
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: 'auth'
});
import { ref, computed, onMounted } from "vue";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Spinner from "@/components/pages/LoadingSpinner/spinner.vue";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/vue";
import type { Pegawai } from "@/types/DataPegawai.type";


const PegawaiData = ref([]);
const searchTerm = ref("");
const filterUnitKerja = ref("all");
const currentPage = ref(1);
const itemsPerPage = 10;
const loading = ref(true);

const fetchPegawai = async () => {
  loading.value = true;
  try {
    const response = await fetch("http://localhost:8000/api/pegawai/data");
    const data = await response.json();

    if (data.success === "success") {
      PegawaiData.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching Pegawai data:", error);
  } finally {
    loading.value = false;
  }
};

const filteredPegawai = computed(() => {
  return PegawaiData.value.filter(
    (pegawai: any) =>
      pegawai.nama.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
      (filterUnitKerja.value === "all" ||
        pegawai.unit_tugas.unit_kerja === filterUnitKerja.value)
  );
});

const uniqueUnitKerja = computed(() => {
  const uniqueUnits = new Set(
    PegawaiData.value
      .map((pegawai: any) => pegawai.unit_tugas?.unit_kerja)
      .filter((unit) => unit) 
  );
  return Array.from(uniqueUnits);
});

const totalPages = computed(() => {
  return Math.ceil(filteredPegawai.value.length / itemsPerPage);
});

const paginatedPegawai = computed<Pegawai[]>(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPegawai.value.slice(start, start + itemsPerPage);
});

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => {
  const lastItemIndex = currentPage.value * itemsPerPage;
  return lastItemIndex > filteredPegawai.value.length
    ? filteredPegawai.value.length
    : lastItemIndex;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(() => {
  fetchPegawai();
});
</script>
