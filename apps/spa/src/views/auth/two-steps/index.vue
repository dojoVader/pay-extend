<template>
  <Auth>
    <div class="mt-8">
      <h4 class="mb-4 text-primary text-xl font-semibold">Verify Email</h4>
      <p class="text-base/normal mb-8 text-default-500">Please enter the 4 digit code sent to tailwick@themesdesign.in</p>
    </div>
    <form action="/apps/spa/public" class="mt-">
      <div class="grid grid-cols-4 gap-2">
        <input
          v-for="idx in otpIndices"
          :key="idx"
          :ref="el => (inputs[idx] = el)"
          v-model="otp[idx]"
          @input="onInput(idx, $event)"
          @keydown="onKeydown(idx, $event)"
          @paste="onPaste($event)"
          type="text"
          inputmode="numeric"
          pattern="\\d*"
          autocomplete="one-time-code"
          class="form-input text-center h-20 rounded-lg border border-red-400"
          placeholder="•"
          maxlength="1"
        />
      </div>
      <div class="mt-6">
        <button type="button" class="btn text-white disabled:bg-primary/60 bg-primary w-full" :disabled="!otpTyped" @click.prevent="goLogin">Confirm</button>
      </div>
    </form>
  </Auth>
</template>

<script setup lang="ts">
import Auth from '@/layouts/auth.vue'
import { useRouter } from 'vue-router'
import { ref, computed, nextTick, onMounted } from 'vue'

// reactive array for 4 OTP digits
const otp = ref<string[]>(['', '', '', ''])
// use permissive typing for template refs to avoid assignment type issues
const inputs = ref<any[]>([])

// expose numeric indices to iterate in the template (avoids unused v-for variable warnings)
const otpIndices = computed(() => otp.value.map((_, i) => i))

const otpTyped = computed(() => otp.value.every((d) => d.trim() !== ''))

// focus first input on mount
onMounted(async () => {
  await nextTick()
  inputs.value[0]?.focus()
})

// focus/advance logic
const onInput = async (i: number, e: Event | any) => {
  const val = (e.target as HTMLInputElement).value || ''
  // keep only last character typed
  otp.value[i] = val.slice(-1)
  if (otp.value[i] && i < otp.value.length - 1) {
    await nextTick()
    inputs.value[i + 1]?.focus()
  }
}

const onKeydown = (i: number, e: KeyboardEvent | any) => {
  const key = e.key
  if (key === 'Backspace') {
    // if current has a value, clear it and prevent default
    if (otp.value[i]) {
      otp.value[i] = ''
      e.preventDefault()
      return
    }
    // if current empty, move to previous and clear it
    if (i > 0) {
      inputs.value[i - 1]?.focus()
      otp.value[i - 1] = ''
      e.preventDefault()
    }
  } else if (key === 'ArrowLeft' && i > 0) {
    inputs.value[i - 1]?.focus()
    e.preventDefault()
  } else if (key === 'ArrowRight' && i < otp.value.length - 1) {
    inputs.value[i + 1]?.focus()
    e.preventDefault()
  }
}

const onPaste = async (e: ClipboardEvent | any) => {
  e.preventDefault()
  let paste = ''
  if (e.clipboardData && typeof e.clipboardData.getData === 'function') {
    paste = e.clipboardData.getData('text')
  } else if ((window as any).clipboardData && typeof (window as any).clipboardData.getData === 'function') {
    paste = (window as any).clipboardData.getData('text')
  }
  const digits = (paste || '').replace(/\D/g, '').slice(0, 4).split('')
  digits.forEach((d: string, idx: number) => {
    otp.value[idx] = d
  })
  await nextTick()
  // focus first empty or last
  const firstEmpty = otp.value.findIndex((d) => d === '')
  const focusIndex = firstEmpty === -1 ? otp.value.length - 1 : firstEmpty
  inputs.value[focusIndex]?.focus()
}

const router = useRouter()
const goLogin = () => {
  router.push('/auth/login')
}
</script>

<style scoped>
/* Hide native number input spin buttons (Chrome, Edge, Safari) */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Hide Firefox number spinner */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
