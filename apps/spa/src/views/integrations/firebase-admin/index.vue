<template>
  <AppLayout>
    <PageHeader title="Firebase Admin" subtitle="Integration" />

    <div class="max-w-3xl space-y-4">
      <!-- Status banner -->
      <div class="card px-6 py-4 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-semibold text-gray-900">Firebase Admin SDK</h3>
          <p class="text-xs text-gray-400 mt-0.5">Service account credentials for Firebase Admin SDK</p>
        </div>
        <span v-if="status" class="badge" :class="status.configured ? 'badge-green' : 'badge-red'">
          {{ status.configured ? 'Configured' : 'Not Configured' }}
        </span>
        <span v-else class="badge badge-gray">Checking…</span>
      </div>

      <!-- Credential file status -->
      <div class="card overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-900">Service Account</h3>
          <p class="text-xs text-gray-400 mt-0.5">
            Set <code class="bg-gray-100 px-1 rounded text-xs font-mono">GOOGLE_APPLICATION_CREDENTIALS</code> to the path of your Firebase service account JSON file
          </p>
        </div>
        <div class="px-6 py-5 space-y-4">
          <!-- Configured state -->
          <div v-if="status?.configured" class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <Icon icon="lucide:check-circle-2" class="text-emerald-500 text-base" />
            </div>
            <div class="min-w-0">
              <p class="text-sm font-medium text-gray-800">Credential file detected</p>
              <p class="text-xs text-gray-400 mt-0.5 font-mono break-all">{{ status.credentialPath }}</p>
            </div>
          </div>

          <!-- Not configured state -->
          <div v-else-if="status && !status.configured" class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <Icon icon="lucide:x-circle" class="text-red-400 text-base" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-800">No service account found</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ status.message }}</p>
            </div>
          </div>

          <!-- Loading skeleton -->
          <div v-else class="flex items-center gap-3 animate-pulse">
            <div class="w-8 h-8 rounded-full bg-gray-100"></div>
            <div class="space-y-1.5">
              <div class="h-3 w-48 bg-gray-100 rounded"></div>
              <div class="h-2.5 w-72 bg-gray-100 rounded"></div>
            </div>
          </div>

          <!-- Divider -->
          <hr class="border-gray-100" />

          <!-- Project ID row -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Project ID</label>
            <input
              type="text"
              :value="status?.projectId ?? ''"
              placeholder="Detected from credential file"
              class="form-input"
              readonly
            />
          </div>

          <!-- Credential path row -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              <code class="font-mono">GOOGLE_APPLICATION_CREDENTIALS</code>
            </label>
            <input
              type="text"
              :value="status?.credentialPath ?? ''"
              placeholder="Not set"
              class="form-input font-mono text-xs"
              readonly
            />
          </div>
        </div>
      </div>

      <!-- How to configure -->
      <div v-if="!status?.configured" class="card overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-900">How to configure</h3>
        </div>
        <div class="px-6 py-5 space-y-2 text-xs text-gray-500 leading-relaxed">
          <p>1. Go to the <strong class="text-gray-700">Firebase Console</strong> → Project Settings → Service Accounts.</p>
          <p>2. Click <strong class="text-gray-700">Generate new private key</strong> and download the JSON file.</p>
          <p>3. Add the following to your <code class="bg-gray-100 px-1 rounded font-mono">.development.env</code>:</p>
          <pre class="bg-gray-50 border border-gray-200 rounded px-4 py-3 font-mono text-xs overflow-x-auto">GOOGLE_APPLICATION_CREDENTIALS=../../firebase/your-key-file.json</pre>
          <p>4. Restart the backend server.</p>
        </div>
      </div>

      <!-- Status message -->
      <p v-if="status?.message" class="text-xs px-1" :class="status.configured ? 'text-emerald-600' : 'text-gray-400'">
        <Icon :icon="status.configured ? 'lucide:info' : 'lucide:alert-circle'" class="inline mr-1" />
        {{ status.message }}
      </p>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'
import { POLARKIT_BASE_URL } from '@/constant'

interface FirebaseStatus {
  configured: boolean
  credentialPath: string | null
  projectId: string | null
  message: string
}

const status = ref<FirebaseStatus | null>(null)

onMounted(async () => {
  try {
    const res = await fetch(`${POLARKIT_BASE_URL}firebase/status`)
    status.value = await res.json()
  } catch {
    status.value = {
      configured: false,
      credentialPath: null,
      projectId: null,
      message: 'Unable to reach backend',
    }
  }
})
</script>
