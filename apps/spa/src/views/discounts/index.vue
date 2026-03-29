<template>
  <AppLayout>
    <div class="flex items-start justify-between mb-6">
      <PageHeader title="Discounts" subtitle="Manage all discount codes" />
      <Button label="Add" icon="pi pi-plus" size="small" @click="drawerOpen = true" />
    </div>

    <!-- Discount list -->
    <div v-if="discounts.length > 0" class="space-y-2">
      <div
        v-for="discount in discounts"
        :key="discount.id"
        class="card flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-center gap-3 cursor-pointer" @click="openDetail(discount)">
          <div>
            <p class="text-sm font-medium text-gray-900">{{ discount.name }}</p>
            <p class="text-xs text-gray-400 mt-0.5">
              {{ discount.type === 'fixed' ? `${discount.currency?.toUpperCase()} ${(discount.amount / 100).toFixed(2)}` : `${discount.amount}%` }}
              &middot; {{ discount.duration }}
              <span v-if="discount.code" class="font-mono ml-1 text-indigo-500">{{ discount.code }}</span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <Button icon="pi pi-eye" text size="small" severity="secondary" @click.stop="openDetail(discount)" />
          <Button icon="pi pi-pencil" text size="small" severity="secondary" @click.stop="openUpdate(discount)" />
          <Button icon="pi pi-trash" text size="small" severity="danger" :loading="deletingId === discount.id" @click.stop="handleDelete(discount.id)" />
        </div>
      </div>
    </div>

    <div v-else-if="!loading" class="card p-8 text-center text-sm text-gray-400">
      No discounts found. Click "Add" to create one.
    </div>

    <div v-else class="card p-8 text-center text-sm text-gray-400">
      Loading…
    </div>

    <!-- Detail modal -->
    <Dialog
      v-model:visible="detailVisible"
      modal
      header="Discount Detail"
      :style="{ width: '480px' }"
      :draggable="false"
    >
      <div v-if="selectedDiscount" class="space-y-3 text-sm">
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-gray-500">ID</span>
          <span class="font-mono text-xs text-gray-700">{{ selectedDiscount.id }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-gray-500">Name</span>
          <span class="font-medium">{{ selectedDiscount.name }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-gray-500">Code</span>
          <span class="font-mono text-indigo-500">{{ selectedDiscount.code ?? '—' }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-gray-500">Type</span>
          <span class="capitalize">{{ selectedDiscount.type }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-gray-500">Amount</span>
          <span>{{ selectedDiscount.type === 'fixed' ? `${selectedDiscount.currency?.toUpperCase()} ${(selectedDiscount.amount / 100).toFixed(2)}` : `${selectedDiscount.amount}%` }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-gray-500">Duration</span>
          <span class="capitalize">{{ selectedDiscount.duration }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-gray-500">Redemptions</span>
          <span>{{ selectedDiscount.redemptions_count ?? 0 }} / {{ selectedDiscount.max_redemptions ?? '∞' }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-gray-500">Starts</span>
          <span>{{ selectedDiscount.starts_at ? new Date(selectedDiscount.starts_at).toLocaleDateString() : '—' }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="text-gray-500">Ends</span>
          <span>{{ selectedDiscount.ends_at ? new Date(selectedDiscount.ends_at).toLocaleDateString() : '—' }}</span>
        </div>
      </div>
      <template #footer>
        <Button label="Close" severity="secondary" size="small" @click="detailVisible = false" />
        <Button label="Edit" icon="pi pi-pencil" size="small" @click="openUpdateFromDetail" />
      </template>
    </Dialog>

    <!-- Add / Update drawer -->
    <Drawer
      v-model:visible="drawerOpen"
      :header="editingId ? 'Update Discount' : 'Add Discount'"
      position="right"
      :style="{ width: '400px', fontSize: '14px' }"
    >
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Name <span class="text-red-500">*</span></label>
          <InputText v-model="form.name" class="w-full" placeholder="Summer Sale" />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Promo Code</label>
          <InputText v-model="form.code" class="w-full" placeholder="SUMMER20" />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Type <span class="text-red-500">*</span></label>
          <Select v-model="form.type" :options="typeOptions" option-label="label" option-value="value" class="w-full" />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Amount <span class="text-gray-400 font-normal">({{ form.type === 'fixed' ? 'in cents' : '%' }})</span>
            <span class="text-red-500">*</span>
          </label>
          <InputText v-model="form.amount" class="w-full" placeholder="2000" type="number" />
        </div>

        <div v-if="form.type === 'fixed'">
          <label class="block text-xs font-medium text-gray-700 mb-1">Currency <span class="text-red-500">*</span></label>
          <Select v-model="form.currency" :options="currencyOptions" option-label="label" option-value="value" class="w-full" />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Duration <span class="text-red-500">*</span></label>
          <Select v-model="form.duration" :options="durationOptions" option-label="label" option-value="value" class="w-full" />
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Button label="Cancel" severity="secondary" size="small" type="button" @click="closeDrawer" />
          <Button :label="editingId ? 'Update' : 'Save'" size="small" type="submit" :loading="isSubmitting" />
        </div>
      </form>
    </Drawer>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Drawer from 'primevue/drawer'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { PAYEXTEND_BASE_URL } from '@/constant'

interface Discount {
  id: string
  name: string
  code?: string
  type: string
  amount: number
  currency?: string
  duration: string
  redemptions_count?: number
  max_redemptions?: number
  starts_at?: string
  ends_at?: string
}

const discounts = ref<Discount[]>([])
const loading = ref(true)
const selectedDiscount = ref<Discount | null>(null)
const detailVisible = ref(false)
const drawerOpen = ref(false)
const isSubmitting = ref(false)
const deletingId = ref<string | null>(null)
const editingId = ref<string | null>(null)

const form = reactive({
  name: '',
  code: '',
  type: 'fixed',
  amount: '',
  currency: 'usd',
  duration: 'once',
})

const typeOptions = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'Percentage', value: 'percentage' },
]

const currencyOptions = [
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' },
]

const durationOptions = [
  { label: 'Once', value: 'once' },
  { label: 'Repeating', value: 'repeating' },
  { label: 'Forever', value: 'forever' },
]

onMounted(fetchDiscounts)

async function fetchDiscounts() {
  loading.value = true
  try {
    const res = await fetch(`${PAYEXTEND_BASE_URL}polar/discounts`)
    if (res.ok) {
      const data = await res.json()
      discounts.value = data?.items ?? data ?? []
    }
  } catch (e) {
    console.error('Failed to fetch discounts:', e)
  } finally {
    loading.value = false
  }
}

function openDetail(discount: Discount) {
  selectedDiscount.value = discount
  detailVisible.value = true
}

function openUpdateFromDetail() {
  if (selectedDiscount.value) {
    detailVisible.value = false
    openUpdate(selectedDiscount.value)
  }
}

function openUpdate(discount: Discount) {
  editingId.value = discount.id
  form.name = discount.name
  form.code = discount.code ?? ''
  form.type = discount.type
  form.amount = String(discount.amount)
  form.currency = discount.currency ?? 'usd'
  form.duration = discount.duration
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
  editingId.value = null
  Object.assign(form, { name: '', code: '', type: 'fixed', amount: '', currency: 'usd', duration: 'once' })
}

async function handleSubmit() {
  if (!form.name || !form.amount) return
  isSubmitting.value = true
  try {
    const payload: Record<string, unknown> = {
      name: form.name,
      type: form.type,
      amount: Number(form.amount),
      duration: form.duration,
      ...(form.code && { code: form.code }),
      ...(form.type === 'fixed' && { currency: form.currency }),
    }

    if (editingId.value) {
      const res = await fetch(`${PAYEXTEND_BASE_URL}polar/discounts/${editingId.value}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) { await fetchDiscounts(); closeDrawer() }
    } else {
      const res = await fetch(`${PAYEXTEND_BASE_URL}polar/discounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) { await fetchDiscounts(); closeDrawer() }
    }
  } catch (e) {
    console.error('Failed to save discount:', e)
  } finally {
    isSubmitting.value = false
  }
}

async function handleDelete(id: string) {
  deletingId.value = id
  try {
    const res = await fetch(`${PAYEXTEND_BASE_URL}polar/discounts/${id}`, { method: 'DELETE' })
    if (res.ok) await fetchDiscounts()
  } catch (e) {
    console.error('Failed to delete discount:', e)
  } finally {
    deletingId.value = null
  }
}
</script>
