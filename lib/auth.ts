import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { AuthResponse, User } from '@/types/Login.types'

export function useAuth() {
  const router = useRouter()
  
  const user = useState<User | null>('user', () => null)
  const token = useCookie('auth_token')

  onMounted(() => {
    if (process.client && !user.value) {
      const userData = sessionStorage.getItem('user_data')
      if (userData) {
        user.value = JSON.parse(userData)
        console.log('User data loaded from sessionStorage:', user.value)
      }
    }
  })

  const login = async (nip: string, password: string) => {
    const { data, error } = await useFetch<AuthResponse>('http://localhost:8000/api/auth/login', {
      method: 'POST',
      body: { nip, password },
      credentials: 'include',
    })

    if (error.value) {
      throw new Error('Login gagal. Periksa NIP dan Password Anda.')
    }

    if (data.value) {
      user.value = data.value.data
      token.value = data.value.token
      
      if (process.client) {
        sessionStorage.setItem('auth_token', data.value.token)
        sessionStorage.setItem('user_data', JSON.stringify(data.value.data))
      }
      
      router.push('/dashboard')
    }
  }

  const logout = () => {
    if (process.client) {
      sessionStorage.removeItem('auth_token')
      sessionStorage.removeItem('user_data')
    }
    
    token.value = null
    user.value = null
    router.push('/')
  }

  const isLoggedIn = () => {
    if (process.client) {
      const storedToken = sessionStorage.getItem('auth_token');
      console.log("Token value:", token.value);
      console.log("Auth token from sessionStorage:", storedToken);
      
      return !!token.value || !!storedToken; 
    }
    return !!token.value;
  }
  

  return { token, user, login, logout, isLoggedIn }
}
