<template>
  <AppLayout>
    <PageHeader title="Logs" subtitle="Extension" />

    <div class="card overflow-hidden">
      <!-- Filter bar -->
      <div class="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100">
        <div class="relative">
          <Icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          <input type="text" v-model="search" placeholder="Search logs..." class="form-input pl-9 py-1.5 text-sm w-56" />
        </div>
        <div class="ml-auto text-xs text-gray-400">{{ filtered.length }} entries</div>
      </div>

      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th><input type="checkbox" class="w-4 h-4 rounded border-gray-300" /></th>
              <th>ID</th>
              <th>Date</th>
              <th>Title</th>
              <th>Source</th>
              <th>Payloads</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filtered" :key="item.id">
              <td><input type="checkbox" class="w-4 h-4 rounded border-gray-300" /></td>
              <td class="text-indigo-600 font-medium text-sm">#{{ item.id }}</td>
              <td class="text-xs text-gray-500">{{ formatDate(item.date_created) }}</td>
              <td class="font-medium text-sm text-gray-900">{{ item.title || '—' }}</td>
              <td class="font-mono text-xs text-gray-400">{{ item.source || '—' }}</td>
              <td class="max-w-sm">
                <div class="space-y-0.5">
                  <div v-for="(p, i) in item.payloads" :key="i" class="text-xs text-gray-600 flex items-baseline gap-1.5">
                    <span class="font-mono text-indigo-500 flex-shrink-0">{{ p.key }}:</span>
                    <span class="text-gray-700 truncate">{{ renderPayload(p.value) }}</span>
                    <span v-if="p.currency" class="text-gray-400">({{ p.currency }})</span>
                  </div>
                  <span v-if="!item.payloads?.length" class="text-gray-300 text-xs">—</span>
                </div>
              </td>
              <td>
                <div class="flex items-center gap-1">
                  <button class="btn btn-ghost btn-sm text-xs text-gray-500">
                    <Icon icon="lucide:eye" class="text-xs" />
                    View
                  </button>
                  <button class="btn btn-ghost btn-sm text-xs text-gray-500">
                    <Icon icon="lucide:rotate-cw" class="text-xs" />
                    Replay
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="7" class="text-center py-12 text-gray-400 text-sm">No log entries found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-4 py-3 border-t border-gray-100">
        <p class="text-xs text-gray-400">Showing <b class="text-gray-600">{{ filtered.length }}</b> log entries</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'

interface LogRecord {
  id: number
  date_created: string
  payloads: { key: string; value: any; currency?: string }[]
  source?: string
  title?: string
}

const items = ref<LogRecord[]>([])

const search = ref('')

const filtered = computed(() => {
  if (!search.value) return items.value
  const q = search.value.toLowerCase()
  return items.value.filter((item) =>
    item.title?.toLowerCase().includes(q) || item.source?.toLowerCase().includes(q)
  )
})

function formatDate(iso?: string) {
  if (!iso) return '—'
  try { return new Date(iso).toLocaleString() } catch { return iso }
}

function renderPayload(value: any): string {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value)
  try {
    const s = JSON.stringify(value)
    return s.length > 80 ? s.slice(0, 77) + '...' : s
  } catch {
    return String(value)
  }
}
</script>
