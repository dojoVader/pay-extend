<template>
  <Vertical>
    <PageTitle subtitle="Extension" title="Logs" />
    <div class="card px-2 py-4">
      <div class="card-header">
        <div class="flex flex-col gap-1">
          <h6 class="card-title ">Logs</h6>
          <small>View Payload events for your extensions</small>
        </div>

        <!-- Add button removed: this view now shows extension logs -->
      </div>
      <StatusFilterHeader />
      <LogTable :items="items" />
    </div>
  </Vertical>
</template>

<script setup lang="ts">
import PageTitle from "@/components/PageTitle.vue";
import Vertical from "@/layouts/vertical.vue";
import StatusFilterHeader from "./components/StatusFilterHeader.vue";
import LogTable from "./components/LogTable.vue";
import { ref } from 'vue'

interface LogRecord {
  id: number
  date_created: string
  // payloads coming from the extension; allow any so we can display raw JSON
  payloads: any[]
  source?: string
  title?: string
}

const items = ref<LogRecord[]>([
  {
    id: 1,
    date_created: '2025-12-09T10:22:00Z',
    title: 'Checkout totals captured',
    source: 'content-script.js',
    payloads: [
      { key: 'checkout.total', value: '$123.45', currency: 'USD' }
    ]
  },
  {
    id: 2,
    date_created: '2025-12-09T10:30:15Z',
    title: 'Cart items',
    source: 'content-script.js',
    payloads: [
      { key: 'cart.items', value: [{ name: 'T-Shirt', qty: 2 }, { name: 'Socks', qty: 3 }] }
    ]
  },
  {
    id: 3,
    date_created: '2025-12-08T18:05:00Z',
    title: 'Customer email found',
    source: 'content-script.js',
    payloads: [
      { key: 'customer.email', value: 'alice@example.com' }
    ]
  },
  {
    id: 4,
    date_created: '2025-12-07T09:11:44Z',
    title: 'Ad banner detected',
    source: 'content-script.js',
    payloads: [
      { key: 'ad.banner', value: { adId: 'ad_987', visible: true } }
    ]
  }
])
</script>
