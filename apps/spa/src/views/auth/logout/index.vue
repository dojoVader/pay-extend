<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
        <Icon icon="lucide:log-out" class="text-indigo-600 text-xl" />
      </div>
      <h2 class="text-lg font-semibold text-gray-900 mb-1">Signing out…</h2>
      <p class="text-sm text-gray-500">You'll be redirected to login shortly.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useAuth } from '@/stores/auth'

const auth = useAuth()
const router = useRouter()

onMounted(async () => {
  auth.logout()
  await new Promise((r) => setTimeout(r, 800))
  await router.push('/auth/login')
})
</script>
