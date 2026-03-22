<template>
  <Auth>
    <div class="mt-8">
      <h4 class="mb-2 text-primary text-xl font-semibold">Set a New Password</h4>
      <p class="text-base/normal mb-8 text-default-500">Your new password should be distinct from any of your prior passwords</p>
    </div>
    <div v-if="infoMessage" class="p-3 mb-6 text-sm rounded-md font-normal text-success bg-success/15">{{ infoMessage }}</div>
    <form @submit.prevent="onSubmit">
      <div class="text-start">
        <label for="Password" class="inline-block mb-2 text-sm text-default-800 font-medium">Password</label>
        <input
          v-model="form.password"
          @input="onChange('password')"
          type="password"
          id="Password"
          class="form-input"
          :class="errors.password ? 'border border-red-400' : ''"
          placeholder="Password"
          style="padding: 0 12px"
        />
        <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</p>
      </div>
      <div class="text-start mt-4">
        <label for="ConfirmPassword" class="inline-block mb-2 text-sm text-default-800 font-medium">Confirm Password</label>
        <input
          v-model="form.confirmPassword"
          @input="onChange('confirmPassword')"
          type="password"
          id="ConfirmPassword"
          class="form-input"
          :class="errors.confirmPassword ? 'border border-red-400' : ''"
          placeholder="Confirm Password"
          style="padding: 0 12px"
        />
        <p v-if="errors.confirmPassword" class="text-sm text-red-500 mt-1">{{ errors.confirmPassword }}</p>
      </div>
      <div class="flex items-center gap-2 mt-4">
        <input id="checkbox-1" type="checkbox" class="form-checkbox" />
        <label class="text-default-900 text-sm font-medium" for="checkbox-1">Remember Me</label>
      </div>
      <div class="mt-8">
        <button type="submit" class="btn bg-primary text-white w-full" :disabled="loading">{{ loading ? 'Saving...' : 'Reset Password' }}</button>
      </div>
      <div class="mt-4 text-center">
        <p class="text-base text-default-800">Hold on, I've got my password... <RouterLink to="/auth/login" class="text-primary underline"> Click here </RouterLink></p>
      </div>
    </form>
  </Auth>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Auth from '@/layouts/auth.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// form state
const form = reactive({ password: '', confirmPassword: '' })
const errors = reactive<{ [k: string]: string | null }>({ password: null, confirmPassword: null })
const loading = ref(false)
const infoMessage = ref('')

const router = useRouter()

const passwordRegex = /^(?=.*\d).{8,}$/ // at least 8 chars and one number

function validateField(field: string) {
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
    // also re-validate confirm
    if (form.confirmPassword) validateField('confirmPassword')
    return true
  }
  if (field === 'confirmPassword') {
    if (!form.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required'
      return false
    }
    if (form.confirmPassword !== form.password) {
      errors.confirmPassword = 'Passwords do not match'
      return false
    }
    errors.confirmPassword = null
    return true
  }
  return true
}

function onChange(field: string) {
  validateField(field)
}

function validateAll() {
  const p = validateField('password')
  const c = validateField('confirmPassword')
  return p && c
}

function mockSetPassword(data: { password: string }) {
  return new Promise<{ success: boolean; message?: string }>((resolve) => {
    setTimeout(() => {
      if (data.password.toLowerCase().includes('error')) {
        resolve({ success: false, message: 'Server error (mock)'
        })
      } else {
        resolve({ success: true })
      }
    }, 700)
  })
}

async function onSubmit() {
  if (!validateAll()) return
  loading.value = true
  const res = await mockSetPassword({ password: form.password })
  loading.value = false
  if (res.success) {
    infoMessage.value = 'Password updated successfully (mock). You can now sign in.'
    await router.push('/auth/login')
  } else {
    errors.confirmPassword = res.message || 'Failed to set password'
  }
}
</script>
