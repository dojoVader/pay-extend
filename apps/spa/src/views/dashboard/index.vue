<template>
  <AppLayout>
    <PageHeader title="Dashboard" subtitle="Overview" />

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="n in 12" :key="n" class="card p-5 animate-pulse">
        <div class="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-2/3 mb-3" />
        <div class="h-7 bg-gray-200 dark:bg-neutral-700 rounded w-1/2" />
      </div>
    </div>

    <div v-else-if="error" class="card p-5 text-sm text-red-500">
      Failed to load metrics: {{ error }}
    </div>

    <template v-else>
      <!-- Transaction metrics from Polar -->
      <p class="text-xs font-medium text-gray-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
        Transaction Metrics · {{ currentMonthLabel }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <div v-for="stat in transactionStats" :key="stat.label" class="card p-5">
          <p class="text-xs text-gray-400 dark:text-neutral-500 mb-2 uppercase tracking-wide">{{ stat.label }}</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            <span v-if="stat.prefix" class="text-base font-semibold text-gray-400 dark:text-neutral-500">{{ stat.prefix }}</span>{{ stat.value }}
          </p>
          <p v-if="stat.suffix" class="text-xs text-gray-400 dark:text-neutral-500 mt-0.5">{{ stat.suffix }}</p>
        </div>
      </div>

      <!-- Platform stats from local DB -->
      <p class="text-xs font-medium text-gray-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
        Platform
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="stat in platformStats" :key="stat.label" class="card p-5">
          <p class="text-xs text-gray-400 dark:text-neutral-500 mb-2 uppercase tracking-wide">{{ stat.label }}</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {{ stat.value }}
          </p>
          <p v-if="stat.description" class="text-xs text-gray-400 dark:text-neutral-500 mt-0.5">{{ stat.description }}</p>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'
import { POLARKIT_BASE_URL } from '@/constant'

interface MetricsData {
  // currency values in cents
  revenue: number
  netRevenue: number
  mrr: number
  averageOrderValue: number
  // scalar counts
  orders: number
  activeSubscriptions: number
  newSubscriptions: number
  churnedSubscriptions: number
  checkouts: number
  succeededCheckouts: number
  churnRate: number
  checkoutsConversion: number
  // platform
  customers: number
  activeExtensions: number
  domSelectors: number
  paymentEvents: number
}

const loading = ref(true)
const error = ref<string | null>(null)
const data = ref<MetricsData | null>(null)

const currentMonthLabel = computed(() => {
  return new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
})

function formatCents(cents: number): string {
  return (cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function formatPct(value: number): string {
  return (value * 100).toFixed(1) + '%'
}

const transactionStats = computed(() => {
  const d = data.value
  if (!d) return []
  return [
    { label: 'Revenue', value: formatCents(d.revenue), prefix: '$' },
    { label: 'Net Revenue', value: formatCents(d.netRevenue), prefix: '$' },
    { label: 'MRR', value: formatCents(d.mrr), prefix: '$', suffix: 'monthly recurring' },
    { label: 'Avg. Order Value', value: formatCents(d.averageOrderValue), prefix: '$' },
    { label: 'Orders', value: d.orders.toLocaleString() },
    { label: 'Active Subscriptions', value: d.activeSubscriptions.toLocaleString() },
    { label: 'New Subscriptions', value: d.newSubscriptions.toLocaleString() },
    { label: 'Churned Subscriptions', value: d.churnedSubscriptions.toLocaleString() },
    { label: 'Checkouts', value: d.checkouts.toLocaleString() },
    { label: 'Succeeded Checkouts', value: d.succeededCheckouts.toLocaleString() },
    { label: 'Checkout Conversion', value: formatPct(d.checkoutsConversion) },
    { label: 'Churn Rate', value: formatPct(d.churnRate) },
  ]
})

const platformStats = computed(() => {
  const d = data.value
  if (!d) return []
  return [
    { label: 'Customers', value: d.customers.toLocaleString(), description: 'Polar registered customers' },
    { label: 'Active Extensions', value: d.activeExtensions.toLocaleString(), description: 'Currently active' },
    { label: 'DOM Selectors', value: d.domSelectors.toLocaleString(), description: 'Configured selectors' },
    { label: 'Payment Events', value: d.paymentEvents.toLocaleString(), description: 'Webhook events received' },
  ]
})

onMounted(async () => {
  try {
    const res = await fetch(`${POLARKIT_BASE_URL}polar/metrics`, {
      credentials: 'same-origin',
    })
    if (!res.ok) {
      error.value = `HTTP ${res.status}`
    } else {
      data.value = await res.json()
    }
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})
</script>
