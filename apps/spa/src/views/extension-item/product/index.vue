<template>
  <!-- Header -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-sm font-semibold text-gray-900">Products</h3>
    <Button label="Add" icon="pi pi-plus" size="small" @click="drawerOpen = true" />
  </div>

  <!-- Product list -->
  <div v-if="products.length > 0" class="space-y-2">
    <div
      v-for="product in products"
      :key="product.id"
      class="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div class="flex items-center gap-3 cursor-pointer" @click="openDetail(product)">
        <div>
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
            <span
              class="text-[10px] px-1.5 py-0.5 rounded font-medium"
              :class="product.is_archived ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'"
            >
              {{ product.is_archived ? 'Archived' : 'Active' }}
            </span>
            <span
              v-if="product.is_recurring"
              class="text-[10px] px-1.5 py-0.5 rounded font-medium bg-indigo-100 text-indigo-700"
            >
              Recurring
            </span>
          </div>
          <p class="text-xs text-gray-400 mt-0.5">
            {{ primaryPrice(product) }}
            <span v-if="product.description" class="ml-1 text-gray-300">&middot;</span>
            <span v-if="product.description" class="ml-1">{{ truncate(product.description, 60) }}</span>
          </p>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <Button icon="pi pi-eye" text size="small" severity="secondary" @click.stop="openDetail(product)" />
        <Button
          icon="pi pi-trash"
          text
          size="small"
          severity="danger"
          :loading="archivingId === product.id"
          :disabled="product.is_archived"
          @click.stop="handleArchive(product.id)"
        />
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="card p-6 text-center text-sm text-gray-400">
    Loading products…
  </div>

  <div v-else class="card p-6 text-center">
    <p class="text-sm text-gray-400">No products linked to this extension.</p>
  </div>

  <!-- Detail modal -->
  <Dialog
    v-model:visible="detailVisible"
    modal
    header="Product Detail"
    :style="{ width: '520px' }"
    :draggable="false"
  >
    <div v-if="selectedProduct" class="space-y-3 text-sm">
      <div class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">ID</span>
        <span class="font-mono text-xs text-gray-700">{{ selectedProduct.id }}</span>
      </div>
      <div class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Name</span>
        <span class="font-medium">{{ selectedProduct.name }}</span>
      </div>
      <div class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Status</span>
        <span
          class="text-xs px-2 py-0.5 rounded font-medium"
          :class="selectedProduct.is_archived ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'"
        >
          {{ selectedProduct.is_archived ? 'Archived' : 'Active' }}
        </span>
      </div>
      <div class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Type</span>
        <span>{{ selectedProduct.is_recurring ? 'Recurring' : 'One-time' }}</span>
      </div>
      <div v-if="selectedProduct.description" class="flex justify-between py-2 border-b border-gray-100">
        <span class="text-gray-500">Description</span>
        <span class="max-w-xs text-right text-gray-700">{{ selectedProduct.description }}</span>
      </div>
      <div class="py-2 border-b border-gray-100">
        <p class="text-gray-500 mb-2">Prices</p>
        <div v-if="selectedProduct.prices?.length" class="space-y-1">
          <div
            v-for="price in selectedProduct.prices"
            :key="price.id"
            class="flex justify-between text-xs bg-gray-50 px-3 py-2 rounded"
          >
            <span class="text-gray-600 capitalize">{{ price.type?.replace('_', ' ') }} · {{ price.recurring_interval ?? 'one-time' }}</span>
            <span class="font-medium">
              {{ price.amount_type === 'free' ? 'Free' : `${price.price_currency?.toUpperCase()} ${(price.price_amount / 100).toFixed(2)}` }}
            </span>
          </div>
        </div>
        <p v-else class="text-xs text-gray-400">No prices</p>
      </div>
      <div class="flex justify-between py-2">
        <span class="text-gray-500">Created</span>
        <span>{{ new Date(selectedProduct.created_at).toLocaleDateString() }}</span>
      </div>
    </div>
    <template #footer>
      <Button label="Close" severity="secondary" size="small" @click="detailVisible = false" />
    </template>
  </Dialog>

  <!-- Add product drawer -->
  <Drawer
    v-model:visible="drawerOpen"
    header="Add Product"
    position="right"
    :style="{ width: '480px', fontSize: '14px' }"
  >
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <!-- Full-width: Name -->
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Name <span class="text-red-500">*</span></label>
        <InputText v-model="form.name" class="w-full" placeholder="Pro Plan" />
      </div>

      <!-- Full-width: Description -->
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
        <InputText v-model="form.description" class="w-full" placeholder="Optional description" />
      </div>

      <!-- 2-col: Price Type + Amount Type -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Price Type <span class="text-red-500">*</span></label>
          <Select v-model="form.priceType" :options="priceTypeOptions" option-label="label" option-value="value" class="w-full" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Amount Type <span class="text-red-500">*</span></label>
          <Select v-model="form.amountType" :options="amountTypeOptions" option-label="label" option-value="value" class="w-full" />
        </div>
      </div>

      <!-- 2-col: Price + Currency (fixed only) -->
      <div v-if="form.amountType === 'fixed'" class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Price <span class="text-gray-400 font-normal">(cents)</span> <span class="text-red-500">*</span>
          </label>
          <InputText v-model="form.priceAmount" class="w-full" placeholder="999" type="number" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Currency <span class="text-red-500">*</span></label>
          <Select v-model="form.priceCurrency" :options="currencyOptions" option-label="label" option-value="value" class="w-full" />
        </div>
      </div>

      <!-- Billing Interval (recurring only, half-width) -->
      <div v-if="form.priceType === 'recurring'" class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Billing Interval <span class="text-red-500">*</span></label>
          <Select v-model="form.recurringInterval" :options="intervalOptions" option-label="label" option-value="value" class="w-full" />
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <Button label="Cancel" severity="secondary" size="small" type="button" @click="closeDrawer" />
        <Button label="Create" size="small" type="submit" :loading="isSubmitting" />
      </div>
    </form>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Drawer from 'primevue/drawer'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { PAYEXTEND_BASE_URL } from '@/constant'

