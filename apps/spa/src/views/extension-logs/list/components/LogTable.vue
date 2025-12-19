<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="overflow-hidden">
          <table class="min-w-full divide-y divide-default-200">
            <thead class="bg-default-150">
              <tr class="text-sm font-normal text-default-700 whitespace-nowrap">
                <th class="ps-4 text-start">
                  <input id="checkbox-all" type="checkbox" class="form-checkbox" />
                </th>
                <th scope="col" class="px-3.5 py-3 text-start">ID</th>
                <th scope="col" class="px-3.5 py-3 text-start">Date</th>
                <th scope="col" class="px-3.5 py-3 text-start">Title</th>
                <th scope="col" class="px-3.5 py-3 text-start">Source</th>
                <th scope="col" class="px-3.5 py-3 text-start">Payloads</th>
                <th scope="col" class="px-3.5 py-3 text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-default-800 font-normal text-sm whitespace-nowrap" v-for="(item, idx) in items" :key="item.id">
                <td class="px-4 py-3">
                  <input type="checkbox" class="form-checkbox" />
                </td>
                <td class="px-3.5 py-3 text-sm text-primary">{{ item.id }}</td>
                <td class="py-3 px-3.5">{{ formatDate(item.date_created) }}</td>
                <td class="py-3 px-3.5 font-medium">{{ item.title || '—' }}</td>
                <td class="py-3 px-3.5 font-mono text-xs" :title="item.source">{{ item.source || '—' }}</td>
                <td class="py-3 px-3.5 max-w-[420px] truncate">
                  <div class="flex flex-col gap-1">
                    <div v-for="(p, i) in item.payloads" :key="i" class="text-xs text-default-600">
                      <span class="font-mono text-xs">{{ p.key }}:</span>
                      <span class="ms-2">{{ renderPayload(p.value) }}</span>
                      <span v-if="p.currency" class="ms-2 text-default-500">({{ p.currency }})</span>
                    </div>
                    <div v-if="!item.payloads || item.payloads.length === 0" class="text-default-500">—</div>
                  </div>
                </td>
                <td class="px-3.5 py-3">
                  <div class="hs-dropdown relative inline-flex">
                    <button type="button" class="hs-dropdown-toggle btn size-7.5 bg-default-200 hover:bg-default-600 text-default-500" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown" hs-dropdown-placement="bottom-end">
                      <Icon icon="lucide:ellipsis" class="iconify size-4"></Icon>
                    </button>
                    <div class="hs-dropdown-menu" role="menu">
                      <RouterLink class="flex items-center gap-1.5 py-1.5 font-medium px-3 text-default-500 hover:bg-default-150 rounded" :to="`/extension-logs/${item.id}`">
                        <Icon icon="lucide:eye" class="size-3"></Icon>
                        View
                      </RouterLink>
                      <RouterLink class="flex items-center gap-1.5 py-1.5 font-medium px-3 text-default-500 hover:bg-default-150 rounded" :to="`/extension-logs/${item.id}/replay`">
                        <Icon icon="lucide:rotate-cw" class="size-3"></Icon>
                        Replay
                      </RouterLink>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <p class="text-default-500 text-sm">Showing <b>{{ items.length }}</b> Results</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

type Payload = { key: string; value: any; currency?: string }

interface LogRecord {
  id: number
  date_created: string
  payloads: Payload[]
  source?: string
  title?: string
}

defineProps<{ items: LogRecord[] }>()

function formatDate(iso?: string) {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch (e) {
    return iso
  }
}

function renderPayload(value: any) {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value)
  try {
    const s = JSON.stringify(value)
    // truncate long JSON
    return s.length > 80 ? s.slice(0, 77) + '...' : s
  } catch (e) {
    return String(value)
  }
}
</script>

