<template>
  <AppLayout>
    <PageHeader title="Customers" subtitle="Polar customer directory" />

    <!-- Table -->
    <div class="card overflow-hidden">
      <div v-if="loading" class="p-8 text-center text-sm text-gray-400">Loading…</div>

      <div v-else-if="customers.length === 0" class="p-8 text-center text-sm text-gray-400">
        No customers found.
      </div>

      <table v-else class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <th class="px-4 py-3 text-left">Name</th>
            <th class="px-4 py-3 text-left">Email</th>
            <th class="px-4 py-3 text-left">Created</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="customer in customers"
            :key="customer.id"
            class="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0"
          >
            <td class="px-4 py-3 font-medium text-gray-900">{{ customer.name || '—' }}</td>
            <td class="px-4 py-3 text-gray-600">{{ customer.email }}</td>
            <td class="px-4 py-3 text-gray-400">{{ formatDate(customer.created_at) }}</td>
            <td class="px-4 py-3 text-right">
              <Button icon="pi pi-user" text size="small" severity="secondary" v-tooltip.top="'View Info'" @click="openDetail(customer)" />
              <Button icon="pi pi-receipt" text size="small" severity="secondary" v-tooltip.top="'Subscriptions'" @click="openSubscriptions(customer)" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <span class="text-xs text-gray-400">Page {{ currentPage }} of {{ totalPages }}</span>
        <div class="flex items-center gap-1">
          <Button icon="pi pi-chevron-left" text size="small" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)" />
          <Button icon="pi pi-chevron-right" text size="small" :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)" />
        </div>
      </div>
    </div>

    <!-- Customer Info Drawer -->
    <Drawer
      v-model:visible="detailVisible"
      header="Customer Information"
      position="right"
      :style="{ width: '440px', fontSize: '14px' }"
    >
      <div v-if="selectedCustomer" class="space-y-1">
        <InfoRow label="ID" :value="selectedCustomer.id" mono />
        <InfoRow label="Name" :value="selectedCustomer.name || '—'" />
        <InfoRow label="Email" :value="selectedCustomer.email" />
        <InfoRow label="Tax ID" :value="selectedCustomer.tax_id || '—'" />
        <InfoRow label="Country" :value="selectedCustomer.billing_address?.country || '—'" />
        <InfoRow label="Created" :value="formatDate(selectedCustomer.created_at)" />
        <InfoRow label="Modified" :value="formatDate(selectedCustomer.modified_at)" />

        <div v-if="selectedCustomer.metadata && Object.keys(selectedCustomer.metadata).length" class="pt-3">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Metadata</p>
          <div v-for="(val, key) in selectedCustomer.metadata" :key="key" class="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
            <span class="text-gray-500 text-xs">{{ key }}</span>
            <span class="text-gray-700 text-xs font-mono">{{ val }}</span>
          </div>
        </div>
      </div>
    </Drawer>

    <!-- Subscriptions Drawer -->
    <Drawer
      v-model:visible="subsVisible"
      header="Customer Subscriptions"
      position="right"
      :style="{ width: '520px', fontSize: '14px' }"
    >
      <div v-if="subsLoading" class="py-8 text-center text-sm text-gray-400">Loading subscriptions…</div>

      <div v-else-if="subscriptions.length === 0" class="py-8 text-center text-sm text-gray-400">
        No subscriptions found for this customer.
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="sub in subscriptions"
          :key="sub.id"
          class="rounded-lg border border-gray-100 p-4 space-y-2"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-900">{{ sub.product?.name || 'Subscription' }}</span>
            <span
              class="text-xs px-2 py-0.5 rounded-full font-medium"
              :class="statusClass(sub.status)"
            >{{ sub.status }}</span>
          </div>
          <InfoRow label="ID" :value="sub.id" mono />
          <InfoRow label="Started" :value="formatDate(sub.started_at)" />
          <InfoRow label="Current period" :value="formatDate(sub.current_period_start) + ' → ' + formatDate(sub.current_period_end)" />
          <InfoRow v-if="sub.ended_at" label="Ended" :value="formatDate(sub.ended_at)" />
          <InfoRow label="Amount" :value="sub.price ? formatAmount(sub.price) : '—'" />
          <InfoRow label="Cancel at period end" :value="sub.cancel_at_period_end ? 'Yes' : 'No'" />
        </div>
      </div>
    </Drawer>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import { POLARKIT_BASE_URL } from '@/constant'

