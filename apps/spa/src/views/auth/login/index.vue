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
      <!-- Feature pills -->
      <div class="flex flex-wrap gap-2 justify-center">
        <span v-for="feat in features" :key="feat" class="px-3 py-1.5 bg-white/10 text-white text-xs rounded-full">{{ feat }}</span>
      </div>
    </div>

    <!-- Right login form -->
    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-sm">
        <!-- Mobile logo -->
        <div class="flex items-center gap-2 mb-8 lg:hidden">
          <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Icon icon="lucide:puzzle" class="text-white text-sm" />
          </div>
          <span class="text-gray-900 font-bold">PayExtend</span>
        </div>

        <h1 class="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
        <p class="text-sm text-gray-500 mb-8">Sign in to your PayExtend account</p>

        <p v-if="globalError" class="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <Icon icon="lucide:alert-circle" class="text-sm flex-shrink-0" />
          {{ globalError }}
        </p>

        <form @submit.prevent="onSubmit" class="space-y-4">
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
            <div class="flex items-center justify-between mb-1">
              <label class="text-xs font-medium text-gray-700">Password</label>
              <a href="#" class="text-xs text-indigo-600 hover:text-indigo-700">Forgot password?</a>
            </div>
            <div class="relative">
              <input
                v-model="form.password"
                @input="onChange('password')"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="form-input pr-10"
                :class="errors.password ? 'border-red-400 focus:border-red-400' : ''"
                autocomplete="current-password"
              />
              <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600">
                <Icon :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="text-sm" />
              </button>
            </div>
            <p v-if="errors.password" class="text-xs text-red-500 mt-1">{{ errors.password }}</p>
          </div>

          <div class="flex items-center gap-2">
            <input type="checkbox" id="remember" v-model="rememberMe" class="w-4 h-4 rounded border-gray-300 text-indigo-600" />
            <label for="remember" class="text-sm text-gray-600">Remember me</label>
          </div>

          <button type="submit" class="btn btn-primary w-full" :disabled="loading">
            <Icon v-if="loading" icon="lucide:loader-2" class="text-sm animate-spin" />
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <RouterLink to="/auth/register" class="text-indigo-600 hover:text-indigo-700 font-medium">Create one</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useAuth } from '@/stores/auth'

const user = useAuth()
const router = useRouter()

const form = reactive({ email: '', password: '' })
const errors = reactive<{ email: string | null; password: string | null }>({ email: null, password: null })
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)
const globalError = ref('')

const features = ['DOM Selectors', 'Extension Logs', 'Stripe Payments', 'Chrome Webstore', 'SMTP Alerts']

const emailRegex = /^\S+@\S+\.\S+$/
const passwordRegex = /^(?=.*\d).{8,}$/

function validateField(field: 'email' | 'password') {
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

function onChange(field: 'email' | 'password') { validateField(field) }

async function onSubmit() {
  const ok = validateField('email') && validateField('password')
  if (!ok) return
  loading.value = true
  globalError.value = ''
  try {
    const data = await user.fetchUser(form.email, form.password)
    if (data?.token) {
      const redirect = new URLSearchParams(window.location.search).get('redirect') || '/dashboard'
      await router.push(redirect)
    }
  } catch (err: any) {
    const msg = err?.message ?? 'Login failed'
    if (msg.includes('No installation found')) {
      globalError.value = msg + ' Redirecting to registration...'
      setTimeout(() => router.push('/auth/register'), 3000)
    } else {
      globalError.value = msg
    }
  } finally {
    loading.value = false
  }
}
</script>
