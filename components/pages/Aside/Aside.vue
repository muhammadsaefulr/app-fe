<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRoute } from "vue-router";
import { useAuth } from '@/lib/auth';

const auth = useAuth();

const route = useRoute();

const getActiveClass = (path: string) => {
  return route.path === path
    ? "bg-accent text-accent-foreground"
    : "text-muted-foreground hover:text-foreground";
};
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex"
  >
    <nav class="flex flex-col items-center gap-4 px-2 py-4">
      <a
        href="#"
        class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <Icon
          icon="mdi:account-group"
          class="h-4 w-4 transition-all group-hover:scale-110"
        />
        <span class="sr-only">Manajemen Pegawai PNS</span>
      </a>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="/dashboard/"
              :class="[
                'flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8',
                getActiveClass('/dashboard/'),
              ]"
            >
              <Icon icon="mdi:home" class="h-5 w-5" />
              <span class="sr-only">Dashboard</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right"> Dashboard </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="/dashboard/pegawai/"
              :class="[
                'flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8',
                getActiveClass('/dashboard/pegawai/'),
              ]"
            >
              <Icon icon="mdi:account-multiple" class="h-5 w-5" />
              <span class="sr-only">Pegawai</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right"> Pegawai </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>

    <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              @click="auth.logout"
              class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Icon icon="mdi:logout" class="h-5 w-5" />
              <span class="sr-only">Logout</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right"> Logout </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  </aside>
</template>
