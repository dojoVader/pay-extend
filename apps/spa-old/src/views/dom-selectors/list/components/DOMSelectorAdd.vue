<script setup lang="ts">
import { reactive } from 'vue'

type MultipleStrategy = 'first' | 'last' | 'all'

// Payload for creating a DomSelector (excluding generated fields like id/dates)
type DomSelectorCreate = {
  extensionContextId: number
  key: string
  selector: string
  fallbacks: string[]
  multipleStrategy: MultipleStrategy
  attribute?: string | null
  description?: string | null
  isActive: boolean
}

// Internal form model (use a text field for fallbacks input, then split on save)
type DomSelectorForm = {
  extensionContextId: string
  key: string
  selector: string
  fallbacksText: string
  multipleStrategy: MultipleStrategy
  attribute: string
  description: string
  isActive: boolean
}

const emit = defineEmits<{
  (e: 'save', payload: DomSelectorCreate): void
  (e: 'cancel'): void
}>()

const form = reactive<DomSelectorForm>({
  extensionContextId: '',
  key: '',
  selector: '',
  fallbacksText: '',
  multipleStrategy: 'first',
  attribute: '',
  description: '',
  isActive: true,
})

const strategyOptions: MultipleStrategy[] = ['first', 'last', 'all']

const errors = reactive<Record<keyof DomSelectorForm, string | null>>({
  extensionContextId: null,
  key: null,
  selector: null,
  fallbacksText: null,
  multipleStrategy: null,
  attribute: null,
  description: null,
  isActive: null,
})

function validate(): boolean {
  errors.extensionContextId = form.extensionContextId && !isNaN(Number(form.extensionContextId)) ? null : 'Required (number)'
  errors.key = form.key ? null : 'Required'
  errors.selector = form.selector ? null : 'Required'
  // optional fields
  errors.fallbacksText = null
  errors.multipleStrategy = strategyOptions.includes(form.multipleStrategy) ? null : 'Invalid strategy'
  errors.attribute = null
  errors.description = null
  errors.isActive = null
  return !errors.extensionContextId && !errors.key && !errors.selector && !errors.multipleStrategy
}

function resetForm() {
  form.extensionContextId = ''
  form.key = ''
  form.selector = ''
  form.fallbacksText = ''
  form.multipleStrategy = 'first'
  form.attribute = ''
  form.description = ''
  form.isActive = true
  Object.keys(errors).forEach(k => (errors[k as keyof DomSelectorForm] = null))
}

function toArray(input: string): string[] {
  return input
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
}

function handleSubmit() {
  if (!validate()) return
  const payload: DomSelectorCreate = {
    extensionContextId: Number(form.extensionContextId),
    key: form.key.trim(),
    selector: form.selector.trim(),
    fallbacks: toArray(form.fallbacksText),
    multipleStrategy: form.multipleStrategy,
    attribute: form.attribute.trim() ? form.attribute.trim() : null,
    description: form.description.trim() ? form.description.trim() : null,
    isActive: form.isActive,
  }
  emit('save', payload)
}

function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex justify-between items-center p-5 border-b border-default-200">
      <h3 id="drawerEnd-label" class="font-bold text-[15px] text-default-800">
        Add a New DOM Selector
      </h3>

      <button type="button" aria-label="Close" data-hs-overlay="#drawerEnd" @click="handleCancel">
        <span class="sr-only">Close</span>
        <i data-lucide="x" class="size-4"></i>
      </button>
    </div>

    <div class="h-full p-4 overflow-y-auto">
      <div class="card-body">
        <h6 class="card-title mb-4">Selector Details</h6>
        <form class="grid grid-cols-1 gap-5" @submit.prevent="handleSubmit">
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Extension Context ID</label>
              <input v-model="form.extensionContextId" type="number" class="form-input" placeholder="e.g. 101" />
              <p class="mt-1 text-default-400 text-xs">Numeric identifier of the extension context this selector belongs to.</p>
              <p v-if="errors.extensionContextId" class="text-danger text-xs mt-1">{{ errors.extensionContextId }}</p>
            </div>
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Key</label>
              <input v-model="form.key" type="text" class="form-input" placeholder="e.g. checkout.total" />
              <p class="mt-1 text-default-400 text-xs">Unique key path for programmatic access (e.g., checkout.total).</p>
              <p v-if="errors.key" class="text-danger text-xs mt-1">{{ errors.key }}</p>
            </div>
          </div>

          <div>
            <label class="inline-block mb-2 text-sm text-default-800 font-medium">CSS Selector</label>
            <textarea v-model="form.selector" rows="2" class="form-input" placeholder="#checkout .order-summary .total .amount"></textarea>
            <p class="mt-1 text-default-400 text-xs">Primary selector used to locate DOM element(s).</p>
            <p v-if="errors.selector" class="text-danger text-xs mt-1">{{ errors.selector }}</p>
          </div>

          <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Fallback Selectors</label>
              <input v-model="form.fallbacksText" type="text" class="form-input" placeholder=".total-amount, .sum .amount:last-child" />
              <p class="mt-1 text-default-400 text-xs">Comma‑separated list of fallback selectors (optional).</p>
            </div>
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Multiple Strategy</label>
              <select v-model="form.multipleStrategy" class="form-input">
                <option v-for="s in strategyOptions" :key="s" :value="s">{{ s }}</option>
              </select>
              <p v-if="errors.multipleStrategy" class="text-danger text-xs mt-1">{{ errors.multipleStrategy }}</p>
              <p class="mt-1 text-default-400 text-xs">How to handle multiple matches: first, last, or all.</p>
            </div>
          </div>

          <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Attribute</label>
              <input v-model="form.attribute" type="text" class="form-input" placeholder="e.g. textContent or value" />
              <p class="mt-1 text-default-400 text-xs">Optional attribute to read from the target element(s).</p>
            </div>
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Active</label>
              <div class="flex items-center gap-3">
                <input id="activeSwitch" v-model="form.isActive" type="checkbox" class="form-switch" />
                <label for="activeSwitch" class="text-sm text-default-800">Enabled</label>
              </div>
            </div>
          </div>

          <div>
            <label class="inline-block mb-2 text-sm text-default-800 font-medium">Description</label>
            <textarea v-model="form.description" rows="3" class="form-input" placeholder="Describe the purpose or usage (optional)"></textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" class="btn bg-transparent border border-default-200 text-default-700" data-hs-overlay="#drawerEnd" @click="handleCancel">Cancel</button>
            <button type="submit" class="btn bg-primary text-white" data-hs-overlay="#drawerEnd">Save</button>
          </div>
        </form>
      </div>
    </div>

    <div class="flex items-center justify-between p-4 border-t border-default-200">
      <small class="text-default-500">Required: Extension Context ID, Key, and CSS Selector</small>
      <button type="button" class="btn btn-sm bg-default-100 text-default-700" @click="resetForm">Reset</button>
    </div>
  </div>
</template>

<style scoped>

</style>
