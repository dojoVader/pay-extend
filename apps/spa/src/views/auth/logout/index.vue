<template>
  <Auth>
    <div class="mt-8 text-center">
      <div class="mb-4">
        <Icon icon="lucide:log-out" class="size-6 text-purple-500 fill-purple-100 mx-auto"></Icon>
      </div>
      <h4 class="mb-2 text-primary text-xl font-semibold">You are Logged Out</h4>
      <p class="mb-8 text-base text-default-500">Thank you for using payextend admin template</p>
    </div>
    <RouterLink to="/auth/login">
      <button class="btn bg-primary text-white w-full">Sign In</button>
    </RouterLink>
  </Auth>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Auth from '@/layouts/auth.vue'
import { RouterLink, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

function mockLogout() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      // clear local mock session/storage if any (no-op here)
      resolve()
    }, 400)
  })
}

onMounted(async () => {
  await mockLogout()
  // navigate to login after logout
  await router.push('/auth/login')
})
</script>