// ── Types ─────────────────────────────────────────────────────────────────

interface BillingAddress {
  country?: string
  line1?: string
  city?: string
}

interface Customer {
  id: string
  name?: string
  email: string
  tax_id?: string
  billing_address?: BillingAddress
  metadata?: Record<string, unknown>
  created_at: string
  modified_at?: string
}

interface Price {
  amount_type: string
  price_amount?: number
  price_currency?: string
  recurring_interval?: string
}

interface Subscription {
  id: string
  status: string
  started_at: string
  current_period_start: string
  current_period_end: string
  ended_at?: string
  cancel_at_period_end: boolean
  product?: { name: string }
  price?: Price
}

// ── Inline helper component ────────────────────────────────────────────────

const InfoRow = {
  props: { label: String, value: String, mono: Boolean },
  template: `
    <div class="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
      <span class="text-xs text-gray-500 shrink-0 mr-4">{{ label }}</span>
      <span class="text-xs text-right break-all" :class="mono ? 'font-mono text-gray-600' : 'text-gray-800'">{{ value }}</span>
    </div>
  `,
}

// ── State ──────────────────────────────────────────────────────────────────

const customers = ref<Customer[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 20

const selectedCustomer = ref<Customer | null>(null)
const detailVisible = ref(false)

const subscriptions = ref<Subscription[]>([])
const subsVisible = ref(false)
const subsLoading = ref(false)

// ── Helpers ────────────────────────────────────────────────────────────────

function formatDate(val?: string) {
  if (!val) return '—'
  return new Date(val).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function formatAmount(price: Price) {
  if (price.amount_type === 'free') return 'Free'
  if (price.amount_type === 'custom') return 'Pay what you want'
  if (!price.price_amount) return '—'
  const formatted = (price.price_amount / 100).toFixed(2)
  const currency = price.price_currency?.toUpperCase() ?? 'USD'
  const interval = price.recurring_interval ? ` / ${price.recurring_interval}` : ''
  return `${currency} ${formatted}${interval}`
}

function statusClass(status: string) {
  const map: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700',
    canceled: 'bg-red-50 text-red-600',
    past_due: 'bg-amber-50 text-amber-700',
    trialing: 'bg-blue-50 text-blue-700',
    unpaid: 'bg-orange-50 text-orange-600',
    revoked: 'bg-gray-100 text-gray-500',
  }
  return map[status] ?? 'bg-gray-100 text-gray-600'
}

// ── Data fetching ──────────────────────────────────────────────────────────

async function fetchCustomers(page = 1) {
  loading.value = true
  try {
    const res = await fetch(`${POLARKIT_BASE_URL}polar/customers?page=${page}&limit=${pageSize}`)
    if (res.ok) {
      const data = await res.json()
      customers.value = data?.items ?? []
      const total = data?.pagination?.total_count ?? customers.value.length
      totalPages.value = Math.max(1, Math.ceil(total / pageSize))
      currentPage.value = page
    }
  } catch (e) {
    console.error('Failed to fetch customers:', e)
  } finally {
    loading.value = false
  }
}

function changePage(page: number) {
  fetchCustomers(page)
}

async function openDetail(customer: Customer) {
  selectedCustomer.value = customer
  detailVisible.value = true
}

async function openSubscriptions(customer: Customer) {
  selectedCustomer.value = customer
  subsVisible.value = true
  subsLoading.value = true
  subscriptions.value = []
  try {
    const res = await fetch(`${POLARKIT_BASE_URL}polar/customers/${customer.id}/subscriptions`)
    if (res.ok) {
      const data = await res.json()
      subscriptions.value = data?.items ?? []
    }
  } catch (e) {
    console.error('Failed to fetch subscriptions:', e)
  } finally {
    subsLoading.value = false
  }
}

onMounted(() => fetchCustomers(1))
</script>
