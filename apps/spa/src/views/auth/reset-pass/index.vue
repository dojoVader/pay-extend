<template>
  <Auth>
    <div class="mt-8">
      <h4 class="mb-2 text-primary text-xl font-semibold">Forgot Password?</h4>
      <p class="text-base mb-8 text-default-500">Reset your Payextend password</p>
    </div>
    <div v-if="infoMessage" class="p-3 mb-6 text-sm rounded-md font-normal text-success bg-success/15">{{ infoMessage }}</div>
    <div v-else class="p-3 mb-6 text-sm rounded-md font-normal text-warning bg-warning/15">Provide your email address, and instructions will be sent to you</div>
    <form @submit.prevent="onSubmit">
      <div class="text-start">
        <label for="Email" class="inline-block mb-2 text-sm text-default-800 font-medium">Email</label>
        <input v-model="email" @input="onChange()" type="text" id="Email" class="form-input" :class="error ? 'border border-red-400' : ''" placeholder="Enter Email" />
        <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
      </div>
      <div class="mt-8">
        <button type="submit" class="btn bg-primary text-white w-full" :disabled="loading">{{ loading ? 'Sending...' : 'Send Reset Link' }}</button>
      </div>
      <div class="mt-4 text-center">
        <p class="text-base text-default-800">
          Wait, I remember my password...
          <RouterLink to="/auth/login" class="text-primary underline"> Click here </RouterLink>
        </p>
      </div>
    </form>
  </Auth>
</template>

<script setup lang="ts">
import Auth from '@/layouts/auth.vue'
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

function mockSendReset(email: string) {
  return new Promise<{ success: boolean; message?: string }>((resolve) => {
    setTimeout(() => {
      if (email.toLowerCase() !== 'unknown@example.com') {
        resolve({ success: false, message: 'Email not found' })
      } else {
        resolve({ success: true })
      }
    }, 700)
  })
}

async function onSubmit() {
  onChange()
  if (error.value) return
  loading.value = true
  const res = await mockSendReset(email.value)
  loading.value = false
  if (res.success) {
    infoMessage.value = 'Reset link sent. Check your inbox.'
    email.value = ''
    router.push('/auth/two-steps')
  } else {
    error.value = res.message || 'Failed to send reset link'
  }
}
</script>
