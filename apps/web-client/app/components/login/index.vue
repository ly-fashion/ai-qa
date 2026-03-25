<template>
  <a-modal
    v-model:open="visible"
    :title="currentMode === 'login' ? '登录' : '注册'"
    :width="400"
    :footer="null"
    @cancel="handleCancel"
  >
    <div class="space-y-4">
      <!-- Login Form -->
      <a-form
        v-if="currentMode === 'login'"
        :model="loginForm"
        :rules="loginRules"
        @finish="handleLogin"
        layout="vertical"
      >
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="loginForm.username"
            placeholder="请输入用户名"
            size="large"
          />
        </a-form-item>
        
        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="loginForm.password"
            placeholder="请输入密码"
            size="large"
          />
        </a-form-item>
        
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="loading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>

      <!-- Register Form -->
      <a-form
        v-else
        :model="registerForm"
        :rules="registerRules"
        @finish="handleRegister"
        layout="vertical"
      >
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="registerForm.username"
            placeholder="请输入用户名（至少3个字符）"
            size="large"
          />
        </a-form-item>
        
        <a-form-item label="邮箱" name="email">
          <a-input
            v-model:value="registerForm.email"
            placeholder="请输入邮箱"
            size="large"
          />
        </a-form-item>
        
        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="registerForm.password"
            placeholder="请输入密码（至少6个字符）"
            size="large"
          />
        </a-form-item>
        
        <a-form-item label="确认密码" name="confirmPassword">
          <a-input-password
            v-model:value="registerForm.confirmPassword"
            placeholder="请再次输入密码"
            size="large"
          />
        </a-form-item>
        
        <a-form-item label="名字（可选）" name="firstName">
          <a-input
            v-model:value="registerForm.firstName"
            placeholder="请输入名字"
            size="large"
          />
        </a-form-item>
        
        <a-form-item label="姓氏（可选）" name="lastName">
          <a-input
            v-model:value="registerForm.lastName"
            placeholder="请输入姓氏"
            size="large"
          />
        </a-form-item>
        
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="loading"
          >
            注册
          </a-button>
        </a-form-item>
      </a-form>

      <!-- Switch Mode -->
      <div class="text-center">
        <a-button type="link" @click="toggleMode">
          {{ currentMode === 'login' ? '没有账号？立即注册' : '已有账号？立即登录' }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'

// Props
interface Props {
  open: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:open': [value: boolean]
  login: [user: User]
  register: [user: User]
}>()

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

interface LoginForm {
  username: string
  password: string
}

interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
  firstName?: string
  lastName?: string
  phone?: string
}

// Reactive data
const visible = ref(props.open)
const loading = ref(false)
const currentMode = ref<'login' | 'register'>('login')

const loginForm = reactive<LoginForm>({
  username: '',
  password: ''
})

const registerForm = reactive<RegisterForm>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  phone: ''
})

// Form validation rules
const loginRules: Record<string, Rule[]> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const registerRules: Record<string, Rule[]> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 50, message: '用户名长度为3-50个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 255, message: '密码长度为6-255个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (_rule: any, value: string) => {
        if (value !== registerForm.password) {
          return Promise.reject('两次输入的密码不一致')
        }
        return Promise.resolve()
      },
      trigger: 'blur'
    }
  ],
  firstName: [
    { max: 100, message: '名字不能超过100个字符', trigger: 'blur' }
  ],
  lastName: [
    { max: 100, message: '姓氏不能超过100个字符', trigger: 'blur' }
  ],
  phone: [
    { max: 20, message: '电话号码不能超过20个字符', trigger: 'blur' }
  ]
}

// API base URL
const API_BASE_URL = 'http://localhost:9000'

// Methods
const handleCancel = () => {
  visible.value = false
  emit('update:open', false)
}

const toggleMode = () => {
  currentMode.value = currentMode.value === 'login' ? 'register' : 'login'
  // Reset forms
  Object.assign(loginForm, { username: '', password: '' })
  Object.assign(registerForm, { 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    firstName: '', 
    lastName: '', 
    phone: '' 
  })
}

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginForm)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || '登录失败')
    }
    
    const user: User = await response.json()
    message.success('登录成功')
    emit('login', user)
    handleCancel()
  } catch (error: any) {
    message.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  loading.value = true
  try {
    const { confirmPassword, ...userData } = registerForm
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || '注册失败')
    }
    
    const user: User = await response.json()
    message.success('注册成功')
    emit('register', user)
    handleCancel()
  } catch (error: any) {
    message.error(error.message || '注册失败')
  } finally {
    loading.value = false
  }
}

// Watch for prop changes
watch(() => props.open, (newVal) => {
  visible.value = newVal
})
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 16px;
}
</style>