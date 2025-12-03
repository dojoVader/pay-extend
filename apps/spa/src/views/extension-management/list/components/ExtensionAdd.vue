<script setup lang="ts">
import { reactive } from 'vue'

type ExtensionForm = {
  extensionItemId: string
  extensionName: string
  extensionDescription: string
  status: string
  publicKey: string
  extensionLogo: string
  active: boolean
}

const emit = defineEmits<{
  (e: 'save', payload: ExtensionForm): void
  (e: 'cancel'): void
}>()

const form = reactive<ExtensionForm>({
  extensionItemId: '',
  extensionName: '',
  extensionDescription: '',
  status: 'Pending',
  publicKey: '',
  extensionLogo: '',
  active: true,
})

const statusOptions = ['Pending', 'Published', 'Rejected', 'Disabled']

const errors = reactive<Record<keyof ExtensionForm, string | null>>({
  extensionItemId: null,
  extensionName: null,
  extensionDescription: null,
  status: null,
  publicKey: null,
  extensionLogo: null,
  active: null,
})

function validate(): boolean {
  let ok = true
  // simple required validations based on entity decorators
  errors.extensionItemId = form.extensionItemId ? null : 'Required'
  errors.extensionName = form.extensionName ? null : 'Required'
  errors.extensionDescription = form.extensionDescription ? null : 'Required'
  // optional
  errors.status = null
  errors.publicKey = null
  errors.extensionLogo = null
  errors.active = null
  ok = !errors.extensionItemId && !errors.extensionName && !errors.extensionDescription
  return ok
}

function resetForm() {
  form.extensionItemId = ''
  form.extensionName = ''
  form.extensionDescription = ''
  form.status = 'Pending'
  form.publicKey = ''
  form.extensionLogo = ''
  form.active = true
  Object.keys(errors).forEach(k => (errors[k as keyof ExtensionForm] = null))
}

function handleSubmit() {
  if (!validate()) return
  emit('save', { ...form })
}

function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex justify-between items-center p-5 border-b border-default-200">
      <h3 id="drawerEnd-label" class="font-bold text-[15px] text-default-800">
        Add a New Extension
      </h3>

      <button type="button" aria-label="Close" data-hs-overlay="#drawerEnd" @click="handleCancel">
        <span class="sr-only">Close</span>
        <i data-lucide="x" class="size-4"></i>
      </button>
    </div>

    <div class="h-full p-4 overflow-y-auto">
      <div class="card-body">
        <h6 class="card-title mb-4">Extension Details</h6>
        <form class="grid grid-cols-1 gap-5" @submit.prevent="handleSubmit">
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Extension Item ID</label>
              <input v-model="form.extensionItemId" type="text" class="form-input" placeholder="Unique Item ID" />
              <p class="mt-1 text-default-400 text-xs">Unique identifier for this extension; must be unique across all extensions.</p>
              <p v-if="errors.extensionItemId" class="text-danger text-xs mt-1">{{ errors.extensionItemId }}</p>
            </div>
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Extension Name</label>
              <input v-model="form.extensionName" type="text" class="form-input" placeholder="Human readable name" />
              <p class="mt-1 text-default-400 text-xs">Human‑readable display name shown in the UI.</p>
              <p v-if="errors.extensionName" class="text-danger text-xs mt-1">{{ errors.extensionName }}</p>
            </div>
          </div>

          <div>
            <label class="inline-block mb-2 text-sm text-default-800 font-medium">Description</label>
            <textarea v-model="form.extensionDescription" rows="3" class="form-input" placeholder="Describe what this extension does"></textarea>
            <p class="mt-1 text-default-400 text-xs">Brief summary of the extension’s purpose and key capabilities.</p>
            <p v-if="errors.extensionDescription" class="text-danger text-xs mt-1">{{ errors.extensionDescription }}</p>
          </div>

          <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Status</label>
              <select v-model="form.status" class="form-input">
                <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
              </select>
              <p class="mt-1 text-default-400 text-xs">Lifecycle state: Pending, Published, Rejected, or Disabled.</p>
            </div>
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Public Key</label>
              <input v-model="form.publicKey" type="text" class="form-input" placeholder="Public key (optional)" />
              <p class="mt-1 text-default-400 text-xs">Public key for signature verification. Leave empty if not applicable.</p>
            </div>
          </div>

          <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div class="col-span-1">
              <label class="inline-block mb-2 text-sm text-default-800 font-medium">Extension Logo URL</label>
              <input v-model="form.extensionLogo" type="url" class="form-input" placeholder="https://..." />
              <p class="mt-1 text-default-400 text-xs">HTTPS URL to a square logo image (e.g., 512×512px).</p>
            </div>
            <div class="col-span-1 flex items-center gap-3 pt-7">
              <input id="activeSwitch" v-model="form.active" type="checkbox" class="form-switch" />
              <label for="activeSwitch" class="text-sm text-default-800">Active</label>

            </div>
            <p class="col-span-1 lg:col-start-2 mt-1 text-default-400 text-xs">Toggle to enable or disable this extension for use.</p>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" class="btn bg-transparent border border-default-200 text-default-700" data-hs-overlay="#drawerEnd" @click="handleCancel">Cancel</button>
            <button type="submit" class="btn bg-primary text-white" data-hs-overlay="#drawerEnd">Save</button>
          </div>
        </form>
      </div>
    </div>

    <div class="flex items-center justify-between p-4 border-t border-default-200">
      <small class="text-default-500">Fields marked as required must be filled</small>
      <button type="button" class="btn btn-sm bg-default-100 text-default-700" @click="resetForm">Reset</button>
    </div>
  </div>
</template>

<style scoped>

</style>