interface ProductPrice {
  id: string
  type: string
  amount_type: string
  price_amount: number
  price_currency: string
  recurring_interval: string | null
  is_archived: boolean
}

interface Product {
  id: string
  name: string
  description: string | null
  is_archived: boolean
  is_recurring: boolean
  prices: ProductPrice[]
  created_at: string
}

const props = defineProps<{ extensionId?: string }>()

const products = ref<Product[]>([])
const loading = ref(true)
const selectedProduct = ref<Product | null>(null)
const detailVisible = ref(false)
const drawerOpen = ref(false)
const isSubmitting = ref(false)
const archivingId = ref<string | null>(null)

const form = reactive({
  name: '',
  description: '',
  priceType: 'one_time' as 'one_time' | 'recurring',
  amountType: 'fixed' as 'fixed' | 'free',
  priceAmount: '',
  priceCurrency: 'usd',
  recurringInterval: 'month' as 'month' | 'year',
})

const priceTypeOptions = [
  { label: 'One-time', value: 'one_time' },
  { label: 'Recurring', value: 'recurring' },
]

const amountTypeOptions = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'Free', value: 'free' },
]

const currencyOptions = [
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' },
]

const intervalOptions = [
  { label: 'Monthly', value: 'month' },
  { label: 'Yearly', value: 'year' },
]

onMounted(fetchProducts)
watch(() => props.extensionId, fetchProducts)

async function fetchProducts() {
  if (!props.extensionId) return
  loading.value = true
  try {
    const res = await fetch(`${PAYEXTEND_BASE_URL}polar/products/extension/${props.extensionId}`)
    if (res.ok) {
      const data = await res.json()
      products.value = data?.items ?? data ?? []
    }
  } catch (e) {
    console.error('Failed to fetch products:', e)
  } finally {
    loading.value = false
  }
}

function primaryPrice(product: Product): string {
  const price = product.prices?.find((p) => !p.is_archived) ?? product.prices?.[0]
  if (!price) return '—'
  if (price.amount_type === 'free') return 'Free'
  return `${price.price_currency?.toUpperCase()} ${(price.price_amount / 100).toFixed(2)}`
}

function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + '…' : str
}

function openDetail(product: Product) {
  selectedProduct.value = product
  detailVisible.value = true
}

function closeDrawer() {
  drawerOpen.value = false
  Object.assign(form, {
    name: '',
    description: '',
    priceType: 'one_time',
    amountType: 'fixed',
    priceAmount: '',
    priceCurrency: 'usd',
    recurringInterval: 'month',
  })
}

async function handleSubmit() {
  if (!form.name) return
  if (form.amountType === 'fixed' && !form.priceAmount) return
  isSubmitting.value = true
  try {
    const payload: Record<string, unknown> = {
      name: form.name,
      extensionId: props.extensionId,
      priceType: form.priceType,
      amountType: form.amountType,
      ...(form.description && { description: form.description }),
      ...(form.amountType === 'fixed' && {
        priceAmount: Number(form.priceAmount),
        priceCurrency: form.priceCurrency,
      }),
      ...(form.priceType === 'recurring' && { recurringInterval: form.recurringInterval }),
    }

    const res = await fetch(`${PAYEXTEND_BASE_URL}polar/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      await fetchProducts()
      closeDrawer()
    }
  } catch (e) {
    console.error('Failed to create product:', e)
  } finally {
    isSubmitting.value = false
  }
}

async function handleArchive(id: string) {
  archivingId.value = id
  try {
    const res = await fetch(`${PAYEXTEND_BASE_URL}polar/products/${id}`, { method: 'DELETE' })
    if (res.ok) await fetchProducts()
  } catch (e) {
    console.error('Failed to archive product:', e)
  } finally {
    archivingId.value = null
  }
}
</script>

<style>
:root {
  .p-inputtext, .p-select-label {
    font-size: 12px;
  }
}
</style>
