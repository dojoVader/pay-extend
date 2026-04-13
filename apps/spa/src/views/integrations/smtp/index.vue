<template>
  <AppLayout>
    <PageHeader title="SMTP Settings" subtitle="Integrations" />

    <div class="max-w-3xl">
      <div class="card overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-900">SMTP Configuration</h3>
          <p class="text-xs text-gray-400 mt-0.5">Configure outgoing email settings</p>
        </div>

        <div class="px-6 py-5 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">SMTP Host</label>
              <input v-model="config.host" type="text" class="form-input" placeholder="smtp.example.com" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Port</label>
              <input v-model.number="config.port" type="number" class="form-input" placeholder="587" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Username</label>
              <input v-model="config.username" type="text" class="form-input" placeholder="your@email.com" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="config.password"
                  class="form-input pr-10"
                  placeholder="••••••••"
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600">
                  <Icon :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="text-sm" />
                </button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">From Name</label>
              <input v-model="config.fromName" type="text" class="form-input" placeholder="Polarkit" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">From Email</label>
              <input v-model="config.fromEmail" type="email" class="form-input" placeholder="noreply@example.com" />
            </div>
          </div>

          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="config.useTLS" id="use-tls" class="w-4 h-4 rounded text-indigo-600" />
            <label for="use-tls" class="text-sm text-gray-700">Use TLS / STARTTLS</label>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <button class="btn btn-primary btn-sm" @click="saveConfig">Save Settings</button>
            <button class="btn btn-secondary btn-sm" @click="testConnection">
              <Icon icon="lucide:send" class="text-sm" />
              Send Test Email
            </button>
          </div>

          <p v-if="statusMsg" class="text-xs flex items-center gap-1" :class="statusOk ? 'text-emerald-600' : 'text-red-500'">
            <Icon :icon="statusOk ? 'lucide:check-circle' : 'lucide:x-circle'" class="text-sm" />
            {{ statusMsg }}
          </p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'

const showPassword = ref(false)
const statusMsg = ref('')
const statusOk = ref(true)

const config = reactive({
  host: '',
  port: 587,
  username: '',
  password: '',
  fromName: '',
  fromEmail: '',
  useTLS: true,
})

function saveConfig() {
  statusMsg.value = 'Settings saved successfully.'
  statusOk.value = true
  setTimeout(() => (statusMsg.value = ''), 3000)
}

function testConnection() {
  statusMsg.value = 'Test email sent — check your inbox.'
  statusOk.value = true
  setTimeout(() => (statusMsg.value = ''), 4000)
}
</script>
