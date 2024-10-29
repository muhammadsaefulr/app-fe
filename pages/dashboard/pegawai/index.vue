<script setup lang="ts">
definePageMeta({ layout: "dashboard" });

// Imports
import { ref, computed, onMounted } from "vue";
import TambahPegawai from './form/tambah-pegawai.vue';
import { File, PlusCircle } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Spinner from "@/components/pages/LoadingSpinner/spinner.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Pegawai } from "~/types/DataPegawai.type";
import EditPegawai from "./form/edit-pegawai.vue";

// State Management
const colorMode = useColorMode();
const PegawaisData = ref<Pegawai[]>([]);
const searchTerm = ref("");
const filterUnitKerja = ref("all");
const currentPage = ref(1);
const itemsPerPage = 10;
const loading = ref(true);
const open = ref(false);

// Fetch Pegawais
const fetchPegawais = async () => {
  loading.value = true;
  try {
    const response = await fetch("http://localhost:8000/api/pegawai/data");
    const data = await response.json();

    if (data.success === "success") {
      PegawaisData.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching Pegawais data:", error);
  } finally {
    loading.value = false;
  }
};

const deletePegawai = async (nip: string) => {
  const confirmDelete = confirm("Are you sure you want to delete this Pegawai?");
  if (!confirmDelete) return;

  loading.value = true;
  try {
    const response = await fetch(`http://localhost:8000/api/pegawai/data/${nip}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (data.success == true) {
      PegawaisData.value = PegawaisData.value.filter(Pegawai => Pegawai.nip !== nip);
      alert("Pegawai deleted successfully.");
    } else {
      alert("Failed to delete Pegawai.");
    }
  } catch (error) {
    console.error("Error deleting Pegawai:", error);
  } finally {
    loading.value = false;
  }
};

// Computed Properties
const filteredPegawais = computed(() => {
  return PegawaisData.value.filter(Pegawai =>
    Pegawai.nama.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
    (filterUnitKerja.value === "all" || Pegawai.unit_tugas.unit_kerja === filterUnitKerja.value)
  );
});

const uniqueUnitKerja = computed(() => {
  return Array.from(new Set(PegawaisData.value.map(Pegawai => Pegawai.unit_tugas.unit_kerja)));
});

const totalPages = computed(() => {
  return Math.ceil(filteredPegawais.value.length / itemsPerPage);
});

const paginatedPegawais = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPegawais.value.slice(start, start + itemsPerPage);
});

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => {
  const lastItemIndex = currentPage.value * itemsPerPage;
  return lastItemIndex > filteredPegawais.value.length ? filteredPegawais.value.length : lastItemIndex;
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
  fetchPegawais();
});
</script>


<template>
  <main>
    <div v-if="loading" class="flex justify-center items-center h-96">
      <Spinner />
    </div>

    <Tabs v-else default-value="all">
      <div class="flex items-center">
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
        <div class="ml-auto flex items-center gap-2">
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
          <Button variant="outline">
            <File class="h-3.5 w-3.5" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export xlsx
            </span>
          </Button>
          <Dialog v-model:open="open">
            <DialogTrigger as-child>
              <Button variant="outline">Tambah Pegawai</Button>
            </DialogTrigger>

            <TambahPegawai v-if="open"/>
          </Dialog>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Data Pegawai</CardTitle>
            <CardDescription
              >Manage your Pegawais and view their details.</CardDescription
            >

          </CardHeader>
          <CardContent>
            <Tabs default-value="all">
              <TabsContent value="all">
                <CardContent>
                  <div class="w-full mx-auto max-w-[88vw] overflow-x-auto">
                    <div class="min-w-full">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead class="whitespace-nowrap">No</TableHead>
                            <TableHead class="whitespace-nowrap">NIP</TableHead>
                            <TableHead class="whitespace-nowrap"
                              >Nama</TableHead
                            >
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
                            <TableHead class="whitespace-nowrap">Gol</TableHead>
                            <TableHead class="whitespace-nowrap"
                              >Eselon</TableHead
                            >
                            <TableHead class="whitespace-nowrap"
                              >Jabatan</TableHead
                            >
                            <TableHead class="whitespace-nowrap"
                              >Tempat Tugas</TableHead
                            >
                            <TableHead class="whitespace-nowrap"
                              >Agama</TableHead
                            >
                            <TableHead class="whitespace-nowrap"
                              >Unit Kerja</TableHead
                            >
                            <TableHead class="whitespace-nowrap"
                              >No. HP</TableHead
                            >
                            <TableHead class="whitespace-nowrap"
                              >NPWP</TableHead
                            >
                            <TableHead class="whitespace-nowrap"
                              >Action</TableHead
                            >
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow
                            v-for="(row, index) in paginatedPegawais"
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
                              row.unit_tugas.gol || "-"
                            }}</TableCell>
                            <TableCell class="whitespace-nowrap">{{
                              row.unit_tugas.eselon || "-"
                            }}</TableCell>
                            <TableCell class="whitespace-nowrap">{{
                              row.unit_tugas.jabatan || "-"
                            }}</TableCell>
                             <TableCell class="whitespace-nowrap">{{
                              row.tempat_tugas_pegawai.tempat_tugas || "-"
                            }}</TableCell>
                            <TableCell class="whitespace-nowrap">{{
                              row.agama || "-"
                            }}</TableCell>
                            <TableCell class="whitespace-nowrap">{{
                              row.unit_tugas.unit_kerja || "-"
                            }}</TableCell>
                            <TableCell class="whitespace-nowrap">{{
                              row.kontak_pegawai.no_hp || "-"
                            }}</TableCell>
                            <TableCell class="whitespace-nowrap">{{
                              row.kontak_pegawai.npwp || "-"
                            }}</TableCell>
                            <TableCell class="whitespace-nowrap">
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  ><Button variant="secondary"
                                    >...</Button
                                  ></DropdownMenuTrigger
                                >
                                <DropdownMenuContent>
<Dialog v-model:open="open">
            <DialogTrigger as-child>
              <Button variant="outline">Edit</Button>
            </DialogTrigger>

            <EditPegawai :nip="row.nip" v-if="open"/>
          </Dialog>                                  <DropdownMenuItem
                                    @click="deletePegawai(row.nip)"
                                    variant="outline"
                                    color="red"
                                    >Delete</DropdownMenuItem
                                  >
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                            <!-- Delete Button -->
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
                    <strong>{{ filteredPegawais.length }}</strong> Data
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
      </TabsContent>
    </Tabs>
  </main>
</template>
