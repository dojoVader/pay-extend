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
                <th scope="col" class="px-3.5 py-3 text-start">Extension</th>
                <th scope="col" class="px-3.5 py-3 text-start">Description</th>
                <th scope="col" class="px-3.5 py-3 text-start">Status</th>
                <th scope="col" class="px-3.5 py-3 text-start">Public Key</th>
                <th scope="col" class="px-3.5 py-3 text-start">Created</th>
                <th scope="col" class="px-3.5 py-3 text-start">Updated</th>
                <th scope="col" class="px-3.5 py-3 text-start">Active</th>
                <th scope="col" class="px-3.5 py-3 text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-default-800 font-normal text-sm whitespace-nowrap" v-for="(item, idx) in extensions" :key="idx">
                <td class="px-4 py-3">
                  <input id="checkbox-all" type="checkbox" class="form-checkbox" />
                </td>
                <td class="px-3.5 py-3 text-sm text-primary">{{ item.id }}</td>
                <td class="flex py-3 px-3.5 items-center gap-3">
                  <div class="size-10 rounded bg-default-200 overflow-hidden flex items-center justify-center">
                    <img v-if="item.extensionLogo" :src="item.extensionLogo" alt="logo" class="h-10 w-10 object-cover" />
                    <div v-else class="w-10 h-10 flex items-center justify-center rounded bg-default-200 font-semibold uppercase">
                      {{ item.extensionName?.substring(0, 2) }}
                    </div>
                  </div>
                  <div>
                    <h6 class="mb-1.5 font-semibold">
                      <RouterLink to="" class="text-default-800">{{ item.extensionName }}</RouterLink>
                    </h6>
                    <p class="text-default-500 text-xs">{{ item.extensionItemId }}</p>
                  </div>
                </td>
                <td class="py-3 px-3.5 max-w-[320px] truncate" :title="item.extensionDescription">{{ item.extensionDescription }}</td>
                <td class="px-3.5 py-3">
                  <span class="py-0.5 px-2.5 inline-flex items-center capitalize gap-x-1 text-xs font-medium rounded p-2" :class="item.variant">
                    <Icon icon="lucide:check-circle-2" class="size-3"></Icon>
                    {{ item.status[0].toUpperCase() + item.status.slice(1) }}
                  </span>
                </td>
                <td class="py-3 px-3.5 font-mono text-xs truncate max-w-[220px]" :title="item.publicKey">{{ item.publicKey }}</td>
                <td class="py-3 px-3.5">{{ item.createdAt }}</td>
                <td class="py-3 px-3.5">{{ item.updatedAt }}</td>
                <td class="py-3 px-3.5">
                  <span class="py-0.5 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded" :class="item.active ? 'bg-success/10 text-success' : 'bg-default-200 text-default-600'">
                    <span class="inline-block size-1.5 rounded-full" :class="item.active ? 'bg-success' : 'bg-default-500'"></span>
                    {{ item.active ? 'Yes' : 'No' }}
                  </span>
                </td>
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

type StatusVariant = 'bg-success/10 text-success' | 'bg-default-200 text-default-600' | 'bg-danger/10 text-danger'

interface ExtensionContextRow {
  id: number
  extensionItemId: string
  extensionName: string
  extensionDescription: string
  status: string
  publicKey: string
  extensionLogo?: string
  createdAt: string
  updatedAt: string
  active: boolean
  variant: StatusVariant
}

const extensions: ExtensionContextRow[] = [
  {
    id: 1,
    extensionItemId: 'store-abc-001',
    extensionName: 'Fraud Shield',
    extensionDescription: 'Real-time fraud detection and risk scoring for payments.',
    status: 'approved',
    publicKey: 'pk_live_7f3b...a9d2',
    extensionLogo: 'https://dummyimage.com/80x80/efefef/aaa.png&text=FS',
    createdAt: '2025-10-05 14:22',
    updatedAt: '2025-11-12 09:10',
    active: true,
    variant: 'bg-success/10 text-success'
  },
  {
    id: 2,
    extensionItemId: 'store-xyz-902',
    extensionName: 'Tax Calculator',
    extensionDescription: 'Calculates regional taxes and applies them at checkout.',
    status: 'pending',
    publicKey: 'pk_test_9de1...22ff',
    extensionLogo: 'https://dummyimage.com/80x80/efefef/aaa.png&text=TX',
    createdAt: '2025-09-21 08:01',
    updatedAt: '2025-10-01 12:45',
    active: true,
    variant: 'bg-default-200 text-default-600'
  },
  {
    id: 3,
    extensionItemId: 'store-qwe-777',
    extensionName: 'Legacy Exporter',
    extensionDescription: 'Exports transactions to legacy ERP in CSV format.',
    status: 'disabled',
    publicKey: 'pk_live_11aa...bb33',
    extensionLogo: 'https://dummyimage.com/80x80/efefef/aaa.png&text=LE',
    createdAt: '2025-06-10 10:00',
    updatedAt: '2025-11-30 16:30',
    active: false,
    variant: 'bg-default-200 text-default-600'
  },
  {
    id: 4,
    extensionItemId: 'store-rej-404',
    extensionName: 'Ad Injector',
    extensionDescription: 'Injects ads into receipts (rejected for policy violations).',
    status: 'rejected',
    publicKey: 'pk_live_dead...beef',
    extensionLogo: 'https://dummyimage.com/80x80/efefef/aaa.png&text=AI',
    createdAt: '2025-03-11 11:11',
    updatedAt: '2025-03-20 14:33',
    active: false,
    variant: 'bg-danger/10 text-danger'
  }
]
</script>
