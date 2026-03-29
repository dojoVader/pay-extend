<template>
  <AppLayout>
    <PageHeader title="Polar Settings" subtitle="Payment" />

    <div class="max-w-3xl space-y-4">
      <!-- Integration Toggle -->
      <div class="card overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Integration Status</h3>
            <p class="text-xs text-gray-400 mt-0.5">Enable or disable the Polar integration</p>
          </div>
          <label class="flex items-center gap-3 cursor-pointer">
            <span class="text-sm text-gray-600">{{ enabled ? 'Enabled' : 'Disabled' }}</span>
            <button
              role="switch"
              :aria-checked="enabled"
              @click="enabled = !enabled"
              class="relative inline-flex w-10 h-5 rounded-full transition-colors focus:outline-none"
              :class="enabled ? 'bg-indigo-600' : 'bg-gray-200'"
            >
              <span
                class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                :class="enabled ? 'translate-x-5' : 'translate-x-0'"
              />
            </button>
          </label>
        </div>
      </div>

      <!-- Environment -->
      <div class="card overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Environment</h3>
            <p class="text-xs text-gray-400 mt-0.5">Toggle between test and live environments</p>
          </div>
          <label class="flex items-center gap-3 cursor-pointer">
            <span class="text-sm text-gray-600">{{ environment === 'live' ? 'Live' : 'Test' }}</span>
            <button
              role="switch"
              :aria-checked="environment === 'live'"
              @click="environment = environment === 'live' ? 'test' : 'live'"
              class="relative inline-flex w-10 h-5 rounded-full transition-colors focus:outline-none"
              :class="environment === 'live' ? 'bg-emerald-600' : 'bg-gray-200'"
            >
              <span
                class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                :class="environment === 'live' ? 'translate-x-5' : 'translate-x-0'"
              />
            </button>
          </label>
        </div>
        <div class="px-6 py-4">
          <span class="badge" :class="environment === 'live' ? 'badge-red' : 'badge-blue'">
            {{ environment === 'live' ? 'Live' : 'Test' }}
          </span>
        </div>
      </div>

      <!-- Credentials -->
      <div class="card overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-900">Credentials</h3>
          <p class="text-xs text-gray-400 mt-0.5">OAuth Access Token for authenticating with Polar</p>
        </div>
        <div class="px-6 py-5 space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              OAT (OAuth Access Token) <span class="text-red-500">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input
                :type="revealOat ? 'text' : 'password'"
                v-model="oat"
                placeholder="polar_oat_..."
                class="form-input flex-1 font-mono text-sm"
              />
              <button class="btn btn-secondary btn-sm" @click="revealOat = !revealOat">
                <Icon :icon="revealOat ? 'lucide:eye-off' : 'lucide:eye'" class="text-sm" />
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Webhook URL <span class="text-red-500">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input
                type="text"
                v-model="webhookUrl"
                placeholder="https://your-domain.com/api/polar/webhook"
                class="form-input flex-1 font-mono text-sm"
              />
              <button class="btn btn-secondary btn-sm" @click="copyWebhook">
                <Icon icon="lucide:copy" class="text-sm" />
              </button>
            </div>
            <p v-if="copied" class="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <Icon icon="lucide:check" class="text-xs" /> Copied to clipboard
            </p>
          </div>
        </div>
      </div>

      <!-- Webhook Events -->
      <div class="card overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Webhook Events</h3>
            <p class="text-xs text-gray-400 mt-0.5">Select the events you want to receive from Polar</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-secondary btn-sm" @click="selectAll">Select All</button>
            <button class="btn btn-secondary btn-sm" @click="clearAll">Clear</button>
          </div>
        </div>
        <div class="px-6 py-5 space-y-5">
          <div v-for="group in eventGroups" :key="group.label">
            <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ group.label }}</h4>
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="event in group.events"
                :key="event"
                class="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="event"
                  v-model="selectedEvents"
                  class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span class="text-xs text-gray-700 font-mono">{{ event }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <button class="btn btn-primary" @click="saveSettings" :disabled="saving">
          <Icon v-if="saving" icon="lucide:loader-2" class="text-sm animate-spin" />
          {{ saving ? 'Saving...' : 'Save Settings' }}
        </button>
        <p v-if="saveSuccess" class="text-xs text-emerald-600 flex items-center gap-1">
          <Icon icon="lucide:check-circle" class="text-sm" /> Settings saved
        </p>
        <p v-if="saveError" class="text-xs text-red-500 flex items-center gap-1">
          <Icon icon="lucide:alert-circle" class="text-sm" /> {{ saveError }}
        </p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'
import { PAYEXTEND_BASE_URL } from '@/constant'

const oat = ref('')
const webhookUrl = ref('')
const enabled = ref(false)
const environment = ref<'live' | 'test'>('test')
const selectedEvents = ref<string[]>([])
const revealOat = ref(false)
const copied = ref(false)
const saving = ref(false)
const saveSuccess = ref(false)
const saveError = ref('')

const eventGroups = [
  {
    label: 'Checkout',
    events: ['checkout.created', 'checkout.updated', 'checkout.expired'],
  },
  {
    label: 'Customer',
    events: ['customer.created', 'customer.updated', 'customer.deleted', 'customer.state_changed'],
  },
  {
    label: 'Customer Seat',
    events: ['customer_seat.assigned', 'customer_seat.claimed', 'customer_seat.revoked'],
  },
  {
    label: 'Member',
    events: ['member.created', 'member.updated', 'member.deleted'],
  },
  {
    label: 'Order',
    events: ['order.created', 'order.updated', 'order.paid', 'order.refunded'],
  },
  {
    label: 'Subscription',
    events: [
      'subscription.created',
      'subscription.updated',
      'subscription.active',
      'subscription.canceled',
      'subscription.uncanceled',
      'subscription.revoked',
      'subscription.past_due',
    ],
  },
  {
    label: 'Refund',
    events: ['refund.created', 'refund.updated'],
  },
  {
    label: 'Product',
    events: ['product.created', 'product.updated'],
  },
  {
    label: 'Benefit',
    events: ['benefit.created', 'benefit.updated'],
  },
  {
    label: 'Benefit Grant',
    events: [
      'benefit_grant.created',
      'benefit_grant.cycled',
      'benefit_grant.updated',
      'benefit_grant.revoked',
    ],
  },
  {
    label: 'Organization',
    events: ['organization.updated'],
  },
]

const allEvents = eventGroups.flatMap((g) => g.events)

function selectAll() {
  selectedEvents.value = [...allEvents]
}

function clearAll() {
  selectedEvents.value = []
}

async function copyWebhook() {
  try {
    await navigator.clipboard.writeText(webhookUrl.value)
  } catch {
    const el = document.createElement('textarea')
    el.value = webhookUrl.value
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

async function loadSettings() {
  try {
    const res = await fetch(`${PAYEXTEND_BASE_URL}polar/settings`)
    if (res.ok) {
      const data = await res.json()
      oat.value = data.oat ?? ''
      webhookUrl.value = data.webhookUrl ?? ''
      enabled.value = data.enabled ?? false
      environment.value = data.environment ?? 'test'
      selectedEvents.value = data.webhookEvents ?? []
    }
  } catch {
    // no existing settings
  }
}

async function saveSettings() {
  if (!oat.value.trim()) {
    saveError.value = 'OAT is required'
    return
  }
  if (!webhookUrl.value.trim()) {
    saveError.value = 'Webhook URL is required'
    return
  }

  saving.value = true
  saveError.value = ''
  saveSuccess.value = false

  try {
    const res = await fetch(`${PAYEXTEND_BASE_URL}polar/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        oat: oat.value,
        webhookUrl: webhookUrl.value,
        enabled: enabled.value,
        environment: environment.value,
        webhookEvents: selectedEvents.value,
      }),
    })

    if (res.ok) {
      saveSuccess.value = true
      setTimeout(() => (saveSuccess.value = false), 3000)
    } else {
      const err = await res.json()
      saveError.value = err.message ?? 'Failed to save settings'
    }
  } catch {
    saveError.value = 'Network error, please try again'
  } finally {
    saving.value = false
  }
}

onMounted(loadSettings)
</script>
