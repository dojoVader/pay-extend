<template>
  <AppLayout>
    <PageHeader title="Dashboard" subtitle="Overview" />

    <!-- KPI stat cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      <div v-for="stat in stats" :key="stat.label" class="card p-4">
        <p class="text-xs text-gray-400 dark:text-neutral-500 mb-1 whitespace-nowrap">{{ stat.label }}</p>
        <p class="text-xl font-bold text-gray-900 dark:text-white leading-tight">
          {{ stat.value }}
          <span v-if="stat.unit" class="text-sm font-normal text-gray-400 ml-0.5">{{ stat.unit }}</span>
        </p>
        <div class="flex items-center gap-1 mt-1.5">
          <span
            class="text-xs font-medium"
            :class="stat.change >= 0 ? 'text-emerald-600' : 'text-red-500'"
          >
            {{ stat.change >= 0 ? '↑' : '↓' }} {{ Math.abs(stat.change) }}%
          </span>
          <span class="text-xs text-gray-400 dark:text-neutral-500">vs last month</span>
        </div>
      </div>
    </div>

    <!-- Payment behavior chart -->
    <div class="card p-5 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Payment Behavior</h2>
          <p class="text-xs text-gray-400 dark:text-neutral-500 mt-0.5">Revenue, occupancy, vacancy and effective rent trends</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-for="r in ['2 years', '5 years']"
            :key="r"
            class="px-3 py-1 text-xs rounded-md transition-colors"
            :class="selectedRange === r ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800'"
            @click="selectedRange = r"
          >{{ r }}</button>
        </div>
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap gap-4 mb-4">
        <div v-for="series in chartLegend" :key="series.name" class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ backgroundColor: series.color }" />
          <span class="text-xs text-gray-500 dark:text-neutral-400">{{ series.name }}</span>
        </div>
      </div>

      <!-- Chart placeholder -->
      <div class="h-52 rounded-lg bg-gray-50 dark:bg-neutral-950 border border-gray-100 dark:border-neutral-800 flex items-center justify-center relative overflow-hidden">
        <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
          <!-- Revenue line -->
          <polyline points="0,160 100,140 200,120 300,100 400,80 500,60 600,50 700,40 800,30"
            fill="none" stroke="#6366f1" stroke-width="2" />
          <!-- Occupancy line -->
          <polyline points="0,180 100,170 200,155 300,140 400,130 500,115 600,110 700,105 800,95"
            fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="4 2" />
          <!-- Vacancy line -->
          <polyline points="0,150 100,160 200,155 300,150 400,145 500,155 600,160 700,150 800,145"
            fill="none" stroke="#f59e0b" stroke-width="2" />
          <!-- Effective rent line -->
          <polyline points="0,190 100,185 200,178 300,168 400,155 500,145 600,135 700,125 800,115"
            fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6 2" />
        </svg>
        <span class="text-xs text-gray-300 z-10">Chart visualization</span>
      </div>
    </div>

    <!-- Bottom analytics row -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div v-for="chart in bottomCharts" :key="chart.title" class="card p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white">{{ chart.title }}</h3>
          <button class="text-xs text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors">2 years ›</button>
        </div>
        <!-- Mini chart placeholder -->
        <div class="h-28 rounded-md bg-gray-50 dark:bg-neutral-950 flex items-end gap-0.5 px-2 py-2 overflow-hidden">
          <div
            v-for="(h, i) in chart.bars"
            :key="i"
            class="flex-1 rounded-sm transition-all"
            :style="{ height: h + '%', backgroundColor: chart.color + (h < 60 ? '66' : 'cc') }"
          />
        </div>
        <p class="text-xs text-gray-400 dark:text-neutral-500 mt-2">{{ chart.description }}</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'
import { useAuth } from '@/stores/auth'
import { POLARKIT_BASE_URL } from '@/constant'

const router = useRouter()
const auth = useAuth()
const selectedRange = ref('2 years')

onMounted(async () => {
  // try {
  //   const res = await fetch(`${POLARKIT_BASE_URL}auth/verify`, {
  //     method: 'GET',
  //     credentials: 'same-origin',
  //   })
  //   if (!res.ok) {
  //     auth.logout()
  //     router.push('/auth/login')
  //     return
  //   }
  //   const user = await res.json()
  //   if (user?.email) {
  //     auth.setUser({ name: user.name ?? user.email, token: auth.user?.token })
  //   }
  // } catch {
  //   auth.logout()
  //   router.push('/auth/login')
  // }
})

const stats = [
  { label: 'Active Extensions', value: '24', unit: '', change: 12 },
  { label: 'Vacancy Loss', value: '$15,800', unit: '/mo', change: -3 },
  { label: 'DOM Selectors', value: '6', unit: '', change: 20 },
  { label: 'Avg. Lease Term', value: '3.4', unit: 'yrs', change: 5 },
  { label: 'Logs Today', value: '84', unit: '%', change: -1 },
  { label: 'API Health', value: '68', unit: '%', change: 8 },
]

const chartLegend = [
  { name: 'Revenue', color: '#6366f1' },
  { name: 'Occupancy', color: '#10b981' },
  { name: 'Vacancy', color: '#f59e0b' },
  { name: 'Effective Rent', color: '#3b82f6' },
]

const bottomCharts = [
  {
    title: 'Portfolio Trendline',
    color: '#6366f1',
    description: 'Cumulative item growth',
    bars: [20, 35, 28, 45, 38, 55, 48, 65, 58, 72, 68, 80],
  },
  {
    title: 'Tenant Concentration',
    color: '#10b981',
    description: 'Extension distribution by type',
    bars: [80, 60, 90, 40, 70, 85, 55, 75, 65, 88, 50, 78],
  },
  {
    title: 'Market vs Actual',
    color: '#3b82f6',
    description: 'Expected vs actual events',
    bars: [30, 50, 40, 70, 45, 65, 55, 75, 60, 80, 70, 85],
  },
  {
    title: 'Expense Breakdown',
    color: '#f59e0b',
    description: 'Operational costs by category',
    bars: [55, 40, 70, 35, 60, 45, 80, 50, 65, 42, 75, 58],
  },
]
</script>
