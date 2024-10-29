<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
    <main class="flex-1">
      <section class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <div
            class="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div class="space-y-2">
              <h1
                class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
              >
                Welcome to MyWeb
              </h1>
              <p
                class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              >
                Login To Manage Data
              </p>
            </div>
            <div class="space-x-4">
              <router-link
                to="/auth/login"
                class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                Login
              </router-link>
              <router-link
                to="#"
                class="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              >
                Check Api docs
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "MyApp",
};
</script>
