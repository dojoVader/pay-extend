<template>
  <Auth>
    <div class="mt-8 text-center">
      <h4 class="mb-2.5 text-xl font-semibold text-primary">Create your free account</h4>
      <p class="text-base text-default-500">Get your free Payextend account now</p>
    </div>
    <form @submit.prevent="onSubmit" class="text-left w-full mt-10">
      <div class="mb-4">
        <label for="email" class="block font-medium text-default-900 text-sm mb-2">Enter email</label>
        <input v-model="form.email" @input="onChange('email')" type="text" id="email" class="form-input" :class="errors.email ? 'border border-red-400' : ''" placeholder="Enter Username or email" style="padding: 0 12px" />
        <p v-if="errors.email" class="text-sm text-red-500 mt-1">{{ errors.email }}</p>
      </div>
      <div class="mb-4">
        <label for="Username" class="block font-medium text-default-900 text-sm mb-2">Username</label>
        <input v-model="form.username" @input="onChange('username')" type="text" id="Username" class="form-input" :class="errors.username ? 'border border-red-400' : ''" placeholder="Enter Username" style="padding: 0 12px" />
        <p v-if="checkingUsername" class="text-xs text-default-500 mt-1">Checking availability...</p>
        <p v-if="errors.username" class="text-xs text-red-500 mt-1">{{ errors.username }}</p>
        <p v-if="usernameAvailable && !errors.username" class="text-sm text-green-500 mt-1">Username available</p>
      </div>
      <div class="mb-4">
        <label for="Password" class="block font-medium text-default-900 text-sm mb-2">Password</label>
        <input v-model="form.password" @input="onChange('password')" type="password" id="Password" class="form-input" :class="errors.password ? 'border border-red-400' : ''" placeholder="Enter Password" style="padding: 0 12px" />
        <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</p>
      </div>
      <p class="italic text-sm font-medium text-default-500">By registering you agree to the Tailwick <RouterLink to="" class="underline">Terms of Use</RouterLink></p>
      <div class="mt-10 text-center">
        <button type="submit" class="btn bg-primary text-white w-full" :disabled="loading">{{ loading ? 'Creating...' : 'Sign Up' }}</button>
      </div>
      <div class="my-9 relative text-center before:absolute before:top-2.5 before:left-0 before:border-t before:border-t-default-200 before:w-full before:h-0.5 before:right-0 before:-z-0">
        <h4 class="relative z-1 py-0.5 px-2 inline-block font-medium bg-card text-default-600">Create Account with</h4>
      </div>
      <div class="flex w-full justify-center items-center gap-2">
        <RouterLink to="" class="btn border border-default-200 flex-grow hover:bg-default-150 shadow-sm hover:text-default-800">
          <Icon icon="logos:google-icon" class="iconify-color"></Icon>
          Use Google
        </RouterLink>
        <RouterLink to="" class="btn border border-default-200 flex-grow hover:bg-default-150 shadow-sm hover:text-default-800">
          <Icon icon="logos:apple" class="iconify text-mono"></Icon>
          Use Apple
        </RouterLink>
      </div>
      <div class="mt-10 text-center">
        <p class="text-base text-default-500">
          Already have an account ?
          <RouterLink to="/auth/login" class="font-semibold underline hover:text-primary transition duration-200">Login</RouterLink>
        </p>
      </div>
    </form>
  </Auth>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import Auth from '@/layouts/auth.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// form state
const form = reactive({ email: '', username: '', password: '' })
const errors = reactive<{ [k: string]: string | null }>({ email: null, username: null, password: null })
const loading = ref(false)
const checkingUsername = ref(false)
const usernameAvailable = ref(false)

const router = useRouter()

// validation regex
const emailRegex = /^\S+@\S+\.\S+$/
const passwordRegex = /^(?=.*\d).{8,}$/ // at least 8 chars and one number

function validateField(field: string) {
  if (field === 'email') {
    if (!form.email) {
      errors.email = 'Email is required'
      return false
    }
    if (!emailRegex.test(form.email)) {
      errors.email = 'Enter a valid email'
      return false
    }
    errors.email = null
    return true
  }
  if (field === 'username') {
    if (!form.username) {
      errors.username = 'Username is required'
      usernameAvailable.value = false
      return false
    }
    // simple client-side username format check
    if (!/^[a-zA-Z0-9_\-]{3,20}$/.test(form.username)) {
      errors.username = 'Username must be 3-20 chars and contain only letters, numbers, - or _'
      usernameAvailable.value = false
      return false
    }
    errors.username = null
    // trigger availability check (debounced)
    checkUsernameAvailabilityDebounced(form.username)
    return true
  }
  if (field === 'password') {
    if (!form.password) {
      errors.password = 'Password is required'
      return false
    }
    if (!passwordRegex.test(form.password)) {
      errors.password = 'Password must be at least 8 characters and include a number'
      return false
    }
    errors.password = null
    return true
  }
  return true
}

function onChange(field: string) {
  validateField(field)
}

function validateAll() {
  const e1 = validateField('email')
  const e2 = validateField('username')
  const e3 = validateField('password')
  return e1 && e2 && e3 && usernameAvailable.value
}

// mock username availability endpoint
function mockCheckUsername(username: string) {
  return new Promise<{ available: boolean }>((resolve) => {
    checkingUsername.value = true
    setTimeout(() => {
      // simple mock: usernames starting with 'taken' are considered unavailable
      const available = !username.toLowerCase().startsWith('taken')
      resolve({ available })
      checkingUsername.value = false
    }, 500)
  })
}

// local debounce implementation to avoid extra dependencies
function debounceFn<T extends (...args: any[]) => void>(fn: T, wait = 400) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

const checkUsernameAvailabilityDebounced = debounceFn(async (username: string) => {
  usernameAvailable.value = false
  const res = await mockCheckUsername(username)
  usernameAvailable.value = res.available
  if (!res.available) errors.username = 'Username already taken'
}, 400)

// mock register endpoint
function mockRegister(data: { email: string; username: string; password: string }) {
  return new Promise<{ success: boolean; message?: string }>((resolve) => {
    setTimeout(() => {
      // accept everything unless username starts with 'error'
      if (data.username.toLowerCase().startsWith('error')) {
        resolve({ success: false, message: 'Server error' })
      } else {
        resolve({ success: true })
      }
    }, 800)
  })
}

async function onSubmit() {
  if (!validateAll()) return
  loading.value = true
  const res = await mockRegister({ email: form.email, username: form.username, password: form.password })
  loading.value = false
  if (res.success) {
    console.log('user Registered')
    await router.push('/auth/verify-email')
  } else {
    // put server error on username for visibility
    errors.username = res.message || 'Registration failed'
  }
}
</script>
