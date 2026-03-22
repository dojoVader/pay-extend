<template>
  <AppLayout>
    <PageHeader title="Stripe Settings" subtitle="Payment" />

    <div class="max-w-3xl space-y-4">
      <!-- Environment -->
      <div class="card overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Environment</h3>
            <p class="text-xs text-gray-400 mt-0.5">Toggle between sandbox and production modes</p>
          </div>
          <label class="flex items-center gap-3 cursor-pointer">
            <span class="text-sm text-gray-600">{{ isProduction ? 'Production' : 'Testing' }}</span>
            <button
              role="switch"
              :aria-checked="isProduction"
              @click="isProduction = !isProduction"
              class="relative inline-flex w-10 h-5 rounded-full transition-colors focus:outline-none"
              :class="isProduction ? 'bg-indigo-600' : 'bg-gray-200'"
            >
              <span
                class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                :class="isProduction ? 'translate-x-5' : 'translate-x-0'"
              />
            </button>
          </label>
        </div>

        <div class="px-6 py-5 space-y-4">
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500">Active mode:</span>
            <span class="badge" :class="isProduction ? 'badge-red' : 'badge-blue'">
              {{ isProduction ? 'Live' : 'Test' }}
            </span>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Live API Key</label>
            <input
              :type="revealKeys ? 'text' : 'password'"
              v-model="liveApiKey"
              :disabled="!isProduction"
              placeholder="sk_live_..."
              class="form-input"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Test API Key</label>
            <input
              :type="revealKeys ? 'text' : 'password'"
              v-model="testApiKey"
              :disabled="isProduction"
              placeholder="sk_test_..."
              class="form-input"
            />
          </div>

          <div class="flex items-center gap-3">
            <button class="btn btn-primary btn-sm" @click="saveKeys">Save Keys</button>
            <button class="btn btn-secondary btn-sm" @click="revealKeys = !revealKeys">
              <Icon :icon="revealKeys ? 'lucide:eye-off' : 'lucide:eye'" class="text-sm" />
              {{ revealKeys ? 'Hide' : 'Reveal' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Webhook -->
      <div class="card overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-900">Webhook Endpoint</h3>
          <p class="text-xs text-gray-400 mt-0.5">Configure this URL in your Stripe dashboard to forward events</p>
        </div>
        <div class="px-6 py-5">
          <div class="flex items-center gap-2">
            <input type="text" v-model="webhookUrl" class="form-input flex-1 font-mono text-sm" />
            <button class="btn btn-secondary btn-sm" @click="copyWebhook">
              <Icon icon="lucide:copy" class="text-sm" />
              Copy
            </button>
            <button class="btn btn-primary btn-sm" @click="configureWebhook">Configure</button>
          </div>
          <p v-if="copied" class="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <Icon icon="lucide:check" class="text-xs" />
            Copied to clipboard
          </p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'

const isProduction = ref(false)
const liveApiKey = ref('')
const testApiKey = ref('')
const revealKeys = ref(false)
const webhookUrl = ref('https://example.com/api/stripe/webhook')
const copied = ref(false)

function saveKeys() {
  console.log('Saving keys', { live: liveApiKey.value, test: testApiKey.value, env: isProduction.value })
}

async function copyWebhook() {
  try {
    await navigator.clipboard.writeText(webhookUrl.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // fallback
    const el = document.createElement('textarea')
    el.value = webhookUrl.value
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
}

function configureWebhook() {
  window.open('https://dashboard.stripe.com/webhooks', '_blank')
}
</script>
