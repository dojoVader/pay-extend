<template>
  <!-- Header -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-sm font-semibold text-gray-900">Checkout Sessions</h3>
  </div>

  <!-- List -->
  <div v-if="sessions.length > 0" class="space-y-2">
    <div
      v-for="session in sessions"
      :key="session.id"
      class="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      @click="openDetail(session)"
    >
      <div class="flex items-center gap-3 min-w-0">
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ session.label || session.products?.[0]?.name || 'Checkout' }}
            </p>
            <span
              v-if="session.status"
              class="shrink-0 text-[10px] px-1.5 py-0.5 rounded font-medium capitalize"
              :class="statusClass(session.status)"
            >
              {{ session.status }}
            </span>
          </div>
          <p class="text-xs text-gray-400 mt-0.5 font-mono">{{ session.id }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3 shrink-0 ml-4">
        <span class="text-xs text-gray-400">{{ formatDate(session.created_at) }}</span>
        <Button icon="pi pi-eye" text size="small" severity="secondary" @click.stop="openDetail(session)" />
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="card p-6 text-center text-sm text-gray-400">
    Loading checkout sessions…
  </div>

  <div v-else class="card p-6 text-center">
    <p class="text-sm text-gray-400">No checkout sessions found for this extension.</p>
  </div>

  <!-- Detail modal -->
  <Dialog
    v-model:visible="detailVisible"
    modal
    header="Checkout Session"
    :style="{ width: '560px' }"
    :draggable="false"
  >
    <div v-if="selectedSession" class="space-y-1 text-sm">
      <!-- ID + status -->
      <div class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">ID</span>
        <span class="font-mono text-xs text-gray-700 break-all text-right max-w-xs">{{ selectedSession.id }}</span>
      </div>
      <div v-if="selectedSession.status" class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Status</span>
        <span
          class="text-xs px-2 py-0.5 rounded font-medium capitalize"
          :class="statusClass(selectedSession.status)"
        >
          {{ selectedSession.status }}
        </span>
      </div>
      <div v-if="selectedSession.label" class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Label</span>
        <span>{{ selectedSession.label }}</span>
      </div>
      <div v-if="selectedSession.payment_processor" class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Processor</span>
        <span class="capitalize">{{ selectedSession.payment_processor }}</span>
      </div>
      <div v-if="selectedSession.allow_discount_codes !== undefined" class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Discount Codes</span>
        <span>{{ selectedSession.allow_discount_codes ? 'Allowed' : 'Not allowed' }}</span>
      </div>
      <div v-if="selectedSession.require_billing_address !== undefined" class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Billing Address</span>
        <span>{{ selectedSession.require_billing_address ? 'Required' : 'Optional' }}</span>
      </div>

      <!-- Products -->
      <div v-if="selectedSession.products?.length" class="py-2 border-b border-gray-100">
        <p class="text-gray-500 mb-2">Products</p>
        <div class="space-y-1">
          <div
            v-for="product in selectedSession.products"
            :key="product.id"
            class="flex justify-between text-xs bg-gray-50 px-3 py-2 rounded"
          >
            <span class="font-medium text-gray-800">{{ product.name }}</span>
            <span class="text-gray-400 capitalize">{{ product.is_recurring ? 'Recurring' : 'One-time' }}</span>
          </div>
        </div>
      </div>

      <!-- Discount -->
      <div v-if="selectedSession.discount" class="py-2 border-b border-gray-100">
        <p class="text-gray-500 mb-2">Discount</p>
        <div class="flex justify-between text-xs bg-gray-50 px-3 py-2 rounded">
          <span class="font-medium text-gray-800">{{ selectedSession.discount.name }}</span>
          <span class="font-mono text-indigo-500">{{ selectedSession.discount.code }}</span>
        </div>
      </div>

      <!-- URLs -->
      <div v-if="selectedSession.url" class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Checkout URL</span>
        <a :href="selectedSession.url" target="_blank" class="text-indigo-500 hover:underline text-xs truncate max-w-xs">
          Open link
        </a>
      </div>
      <div v-if="selectedSession.success_url" class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Success URL</span>
        <span class="text-xs text-gray-600 truncate max-w-xs">{{ selectedSession.success_url }}</span>
      </div>

      <!-- Dates -->
      <div class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Created</span>
        <span>{{ formatDate(selectedSession.created_at) }}</span>
      </div>
      <div v-if="selectedSession.modified_at" class="flex justify-between py-2">
        <span class="text-gray-500">Modified</span>
        <span>{{ formatDate(selectedSession.modified_at) }}</span>
      </div>
    </div>
    <template #footer>
      <Button label="Close" severity="secondary" size="small" @click="detailVisible = false" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { POLARKIT_BASE_URL } from '@/constant'

interface CheckoutProduct {
  id: string
  name: string
  is_recurring: boolean
}

interface CheckoutDiscount {
  id: string
  name: string
  code: string
}

interface CheckoutSession {
  id: string
  created_at: string
  modified_at?: string
  status?: string
  label?: string
  payment_processor?: string
  allow_discount_codes?: boolean
  require_billing_address?: boolean
  url?: string
  success_url?: string
  return_url?: string
  discount_id?: string
  products?: CheckoutProduct[]
  discount?: CheckoutDiscount
}

const props = defineProps<{ extensionId?: string }>()

const sessions = ref<CheckoutSession[]>([])
const loading = ref(true)
const selectedSession = ref<CheckoutSession | null>(null)
const detailVisible = ref(false)

onMounted(fetchSessions)
watch(() => props.extensionId, fetchSessions)

async function fetchSessions() {
  if (!props.extensionId) return
  loading.value = true
  try {
    const res = await fetch(`${POLARKIT_BASE_URL}polar/checkouts/extension/${props.extensionId}`)
    if (res.ok) {
      const data = await res.json()
      sessions.value = data?.items ?? data ?? []
    }
  } catch (e) {
    console.error('Failed to fetch checkout sessions:', e)
  } finally {
    loading.value = false
  }
}

function openDetail(session: CheckoutSession) {
  selectedSession.value = session
  detailVisible.value = true
}

function formatDate(iso?: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function statusClass(status: string): string {
  const map: Record<string, string> = {
    open: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    needs_confirmation: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
    expired: 'bg-gray-100 text-gray-500',
  }
  return map[status] ?? 'bg-gray-100 text-gray-500'
}
</script>
