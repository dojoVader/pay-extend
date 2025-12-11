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
                <th scope="col" class="px-3.5 py-3 text-start">Key</th>
                <th scope="col" class="px-3.5 py-3 text-start">Extension Context</th>
                <th scope="col" class="px-3.5 py-3 text-start">Selector</th>
                <th scope="col" class="px-3.5 py-3 text-start">Fallbacks</th>
                <th scope="col" class="px-3.5 py-3 text-start">Active</th>
                <th scope="col" class="px-3.5 py-3 text-start">Created</th>
                <th scope="col" class="px-3.5 py-3 text-start">Updated</th>
                <th scope="col" class="px-3.5 py-3 text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-default-800 font-normal text-sm whitespace-nowrap" v-for="(item, idx) in items" :key="idx">
                <td class="px-4 py-3">
                  <input id="checkbox-all" type="checkbox" class="form-checkbox" />
                </td>
                <td class="px-3.5 py-3 text-sm text-primary">{{ item.id }}</td>
                <td class="py-3 px-3.5 font-mono text-xs" :title="item.key">{{ item.key }}</td>
                <td class="py-3 px-3.5">{{ item.extensionContextId }}</td>
                <td class="py-3 px-3.5 font-mono text-xs truncate max-w-[280px]" :title="item.selector">{{ item.selector }}</td>
                <td class="py-3 px-3.5 max-w-[240px] truncate" :title="item.fallbacks.join(', ')">{{ item.fallbacks.length ? item.fallbacks.join(', ') : '—' }}</td>
                <td class="py-3 px-3.5">
                  <span class="py-0.5 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded" :class="item.isActive ? 'bg-success/10 text-success' : 'bg-default-200 text-default-600'">
                    <span class="inline-block size-1.5 rounded-full" :class="item.isActive ? 'bg-success' : 'bg-default-500'"></span>
                    {{ item.isActive ? 'Yes' : 'No' }}
                  </span>
                </td>

                <td class="py-3 px-3.5">{{ item.createdAt }}</td>
                <td class="py-3 px-3.5">{{ item.updatedAt }}</td>
                <td class="px-3.5 py-3">
                  <div class="hs-dropdown relative inline-flex">
                    <button type="button" class="hs-dropdown-toggle btn size-7.5 bg-default-200 hover:bg-default-600 text-default-500" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown" hs-dropdown-placement="bottom-end">
                      <Icon icon="lucide:ellipsis" class="iconify size-4"></Icon>
                    </button>
                    <div class="hs-dropdown-menu" role="menu">
                      <RouterLink class="flex items-center gap-1.5 py-1.5 font-medium px-3 text-default-500 hover:bg-default-150 rounded" to="">
                        <Icon icon="lucide:eye" class="size-3"></Icon>
                        Overview
                      </RouterLink>
                      <RouterLink class="flex items-center gap-1.5 py-1.5 font-medium px-3 text-default-500 hover:bg-default-150 rounded" to="">
                        <Icon icon="lucide:edit" class="size-3"></Icon>
                        Edit
                      </RouterLink>
                      <RouterLink class="flex items-center gap-1.5 py-1.5 font-medium px-3 text-default-500 hover:bg-default-150 rounded" to="">
                        <Icon icon="lucide:trash-2" class="size-3"></Icon>
                        Delete
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
      <p class="text-default-500 text-sm">Showing <b>10</b> of <b>58</b> Results</p>
      <nav class="flex items-center gap-2" aria-label="Pagination">
        <button type="button" class="btn btn-sm border bg-transparent border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10"><Icon icon="lucide:chevron-left" class="size-4 me-1"></Icon> Prev</button>
        <button type="button" class="btn size-7.5 bg-transparent border border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10">1</button>
        <button type="button" class="btn size-7.5 bg-primary text-white">2</button>
        <button type="button" class="btn size-7.5 bg-transparent border border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10">3</button>
        <button type="button" class="btn btn-sm border bg-transparent border-default-200 text-default-600 hover:bg-primary/10 hover:text-primary hover:border-primary/10">
          Next
          <Icon icon="lucide:chevron-right" class="size-4 ms-1"></Icon>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

type MultipleStrategy = 'first' | 'last' | 'all'

interface DomSelectorRow {
  id: number
  extensionContextId: number
  key: string
  selector: string
  fallbacks: string[]
  multipleStrategy: MultipleStrategy
  attribute?: string | null
  description?: string | null
  version: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

defineProps<{ items: DomSelectorRow[] }>()
</script>
