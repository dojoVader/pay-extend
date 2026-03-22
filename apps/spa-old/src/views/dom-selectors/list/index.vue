<template>
  <Vertical>
    <PageTitle subtitle="Extension" title="DOM Selectors" />
    <div class="card px-2 py-4">
      <div class="card-header">
        <div class="flex flex-col gap-1">
          <h6 class="card-title ">DOM Selector List</h6>
          <small>The following are selectors managed by Payextend</small>
        </div>

        <button class="btn btn-sm bg-primary text-white" aria-haspopup="dialog"
                aria-expanded="false" aria-controls="drawerEnd" data-hs-overlay="#drawerEnd">
          <Icon icon="lucide:plus" class="size-4 me-1"></Icon>
          Add Selector
        </button>
      </div>
      <StatusFilterHeader />
      <DomSelectorTable :items="items" />
    </div>
    <div id="drawerEnd"
         class="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-2xl z-80 bg-card border-e border-default-200"
         role="dialog" tabindex="-1" aria-labelledby="drawerEnd-label">
      <DOMSelectorAdd @save="onSave" @cancel="onCancel" />
    </div>
  </Vertical>
</template>

<script setup lang="ts">
import PageTitle from "@/components/PageTitle.vue";
import Vertical from "@/layouts/vertical.vue";
import StatusFilterHeader from "./components/StatusFilterHeader.vue";
import DomSelectorTable from "./components/DOMSelectorTable.vue";
import { Icon } from "@iconify/vue";
import DOMSelectorAdd from "@/views/dom-selectors/list/components/DOMSelectorAdd.vue";
import { ref } from 'vue'

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

const items = ref<DomSelectorRow[]>([
  {
    id: 1,
    extensionContextId: 101,
    key: 'checkout.total',
    selector: '#checkout .order-summary .total .amount',
    fallbacks: ['.total-amount', '.sum .amount:last-child'],
    multipleStrategy: 'first',
    attribute: 'textContent',
    description: 'Extracts the final payable total on the checkout page.',
    version: 3,
    isActive: true,
    createdAt: '2025-10-05 14:22',
    updatedAt: '2025-11-12 09:10'
  },
  {
    id: 2,
    extensionContextId: 101,
    key: 'cart.item.name',
    selector: '.cart-items .item .name',
    fallbacks: [],
    multipleStrategy: 'all',
    attribute: 'textContent',
    description: 'Gets the names of all items in the cart list.',
    version: 1,
    isActive: true,
    createdAt: '2025-09-21 08:01',
    updatedAt: '2025-10-01 12:45'
  },
  {
    id: 3,
    extensionContextId: 202,
    key: 'customer.email',
    selector: 'input[type="email"][name="customer[email]"]',
    fallbacks: ['#email', 'input.email'],
    multipleStrategy: 'first',
    attribute: 'value',
    description: 'Email field on customer details form.',
    version: 2,
    isActive: false,
    createdAt: '2025-06-10 10:00',
    updatedAt: '2025-11-30 16:30'
  },
  {
    id: 4,
    extensionContextId: 303,
    key: 'receipt.ad-banner',
    selector: '.receipt .ad-banner',
    fallbacks: ['.receipt [data-ad]'],
    multipleStrategy: 'first',
    attribute: null,
    description: 'Target promotional banner on receipt for analytics.',
    version: 4,
    isActive: false,
    createdAt: '2025-03-11 11:11',
    updatedAt: '2025-03-20 14:33'
  }
])

function onSave(payload: {
  extensionContextId: number
  key: string
  selector: string
  fallbacks: string[]
  multipleStrategy: MultipleStrategy
  attribute?: string | null
  description?: string | null
  isActive: boolean
}) {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
  const nextId = (items.value.reduce((max, it) => Math.max(max, it.id), 0) || 0) + 1
  const row: DomSelectorRow = {
    id: nextId,
    extensionContextId: payload.extensionContextId,
    key: payload.key,
    selector: payload.selector,
    fallbacks: payload.fallbacks,
    multipleStrategy: payload.multipleStrategy,
    attribute: payload.attribute ?? null,
    description: payload.description ?? null,
    version: 1,
    isActive: payload.isActive,
    createdAt: ts,
    updatedAt: ts,
  }
  items.value = [row, ...items.value]
}

function onCancel() {
  // eslint-disable-next-line no-console
  console.log('Add selector cancelled')
}
</script>
