<template>
    <div :class="cn('grid gap-12', $attrs.class ?? '')">
      <form @submit.prevent="handleLogin">
        <div class="grid gap-2">
          <div class="grid gap-1">
            <Label class="sr-only" for="nip">
              NIP Pegawai
            </Label>
            <Input
              id="nip"
              placeholder="Masukan Nomor NIP Pegawai"
              v-model="nip"
              :disabled="isLoading"
            />
          </div>
          <div class="grid gap-1">
            <Label class="sr-only" for="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukan Password"
              v-model="password"
              :disabled="isLoading"
            />
          </div>
          <Button :disabled="isLoading">
            <div v-if="isLoading" class="mr-2 h-4 w-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Sign In
          </Button>
          <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
        </div>
      </form>
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { useAuth } from '@/lib/auth'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { cn } from '@/lib/utils'
  
  const nip = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const isLoading = ref(false)
  
  const { login } = useAuth()
  
  const handleLogin = async () => {
    isLoading.value = true
    errorMessage.value = '' // Clear previous error message
  
    try {
      await login(nip.value, password.value)
    } catch (error) {
      errorMessage.value = (error as Error).message
    } finally {
      isLoading.value = false
    }
  }
  </script>

  