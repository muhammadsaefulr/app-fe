<script setup lang="ts">
import {
  CircleUser,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-vue-next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/vue";
const colorMode = useColorMode();
import { ref } from "vue";

const data = ref([
  {
    no: 1,
    nip: "198501012010011001",
    nama: "John Doe",
    tempatLahir: "Jakarta",
    alamat: "Jl. Sudirman No. 123",
    tglLahir: "1985-01-01",
    jenisKelamin: "L",
    golongan: "III/a",
    eselon: "IV/a",
    jabatan: "Staff",
    tempatTugas: "Kantor Pusat",
    agama: "Islam",
    unitKerja: "Divisi IT",
    noHp: "081234567890",
    npwp: "12.345.678.9-012.000",
  },
  {
    no: 2,
    nip: "199001022011022002",
    nama: "Jane Smith",
    tempatLahir: "Surabaya",
    alamat: "Jl. Thamrin No. 456",
    tglLahir: "1990-01-02",
    jenisKelamin: "P",
    golongan: "III/b",
    eselon: "IV/b",
    jabatan: "Supervisor",
    tempatTugas: "Kantor Cabang",
    agama: "Kristen",
    unitKerja: "Divisi HR",
    noHp: "087654321098",
    npwp: "23.456.789.0-123.000",
  },
]);
</script>

<template>
  <div>
    <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs default-value="all">
        <div class="flex items-center">
          <TabsList>
            <TabsTrigger value="all"> All </TabsTrigger>
            <TabsTrigger value="active"> Active </TabsTrigger>
            <TabsTrigger value="draft"> Draft </TabsTrigger>
            <TabsTrigger value="archived" class="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div class="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" size="sm" class="h-7 gap-1">
                  <ListFilter class="h-3.5 w-3.5" />
                  <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem checked> Active </DropdownMenuItem>
                <DropdownMenuItem>Draft</DropdownMenuItem>
                <DropdownMenuItem> Archived </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" class="h-7 gap-1">
              <File class="h-3.5 w-3.5" />
              <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" class="h-7 gap-1">
              <PlusCircle class="h-3.5 w-3.5" />
              <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Data Pegawai</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
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
                        <TableHead class="whitespace-nowrap">Alamat</TableHead>
                        <TableHead class="whitespace-nowrap"
                          >Tgl Lahir</TableHead
                        >
                        <TableHead class="whitespace-nowrap">L/P</TableHead>
                        <TableHead class="whitespace-nowrap">Gol</TableHead>
                        <TableHead class="whitespace-nowrap">Eselon</TableHead>
                        <TableHead class="whitespace-nowrap">Jabatan</TableHead>
                        <TableHead class="whitespace-nowrap"
                          >Tempat Tugas</TableHead
                        >
                        <TableHead class="whitespace-nowrap">Agama</TableHead>
                        <TableHead class="whitespace-nowrap"
                          >Unit Kerja</TableHead
                        >
                        <TableHead class="whitespace-nowrap">No. HP</TableHead>
                        <TableHead class="whitespace-nowrap">NPWP</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow v-for="row in data" :key="row.nip">
                        <TableCell class="whitespace-nowrap">{{
                          row.no
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.nip
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.nama
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.tempatLahir
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.alamat
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.tglLahir
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.jenisKelamin
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.golongan
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.eselon
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.jabatan
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.tempatTugas
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.agama
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.unitKerja
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.noHp
                        }}</TableCell>
                        <TableCell class="whitespace-nowrap">{{
                          row.npwp
                        }}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div class="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong>
                products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>
