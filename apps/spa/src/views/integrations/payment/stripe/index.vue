<template>
  <Vertical>
    <PageTitle subtitle="Payment" title="Stripe Settings" />
    <div id="integration" class="" role="tabpanel" aria-labelledby="integrationTabs">
      <div class="card h-auto p-0">
        <!-- Environment Setting Mode        -->
        <div class="stripe-region flex flex-row gap-1 px-8 py-8 w-full">
          <div class="w-2/6 flex flex-col gap-1">
            <h3 class="text-white text-lg">Environment</h3>
            <p>This mode toggles between Sandbox/Production environment</p>
          </div>
          <div class="w-2/6 flex items-center">
            <label class="flex items-center gap-3">
              <input type="checkbox" v-model="isProduction" class="form-switch" />
              <span class="text-white">{{ isProduction ? 'Production' : 'Testing' }}</span>
            </label>
          </div>
        </div>

        <div class="stripe-settings px-8 py-6">
          <!-- API Key -->
          <div class="flex flex-row items-start gap-4 py-4 border-t border-gray-700">
            <div class="w-2/6">
              <h3 class="text-white text-lg">API Key</h3>
              <p class="text-sm text-gray-300">Enter your Stripe API key for the selected environment.</p>
            </div>

            <div class="w-4/6 flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-300 mr-2">Active:</span>
                <span :class="{'bg-danger': isProduction, 'bg-info': !isProduction}" class="badge py-0.5 px-2.5 text-xs font-medium rounded-full text-white">{{ isProduction ? 'Live' : 'Test' }}</span>
              </div>

              <div>
                <label class="text-sm text-gray-300">Live API Key</label>
                <input
                  type="password"
                  v-model="liveApiKey"
                  :disabled="!isProduction"
                  placeholder="sk_live_..."
                  class="form-input w-full"
                />
              </div>

              <div>
                <label class="text-sm text-gray-300">Test API Key</label>
                <input
                  type="password"
                  v-model="testApiKey"
                  :disabled="isProduction"
                  placeholder="sk_test_..."
                  class="form-input w-full"
                />
              </div>

              <div class="flex gap-2">
                <button class="btn btn-primary" @click="saveKeys">Save</button>
                <button class="btn" @click="revealKeys = !revealKeys">{{ revealKeys ? 'Hide' : 'Reveal' }} Keys</button>
              </div>

              <div v-if="revealKeys" class="mt-2 text-sm text-gray-400">
                <div v-if="isProduction">Live: <code>{{ liveApiKey }}</code></div>
                <div v-else>Test: <code>{{ testApiKey }}</code></div>
              </div>
            </div>
          </div>

          <!-- Webhook Endpoint -->
          <div class="flex flex-row items-start gap-4 py-4 border-t border-gray-700">
            <div class="w-2/6">
              <h3 class="text-white text-lg">Webhook endpoint</h3>
              <p class="text-sm text-gray-300">Configure this URL in your Stripe dashboard to forward events to the application.</p>
            </div>

            <div class="w-4/6 flex items-center gap-2">
              <input
                type="text"
                v-model="webhookUrl"
                placeholder="https://your-app.com/api/stripe/webhook"
                class="form-input w-full"
              />
              <button class="btn" @click="copyWebhook">Copy</button>
              <button class="btn btn-secondary" @click="configureWebhook">Configure</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Vertical>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import Vertical from '@/layouts/vertical.vue'

const isProduction = ref(false)
const liveApiKey = ref('')
const testApiKey = ref('')
const revealKeys = ref(false)
const webhookUrl = ref('https://example.com/api/stripe/webhook')

function copyWebhook() {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(webhookUrl.value)
      return
    }
    // fallback for older browsers
    const el = document.createElement('textarea')
    el.value = webhookUrl.value
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  } catch (e) {
    // noop - copying failed
    // in a real app show a toast
    // console.warn('copy failed', e)
  }
}

function saveKeys() {
  // TODO: Replace with real API call / secure storage
  console.log('Saving keys', { live: liveApiKey.value, test: testApiKey.value, env: isProduction.value })
}

function configureWebhook() {
  // open Stripe webhook settings in a new tab as a convenience
  if (typeof window !== 'undefined') {
    window.open('https://dashboard.stripe.com/webhooks', '_blank')
  }
}
</script>
