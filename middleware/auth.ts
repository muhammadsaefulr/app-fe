import { useAuth } from '@/lib/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Middleware auth dijalankan')
  
  const { isLoggedIn } = useAuth()

  console.log("nilai logged in", isLoggedIn());

  if (!isLoggedIn()) {
    console.log('Pengguna tidak terautentikasi, mengarahkan ke login')
    return navigateTo('/auth/login')
  }
})