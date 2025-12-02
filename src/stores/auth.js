import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import API_BASE from '@/services/api'

export const useAuth = defineStore('auth', () => {
  const loadingStore = useLoading()
  const router = useRouter()

  const accessToken = ref(localStorage.getItem('access') || '')
  const refreshToken = ref(localStorage.getItem('refresh') || '')

  const user = ref(null)
  const isLoggedIn = computed(() => {
    return !!accessToken.value 
  })

  const fetchCurrentUser = async () => {
    if (!accessToken.value) {
      user.value = null
      return
    }
    const res = await API_BASE.getget('api/users/me/', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    })
    user.value = res.data
  }


  const login = async (email, password) => {
    try {
      loadingStore.isLoading = true
      const res = await API_BASE.post('token/', { email, password })
      accessToken.value = res.data.access
      refreshToken.value = res.data.refresh

      localStorage.setItem('access', accessToken.value)
      localStorage.setItem('refresh', refreshToken.value)

      await fetchCurrentUser()
      await router.push('/')
      loadingStore.isLoading = false

    } catch (err) {
      console.log('Login error: ', err.response?.data || err.message)
      loadingStore.isLoading = false
      throw err
    }
  }

const register = async (name, email, password) => {
  try {
    loadingStore.isLoading = true
    const res = await API_BASE.post('api/users/', { name, email, password })
    loadingStore.isLoading = false
    router.push({path: '/login', query: { registered: 'true' } })

  } catch (err) {
    console.log('Registration error: ', err.response?.data || err.message)
    loadingStore.isLoading = false
    throw err

  }
}
  const logout = () => {
    accessToken.value = ''
    refreshToken.value = ''
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    user.value = null
  }

  return { login, fetchCurrentUser, logout, user, accessToken, refreshToken, isLoggedIn, firstLetter }
})