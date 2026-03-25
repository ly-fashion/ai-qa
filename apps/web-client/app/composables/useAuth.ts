import { ref, computed, readonly } from 'vue'
import { message } from 'ant-design-vue'
import { useLocalStorage } from './useLocalStorage'

// Types
interface User {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  isActive: boolean
  role: string
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

// State
const currentUser = ref<User | null>(null)
const isLoggedIn = computed(() => currentUser.value !== null)
const { setItem, getItem, removeItem } = useLocalStorage()

// Load user from localStorage on init
const loadUserFromStorage = () => {
  const storedUser = getItem('currentUser')
  if (storedUser) {
    try {
      currentUser.value = JSON.parse(storedUser)
    } catch (error) {
      console.error('Failed to parse stored user:', error)
      removeItem('currentUser')
    }
  }
}

// Initialize
loadUserFromStorage()

// Methods
const login = (user: User) => {
  currentUser.value = user
  setItem('currentUser', JSON.stringify(user))
  message.success(`欢迎回来，${user.username}！`)
}

const register = (user: User) => {
  currentUser.value = user
  setItem('currentUser', JSON.stringify(user))
  message.success(`注册成功，欢迎 ${user.username}！`)
}

const logout = () => {
  const username = currentUser.value?.username
  currentUser.value = null
  removeItem('currentUser')
  message.success(`${username} 已退出登录`)
}

const updateUser = (userData: Partial<User>) => {
  if (currentUser.value) {
    currentUser.value = { ...currentUser.value, ...userData }
    setItem('currentUser', JSON.stringify(currentUser.value))
  }
}

// Export as composable
export const useAuth = () => {
  return {
    currentUser: readonly(currentUser),
    isLoggedIn,
    login,
    register,
    logout,
    updateUser
  }
}
