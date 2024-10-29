<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <Sidebar />
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <Navbar />
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/pages/Navbar/Navbar.vue';
import Sidebar from '@/components/pages/Aside/Aside.vue';


export default {

  components: {
    Navbar,
    Sidebar,
  },
};
</script>
