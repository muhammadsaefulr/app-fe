<script setup lang="ts">
import { CircleUser, Home } from "lucide-vue-next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { ref, watch, computed } from "vue";

const colorMode = useColorMode();
const { user, isLoggedIn } = useAuth();
const route = useRoute();
const router = useRouter();

const breadcrumbItems = ref<{ name: string; path: string }[]>([]);

watch(
  () => route.path,
  (newPath) => {
    updateBreadcrumb(newPath);
  },
  { immediate: true }
);

function updateBreadcrumb(path: string) {
  const paths = path.split("/").filter(Boolean); 
  breadcrumbItems.value = paths.map((segment, index) => {
    const fullPath = "/" + paths.slice(0, index + 1).join("/");
    const name = segment.charAt(0).toUpperCase() + segment.slice(1); 
    return { name, path: fullPath };
  });
}

</script>

<template>
  <header
    class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
  >
    <Breadcrumb class="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink as-child>
            <a href="/" aria-label="Home">
              <Home class="inline-block h-4 w-4" />
            </a>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem v-for="(item, index) in breadcrumbItems" :key="index">
          <BreadcrumbLink as-child>
            <a :href="item.path">{{ item.name }}</a>
          </BreadcrumbLink>
          <BreadcrumbSeparator v-if="index < breadcrumbItems.length - 1" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <div class="relative ml-auto md:grow-0">
      <span>Hallo, {{ user?.nama }}</span>
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline">
          <Icon
            icon="radix-icons:moon"
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Icon
            icon="radix-icons:sun"
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem @click="colorMode.preference = 'light'">Light</DropdownMenuItem>
        <DropdownMenuItem @click="colorMode.preference = 'dark'">Dark</DropdownMenuItem>
        <DropdownMenuItem @click="colorMode.preference = 'system'">System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button variant="secondary" size="icon" class="rounded-full">
      <CircleUser class="h-5 w-5" />
      <span class="sr-only">Toggle user menu</span>
    </Button>
  </header>
</template>
