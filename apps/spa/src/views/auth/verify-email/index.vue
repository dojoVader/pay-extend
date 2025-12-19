<template>
  <div class="relative min-h-screen w-full flex justify-center items-center py-16 md:py-10">
    <div class="card md:w-lg w-screen z-10">
      <div class="text-center px-10 py-12">
        <RouterLink to="/" class="flex justify-center">
          <img :src="logodark" alt="logo dark" class="h-6 flex dark:hidden" />
          <img :src="logolight" alt="logo light" class="h-6 hidden dark:flex" />
        </RouterLink>
        <div class="mt-8 text-center">
          <h4 class="mb-3 text-xl font-semibold text-primary">Verify Email</h4>
          <p class="text-base text-default-500 mb-4">Did you not receive an email? Please <RouterLink to="" class="text-primary"> try again</RouterLink></p>

          <div class="mx-auto max-w-sm text-left">
            <div v-if="infoMessage" class="p-3 mb-4 text-sm rounded-md font-normal text-success bg-success/15">{{ infoMessage }}</div>
            <form @submit.prevent="onResend">
              <label for="resendEmail" class="block text-sm font-medium text-default-800 mb-2">Email</label>
              <input id="resendEmail" v-model="email" @input="onChange()" type="text" class="form-input w-full" :class="error ? 'border border-red-400' : ''" placeholder="Enter your email" />
              <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
              <div class="mt-4">
                <button type="submit" class="btn bg-primary text-white w-full" :disabled="loading">{{ loading ? 'Sending...' : 'Resend Email' }}</button>
              </div>
            </form>
          </div>

          <button type="button" class="btn btn-sm bg-primary text-white mt-6"><RouterLink to="/auth/login">Skip Now</RouterLink></button>
          <div class="mt-10 text-center">
            <img :src="auth" alt="" class="block w-1/2 mx-auto" />
          </div>
        </div>
      </div>
    </div>
    <div class="absolute inset-0 overflow-hidden">
      <svg aria-hidden="true" class="absolute inset-0 size-full fill-black/2 stroke-black/5 dark:fill-white/2.5 dark:stroke-white/2.5">
        <defs>
          <pattern id="authPattern" width="56" height="56" patternUnits="userSpaceOnUse" x="50%" y="16">
            <path d="M.5 56V.5H72" fill="none"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#authPattern)"></rect>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import auth from '@/assets/images/auth-email.png'
import logodark from '@/assets/images/logo-dark.png'
import logolight from '@/assets/images/logo-light.png'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const error = ref<string | null>(null)
const loading = ref(false)
const infoMessage = ref('')

const router = useRouter()

const emailRegex = /^\S+@\S+\.\S+$/

function onChange() {
  if (!email.value) {
    error.value = 'Email is required'
    return
  }
  if (!emailRegex.test(email.value)) {
    error.value = 'Enter a valid email'
    return
  }
  error.value = null
}

function mockResend(emailVal: string) {
  return new Promise<{ success: boolean; message?: string }>((resolve) => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      if (emailVal.toLowerCase().includes('error')) {
        resolve({ success: false, message: 'Failed to resend (mock)' })
      } else {
        resolve({ success: true })
      }
    }, 700)
  })
}

async function onResend() {
  onChange()
  if (error.value) return
  const res = await mockResend(email.value)
  if (res.success) {
    infoMessage.value = 'Verification email resent (mock). Check your inbox.'
    await router.push('/auth/two-steps')
  } else {
    error.value = res.message || 'Could not resend verification email'
  }
}
</script>
