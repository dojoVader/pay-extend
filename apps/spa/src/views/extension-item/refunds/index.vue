<template>
  <!-- Header -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-sm font-semibold text-gray-900">Refunds</h3>
    <Button label="Add" icon="pi pi-plus" size="small" @click="drawerOpen = true" />
  </div>

  <!-- List -->
  <div v-if="refunds.length > 0" class="space-y-2">
    <div
      v-for="refund in refunds"
      :key="refund.id"
      class="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      @click="openDetail(refund)"
    >
      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <p class="text-sm font-medium text-gray-900 font-mono">{{ refund.id }}</p>
          <span
            class="shrink-0 text-[10px] px-1.5 py-0.5 rounded font-medium capitalize"
            :class="statusClass(refund.status)"
          >
            {{ refund.status ?? 'pending' }}
          </span>
        </div>
        <p class="text-xs text-gray-400 mt-0.5">
          Order <span class="font-mono">{{ refund.order_id }}</span>
          <span v-if="refund.amount" class="ml-2">
            · {{ refund.currency?.toUpperCase() }} {{ (refund.amount / 100).toFixed(2) }}
          </span>
          <span v-if="refund.reason" class="ml-2 capitalize">· {{ refund.reason.replace(/_/g, ' ') }}</span>
        </p>
      </div>
      <div class="flex items-center gap-3 shrink-0 ml-4">
        <span class="text-xs text-gray-400">{{ formatDate(refund.created_at) }}</span>
        <Button icon="pi pi-eye" text size="small" severity="secondary" @click.stop="openDetail(refund)" />
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="card p-6 text-center text-sm text-gray-400">
    Loading refunds…
  </div>

  <div v-else class="card p-6 text-center">
    <p class="text-sm text-gray-400">No refunds on record for this extension.</p>
  </div>

  <!-- Detail modal -->
  <Dialog
    v-model:visible="detailVisible"
    modal
    header="Refund Detail"
    :style="{ width: '480px' }"
    :draggable="false"
  >
    <div v-if="selectedRefund" class="space-y-1 text-sm">
      <div class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">ID</span>
        <span class="font-mono text-xs text-gray-700">{{ selectedRefund.id }}</span>
      </div>
      <div class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Status</span>
        <span
          class="text-xs px-2 py-0.5 rounded font-medium capitalize"
          :class="statusClass(selectedRefund.status)"
        >
          {{ selectedRefund.status ?? 'pending' }}
        </span>
      </div>
      <div class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Order ID</span>
        <span class="font-mono text-xs text-gray-700">{{ selectedRefund.order_id }}</span>
      </div>
      <div v-if="selectedRefund.amount" class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Amount</span>
        <span>{{ selectedRefund.currency?.toUpperCase() }} {{ (selectedRefund.amount / 100).toFixed(2) }}</span>
      </div>
      <div v-if="selectedRefund.reason" class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Reason</span>
        <span class="capitalize">{{ selectedRefund.reason.replace(/_/g, ' ') }}</span>
      </div>
      <div class="flex justify-between py-2">
        <span class="text-gray-500">Created</span>
        <span>{{ formatDate(selectedRefund.created_at) }}</span>
      </div>
    </div>
    <template #footer>
      <Button label="Close" severity="secondary" size="small" @click="detailVisible = false" />
    </template>
  </Dialog>

  <!-- Add refund drawer -->
  <Drawer
    v-model:visible="drawerOpen"
    header="Issue Refund"
    position="right"
    :style="{ width: '420px', fontSize: '14px' }"
  >
    <form class="space-y-4" @submit.prevent="openConfirm">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Order ID <span class="text-red-500">*</span></label>
        <InputText v-model="form.orderId" class="w-full" placeholder="order_…" />
        <p class="text-[11px] text-gray-400 mt-1">The Polar order ID to refund.</p>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">
          Amount <span class="text-gray-400 font-normal">(in cents, leave blank for full refund)</span>
        </label>
        <InputText v-model="form.amount" class="w-full" placeholder="1000" type="number" />
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Reason</label>
        <Select
          v-model="form.reason"
          :options="reasonOptions"
          option-label="label"
          option-value="value"
          placeholder="Select a reason…"
          class="w-full"
        />
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <Button label="Cancel" severity="secondary" size="small" type="button" @click="closeDrawer" />
        <Button label="Review & Confirm" icon="pi pi-arrow-right" icon-pos="right" size="small" type="submit" severity="danger" />
      </div>
    </form>
  </Drawer>

  <!-- Confirmation dialog -->
  <Dialog
    v-model:visible="confirmVisible"
    modal
    header="Confirm Refund"
    :style="{ width: '420px' }"
    :draggable="false"
  >
    <div class="space-y-3 text-sm">
      <div class="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
        <i class="pi pi-exclamation-triangle text-red-500 mt-0.5" />
        <p class="text-red-700 text-xs leading-relaxed">
          This action will issue a refund on Polar and cannot be undone. Please review the details below before confirming.
        </p>
      </div>
      <div class="space-y-2 pt-1">
        <div class="flex justify-between py-1.5 border-b border-gray-100">
          <span class="text-gray-500">Order ID</span>
          <span class="font-mono text-xs">{{ form.orderId }}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-gray-100">
          <span class="text-gray-500">Amount</span>
          <span>{{ form.amount ? `${Number(form.amount)} cents` : 'Full refund' }}</span>
        </div>
        <div class="flex justify-between py-1.5">
          <span class="text-gray-500">Reason</span>
          <span class="capitalize">{{ form.reason ? form.reason.replace(/_/g, ' ') : '—' }}</span>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" severity="secondary" size="small" @click="confirmVisible = false" />
      <Button label="Issue Refund" severity="danger" size="small" :loading="isSubmitting" @click="handleSubmit" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Drawer from 'primevue/drawer'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { PAYEXTEND_BASE_URL } from '@/constant'

