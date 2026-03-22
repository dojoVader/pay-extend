<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Left decorative panel -->
    <div class="hidden lg:flex lg:w-1/2 bg-indigo-600 items-center justify-center p-12 flex-col gap-8">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Icon icon="lucide:puzzle" class="text-white text-xl" />
        </div>
        <span class="text-white text-2xl font-bold">PayExtend</span>
      </div>
      <div class="max-w-sm text-center">
        <h2 class="text-3xl font-bold text-white leading-tight mb-4">Browser extension monetisation, simplified.</h2>
        <p class="text-indigo-200 text-sm leading-relaxed">Manage extensions, track DOM selectors, and integrate payment gateways — all from one dashboard.</p>
      </div>
      <div class="flex flex-wrap gap-2 justify-center">
        <span v-for="feat in features" :key="feat" class="px-3 py-1.5 bg-white/10 text-white text-xs rounded-full">{{ feat }}</span>
      </div>
    </div>

    <!-- Right register form -->
    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-sm">
        <!-- Mobile logo -->
        <div class="flex items-center gap-2 mb-8 lg:hidden">
          <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Icon icon="lucide:puzzle" class="text-white text-sm" />
          </div>
          <span class="text-gray-900 font-bold">PayExtend</span>
        </div>

        <h1 class="text-2xl font-bold text-gray-900 mb-1">Create an account</h1>
        <p class="text-sm text-gray-500 mb-8">Sign up to get started with PayExtend</p>

        <p v-if="globalError" class="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <Icon icon="lucide:alert-circle" class="text-sm flex-shrink-0" />
          {{ globalError }}
        </p>

        <p v-if="successMessage" class="mb-4 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <Icon icon="lucide:check-circle" class="text-sm flex-shrink-0" />
          {{ successMessage }}
        </p>

        <form @submit.prevent="onSubmit" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Full name</label>
            <input
              v-model="form.name"
              @input="onChange('name')"
              type="text"
              placeholder="Jane Doe"
              class="form-input"
              :class="errors.name ? 'border-red-400 focus:border-red-400' : ''"
              autocomplete="name"
            />
            <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Email address</label>
            <input
              v-model="form.email"
              @input="onChange('email')"
              type="text"
              placeholder="you@example.com"
              class="form-input"
              :class="errors.email ? 'border-red-400 focus:border-red-400' : ''"
              autocomplete="email"
            />
            <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                @input="onChange('password')"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="form-input pr-10"
                :class="errors.password ? 'border-red-400 focus:border-red-400' : ''"
                autocomplete="new-password"
              />
              <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600">
                <Icon :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="text-sm" />
              </button>
            </div>
            <p v-if="errors.password" class="text-xs text-red-500 mt-1">{{ errors.password }}</p>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Role</label>
            <select v-model="form.role" class="form-input">
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary w-full" :disabled="loading">
            <Icon v-if="loading" icon="lucide:loader-2" class="text-sm animate-spin" />
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <RouterLink to="/auth/login" class="text-indigo-600 hover:text-indigo-700 font-medium">Sign in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { PAYEXTEND_BASE_URL } from '@/constant'

const router = useRouter()

const form = reactive({ name: '', email: '', password: '', role: 'Admin' })
const errors = reactive<{ name: string | null; email: string | null; password: string | null }>({ name: null, email: null, password: null })
const loading = ref(false)
const showPassword = ref(false)
const globalError = ref('')
const successMessage = ref('')

const features = ['DOM Selectors', 'Extension Logs', 'Stripe Payments', 'Chrome Webstore', 'SMTP Alerts']

const emailRegex = /^\S+@\S+\.\S+$/
const passwordRegex = /^(?=.*\d).{8,}$/

function validateField(field: 'name' | 'email' | 'password') {
  if (field === 'name') {
    if (!form.name.trim()) { errors.name = 'Name is required'; return false }
    errors.name = null; return true
  }
  if (field === 'email') {
    if (!form.email) { errors.email = 'Email is required'; return false }
    if (!emailRegex.test(form.email)) { errors.email = 'Enter a valid email'; return false }
    errors.email = null; return true
  }
  if (field === 'password') {
    if (!form.password) { errors.password = 'Password is required'; return false }
    if (!passwordRegex.test(form.password)) { errors.password = 'At least 8 characters including a number'; return false }
    errors.password = null; return true
  }
  return true
}

function onChange(field: 'name' | 'email' | 'password') { validateField(field) }

async function onSubmit() {
  const ok = validateField('name') && validateField('email') && validateField('password')
  if (!ok) return
  loading.value = true
  globalError.value = ''
  successMessage.value = ''
  try {
    const res = await fetch(`${PAYEXTEND_BASE_URL}auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
    })
    if (!res.ok) {
      const body = await res.json()
      throw new Error(body?.message || `Registration failed (${res.status})`)
    }
    successMessage.value = 'Account created! Redirecting to login...'
    setTimeout(() => router.push('/auth/login'), 2000)
  } catch (err: any) {
    globalError.value = err?.message ?? 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>
