<template>
  <AppLayout>
    <PageHeader title="Chrome Webstore Settings" subtitle="Extension" />

    <div class="max-w-3xl space-y-4">
      <!-- Status banner -->
      <div class="card px-6 py-4 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-semibold text-gray-900">Chrome Webstore API</h3>
          <p class="text-xs text-gray-400 mt-0.5">Configure credentials for publishing extensions</p>
        </div>
        <span class="badge" :class="isConfigured ? 'badge-green' : 'badge-red'">
          {{ integrationStatus || (isConfigured ? 'Configured' : 'Not Configured') }}
        </span>
      </div>

      <!-- API Credentials -->
      <div class="card overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-900">API Credentials</h3>
          <p class="text-xs text-gray-400 mt-0.5">Enter your Chrome Webstore API client ID and secret</p>
        </div>
        <div class="px-6 py-5 space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Client ID</label>
            <input type="text" v-model="config.clientId" placeholder="Your Client ID" class="form-input" readonly />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Client Secret</label>
            <div class="relative">
              <input
                :type="showSecret ? 'text' : 'password'"
                v-model="config.clientSecret"
                placeholder="••••••••"
                class="form-input pr-10"
                readonly
              />
              <button type="button" @click="showSecret = !showSecret" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600">
                <Icon :icon="showSecret ? 'lucide:eye-off' : 'lucide:eye'" class="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tokens -->
      <div class="card overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-900">Tokens</h3>
          <p class="text-xs text-gray-400 mt-0.5">Refresh token for API access</p>
        </div>
        <div class="px-6 py-5">
          <label class="block text-xs font-medium text-gray-700 mb-1">Refresh Token</label>
          <div class="relative">
            <input
              :type="showRefresh ? 'text' : 'password'"
              v-model="config.refreshToken"
              placeholder=""
              class="form-input pr-10"
              readonly
            />
            <button type="button" @click="showRefresh = !showRefresh" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600">
              <Icon :icon="showRefresh ? 'lucide:eye-off' : 'lucide:eye'" class="text-sm" />
            </button>
          </div>
        </div>
      </div>

      <!-- Publisher ID -->
      <div class="card overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-900">Publisher ID</h3>
          <p class="text-xs text-gray-400 mt-0.5">Chrome Webstore Publisher identifier</p>
        </div>
        <div class="px-6 py-5">
          <label class="block text-xs font-medium text-gray-700 mb-1">Publisher ID</label>
          <input type="text" v-tooltip.top="'The Chrome Web Store Publisher ID is a unique alphanumeric identifier found in the Account section of the Chrome Web Store Developer Dashboard. '" v-model="config.publisherID" placeholder="Your Publisher ID" class="form-input" />
          <div class="flex items-center gap-3 mt-4">
            <button class="btn btn-primary btn-sm" @click="saveConfig">Save Settings</button>
          </div>
          <p v-if="saveMsg" class="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <Icon icon="lucide:check-circle" class="text-xs" />
            {{ saveMsg }}
          </p>
          <p v-if="errorCode" class="text-xs text-red-500 mt-2">Error {{ errorCode }} — check your credentials</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'
import { POLARKIT_BASE_URL } from '@/constant'

const showSecret = ref(false)
const showRefresh = ref(false)
const integrationStatus = ref('')
const isConfigured = ref(false)
const errorCode = ref<number | null>(null)
const saveMsg = ref('')

const config = reactive({
  clientId: '',
  clientSecret: '',
  refreshToken: '',
  publisherID: '',
})

onMounted(() => {
  getConfig()
})

async function getConfig() {
  try {
    const response = await fetch(`${POLARKIT_BASE_URL}chrome-webstore/config`)
    const data = await response.json()
    if (response.status === 200) {
      config.clientId = data.clientId
      config.clientSecret = data.secret
      config.refreshToken = data.refreshToken
      config.publisherID = data.publisherID
      isConfigured.value = true
    } else {
      errorCode.value = data.statusCode
    }
    integrationStatus.value = data.message
  } catch {
    // API not available in dev
  }
}

async function saveConfig() {
  try {
    const response = await fetch(`${POLARKIT_BASE_URL}chrome-webstore/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })
    const data = await response.json()
    if (response.ok) {
      saveMsg.value = data.message || 'Settings saved.'
      setTimeout(() => (saveMsg.value = ''), 3000)
      // Optionally refresh config
      await getConfig()
    } else {
      errorCode.value = response.status
    }
  } catch (error) {
    errorCode.value = 500
  }
}
</script>