interface Refund {
  id: string
  created_at: string
  order_id: string
  amount?: number
  currency?: string
  reason?: string
  status?: string
}

const props = defineProps<{ extensionId?: string }>()

const refunds = ref<Refund[]>([])
const loading = ref(true)
const selectedRefund = ref<Refund | null>(null)
const detailVisible = ref(false)
const drawerOpen = ref(false)
const confirmVisible = ref(false)
const isSubmitting = ref(false)

const form = reactive({
  orderId: '',
  amount: '',
  reason: '',
})

const reasonOptions = [
  { label: 'Customer Request', value: 'customer_request' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Fraudulent', value: 'fraudulent' },
  { label: 'Service Disruption', value: 'service_disruption' },
  { label: 'Satisfaction Guarantee', value: 'satisfaction_guarantee' },
  { label: 'Other', value: 'other' },
]

onMounted(fetchRefunds)
watch(() => props.extensionId, fetchRefunds)

async function fetchRefunds() {
  if (!props.extensionId) return
  loading.value = true
  try {
    const res = await fetch(`${PAYEXTEND_BASE_URL}polar/refunds/extension/${props.extensionId}`)
    if (res.ok) {
      const data = await res.json()
      refunds.value = data?.items ?? data ?? []
    }
  } catch (e) {
    console.error('Failed to fetch refunds:', e)
  } finally {
    loading.value = false
  }
}

function openDetail(refund: Refund) {
  selectedRefund.value = refund
  detailVisible.value = true
}

function openConfirm() {
  if (!form.orderId.trim()) return
  drawerOpen.value = false
  confirmVisible.value = true
}

function closeDrawer() {
  drawerOpen.value = false
  Object.assign(form, { orderId: '', amount: '', reason: '' })
}

async function handleSubmit() {
  isSubmitting.value = true
  try {
    const payload: Record<string, unknown> = {
      orderId: form.orderId,
      extensionId: props.extensionId,
      ...(form.amount && { amount: Number(form.amount) }),
      ...(form.reason && { reason: form.reason }),
    }
    const res = await fetch(`${PAYEXTEND_BASE_URL}polar/refunds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      confirmVisible.value = false
      Object.assign(form, { orderId: '', amount: '', reason: '' })
      await fetchRefunds()
    }
  } catch (e) {
    console.error('Failed to issue refund:', e)
  } finally {
    isSubmitting.value = false
  }
}

function formatDate(iso?: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function statusClass(status?: string): string {
  const map: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    succeeded: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    canceled: 'bg-gray-100 text-gray-500',
  }
  return map[status ?? ''] ?? 'bg-gray-100 text-gray-500'
}
</script>

<style>
:root {
  .p-inputtext, .p-select-label {
    font-size: 12px;
  }
}
</style>
