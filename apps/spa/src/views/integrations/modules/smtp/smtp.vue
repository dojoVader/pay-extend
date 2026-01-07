<template>
  <Vertical>
    <PageTitle subtitle="Notification" title="SMTP Settings" />
    <div id="integration" class="" role="tabpanel" aria-labelledby="integrationTabs">
      <div class="card h-auto p-0">
        <!-- SMTP Configuration -->
        <div class="stripe-region flex flex-row gap-1 px-8 py-8 w-full">
          <div class="w-2/6 flex flex-col gap-1">
            <h3 class="text-white text-lg">SMTP Server</h3>
            <p>Configure your SMTP server settings for sending emails</p>
          </div>
          <div class="w-4/6 flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-300 mr-2">Status:</span>
              <span class="badge py-0.5 px-2.5 text-xs font-medium rounded-full text-white bg-info">Configured</span>
            </div>
          </div>
        </div>

        <div class="stripe-settings px-8 py-6">
          <!-- Server Details -->
          <div class="flex flex-row items-start gap-4 py-4 border-t border-gray-700">
            <div class="w-2/6">
              <h3 class="text-white text-lg">Server Details</h3>
              <p class="text-sm text-gray-300">Enter your SMTP server host and port information.</p>
            </div>

            <div class="w-4/6 flex flex-col gap-3">
              <div>
                <label class="text-sm text-gray-300">Host</label>
                <input
                  type="text"
                  v-model="smtpConfig.host"
                  placeholder="smtp.gmail.com"
                  class="form-input w-full"
                />
              </div>

              <div>
                <label class="text-sm text-gray-300">Port</label>
                <input
                  type="number"
                  v-model.number="smtpConfig.port"
                  placeholder="587"
                  class="form-input w-full"
                />
              </div>

              <div class="flex items-center gap-2">
                <input type="checkbox" v-model="smtpConfig.secure" class="form-switch" />
                <label class="text-sm text-gray-300">Use TLS/SSL (secure)</label>
              </div>
            </div>
          </div>

          <!-- Authentication -->
          <div class="flex flex-row items-start gap-4 py-4 border-t border-gray-700">
            <div class="w-2/6">
              <h3 class="text-white text-lg">Authentication</h3>
              <p class="text-sm text-gray-300">Provide your SMTP username and password.</p>
            </div>

            <div class="w-4/6 flex flex-col gap-3">
              <div>
                <label class="text-sm text-gray-300">Username</label>
                <input
                  type="text"
                  v-model="smtpConfig.username"
                  placeholder="your-email@gmail.com"
                  class="form-input w-full"
                />
              </div>

              <div>
                <label class="text-sm text-gray-300">Password</label>
                <input
                  type="password"
                  v-model="smtpConfig.password"
                  placeholder="••••••••"
                  class="form-input w-full"
                />
              </div>

              <div class="flex gap-2">
                <button class="btn btn-primary" @click="saveConfig">Save Configuration</button>
                <button class="btn" @click="testConnection">Test Connection</button>
              </div>
            </div>
          </div>

          <!-- From Details -->
          <div class="flex flex-row items-start gap-4 py-4 border-t border-gray-700">
            <div class="w-2/6">
              <h3 class="text-white text-lg">From Details</h3>
              <p class="text-sm text-gray-300">Set the default sender information for emails.</p>
            </div>

            <div class="w-4/6 flex flex-col gap-3">
              <div>
                <label class="text-sm text-gray-300">From Name</label>
                <input
                  type="text"
                  v-model="smtpConfig.fromName"
                  placeholder="Your App Name"
                  class="form-input w-full"
                />
              </div>

              <div>
                <label class="text-sm text-gray-300">From Email</label>
                <input
                  type="email"
                  v-model="smtpConfig.fromEmail"
                  placeholder="noreply@yourapp.com"
                  class="form-input w-full"
                />
              </div>
            </div>
          </div>

          <!-- Additional Settings -->
          <div class="flex flex-row items-start gap-4 py-4 border-t border-gray-700">
            <div class="w-2/6">
              <h3 class="text-white text-lg">Additional Settings</h3>
              <p class="text-sm text-gray-300">Optional notes and advanced configuration.</p>
            </div>

            <div class="w-4/6 flex flex-col gap-3">
              <div>
                <label class="text-sm text-gray-300">Notes</label>
                <textarea
                  v-model="smtpConfig.notes"
                  rows="3"
                  placeholder="Optional notes about this SMTP configuration"
                  class="form-input w-full"
                ></textarea>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Vertical>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import Vertical from '@/layouts/vertical.vue'

const smtpConfig = reactive({
  host: '',
  port: 587,
  secure: true,
  username: '',
  password: '',
  fromName: '',
  fromEmail: '',
  notes: ''
})

function saveConfig() {
  // TODO: Replace with real API call / secure storage
  console.log('Saving SMTP config', smtpConfig)
  // For now, save to localStorage
  localStorage.setItem('smtp_config', JSON.stringify(smtpConfig))
}

function testConnection() {
  // TODO: Implement actual SMTP test
  console.log('Testing SMTP connection', smtpConfig)
}
</script>
