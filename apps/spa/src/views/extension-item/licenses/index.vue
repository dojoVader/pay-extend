<template>
  <!-- Header -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-sm font-semibold text-gray-900">License Keys</h3>
    <Button label="Create Benefit" icon="pi pi-plus" size="small" @click="benefitDrawerOpen = true" />
  </div>

  <!-- License list -->
  <div v-if="licenses.length > 0" class="space-y-2">
    <div
      v-for="lic in licenses"
      :key="lic.id"
      class="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div class="flex items-center gap-3 min-w-0">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-mono text-xs text-gray-700 truncate max-w-[220px]">{{ lic.key }}</span>
            <span
              class="text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0"
              :class="statusClass(lic.status)"
            >{{ lic.status }}</span>
          </div>
          <p class="text-xs text-gray-400 mt-0.5">
            <span v-if="lic.expires_at">Expires {{ new Date(lic.expires_at).toLocaleDateString() }}</span>
            <span v-else>No expiry</span>
            <span class="mx-1 text-gray-300">&middot;</span>
            {{ lic.usage ?? 0 }} activation{{ lic.usage !== 1 ? 's' : '' }}
            <span v-if="lic.limit_usage" class="text-gray-300"> / {{ lic.limit_usage }}</span>
          </p>
        </div>
      </div>
      <div class="flex items-center gap-1 shrink-0 ml-2">
        <Button icon="pi pi-eye" text size="small" severity="secondary" @click="openDetail(lic)" />
        <Button
          v-if="lic.status !== 'granted'"
          icon="pi pi-check-circle"
          text size="small" severity="success"
          v-tooltip.top="'Enable'"
          :loading="togglingId === lic.id"
          @click="handleToggleStatus(lic, 'granted')"
        />
        <Button
          v-if="lic.status !== 'disabled'"
          icon="pi pi-ban"
          text size="small" severity="danger"
          v-tooltip.top="'Disable'"
          :loading="togglingId === lic.id"
          @click="handleToggleStatus(lic, 'disabled')"
        />
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="card p-6 text-center text-sm text-gray-400">
    Loading licenses…
  </div>

  <div v-else class="card p-6 text-center">
    <p class="text-sm text-gray-400 mb-2">No license keys found.</p>
    <p class="text-xs text-gray-300">Create a license benefit above to start issuing keys.</p>
  </div>

  <!-- ── Create Benefit Drawer ────────────────────────────────────────────── -->
  <Drawer
    v-model:visible="benefitDrawerOpen"
    header="Create License Benefit"
    position="right"
    :style="{ width: '520px', fontSize: '14px' }"
  >
    <form class="space-y-5" @submit.prevent="handleCreateBenefit">
      <div class="grid grid-cols-2 gap-4">
        <!-- Left col -->
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Name <span class="text-red-500">*</span></label>
            <InputText v-model="benefitForm.name" class="w-full" placeholder="Pro License" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <InputText v-model="benefitForm.description" class="w-full" placeholder="Optional description" />
          </div>
        </div>
        <!-- Right col -->
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Activation Limit
              <span class="text-gray-400 font-normal">(per key)</span>
            </label>
            <InputText v-model="benefitForm.activationLimit" class="w-full" type="number" placeholder="e.g. 5" min="1" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Usage Limit
              <span class="text-gray-400 font-normal">(total keys)</span>
            </label>
            <InputText v-model="benefitForm.usageLimit" class="w-full" type="number" placeholder="Unlimited" min="1" />
          </div>
        </div>
      </div>

      <div v-if="benefitError" class="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
        {{ benefitError }}
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <Button label="Cancel" severity="secondary" size="small" type="button" @click="benefitDrawerOpen = false" />
        <Button label="Create Benefit" size="small" type="submit" :loading="isCreatingBenefit" />
      </div>
    </form>
  </Drawer>

  <!-- ── License Detail Drawer ─────────────────────────────────────────────── -->
  <Drawer
    v-model:visible="detailDrawerOpen"
    header="License Key"
    position="right"
    :style="{ width: '680px', fontSize: '14px' }"
  >
    <div v-if="selectedLicense" class="grid grid-cols-2 gap-6 h-full">
      <!-- Left col: key info + update + activate -->
      <div class="space-y-5">
        <div class="space-y-2 text-sm">
          <div class="py-2 border-b border-gray-100">
            <p class="text-xs text-gray-400 mb-1">License Key</p>
            <p class="font-mono text-xs text-gray-800 break-all">{{ selectedLicense.key }}</p>
          </div>
          <div class="flex justify-between py-2 border-b border-gray-100">
            <span class="text-gray-500">Status</span>
            <span class="text-xs px-2 py-0.5 rounded font-medium" :class="statusClass(selectedLicense.status)">
              {{ selectedLicense.status }}
            </span>
          </div>
          <div class="flex justify-between py-2 border-b border-gray-100">
            <span class="text-gray-500">Expires</span>
            <span>{{ selectedLicense.expires_at ? new Date(selectedLicense.expires_at).toLocaleDateString() : 'Never' }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-gray-100">
            <span class="text-gray-500">Activations</span>
            <span>{{ selectedLicense.usage ?? 0 }}<span v-if="selectedLicense.limit_usage"> / {{ selectedLicense.limit_usage }}</span></span>
          </div>
          <div v-if="selectedLicense.user" class="flex justify-between py-2 border-b border-gray-100">
            <span class="text-gray-500">User</span>
            <span class="text-xs text-right">{{ selectedLicense.user.email }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-gray-500">Created</span>
            <span>{{ new Date(selectedLicense.created_at).toLocaleDateString() }}</span>
          </div>
        </div>

        <!-- Update expiry -->
        <div class="pt-2 border-t border-gray-100 space-y-3">
          <p class="text-xs font-medium text-gray-700">Update Expiry</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Expires At</label>
              <InputText v-model="updateForm.expires_at" type="date" class="w-full" />
            </div>
            <div class="flex items-end">
              <Button label="Update" size="small" class="w-full" :loading="isUpdating" @click="handleUpdate" />
            </div>
          </div>
        </div>

        <!-- Add activation -->
        <div class="pt-2 border-t border-gray-100 space-y-3">
          <p class="text-xs font-medium text-gray-700">Add Activation</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Label <span class="text-red-500">*</span></label>
              <InputText v-model="activateForm.label" class="w-full" placeholder="e.g. MacBook Pro" />
            </div>
            <div class="flex items-end">
              <Button label="Activate" size="small" class="w-full" :loading="isActivating" @click="handleActivate" />
            </div>
          </div>
          <div v-if="activateError" class="text-xs text-red-600">{{ activateError }}</div>
        </div>
      </div>

      <!-- Right col: activations list -->
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <p class="text-xs font-medium text-gray-700">Activations</p>
          <Button icon="pi pi-refresh" text size="small" severity="secondary" :loading="loadingActivations" @click="fetchActivations(selectedLicense.id)" />
        </div>

        <div v-if="loadingActivations" class="text-xs text-gray-400 text-center py-4">Loading…</div>

        <div v-else-if="activations.length === 0" class="text-xs text-gray-400 text-center py-4">
          No activations recorded.
        </div>

        <div v-else class="space-y-2 overflow-y-auto max-h-[480px] pr-1">
          <div
            v-for="act in activations"
            :key="act.id"
            class="flex items-start justify-between px-3 py-2 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div class="min-w-0">
              <p class="text-xs font-medium text-gray-800 truncate">{{ act.label || '—' }}</p>
              <p class="text-[10px] text-gray-400 mt-0.5">{{ new Date(act.created_at).toLocaleString() }}</p>
              <p v-if="act.meta && Object.keys(act.meta).length" class="font-mono text-[10px] text-gray-400 mt-0.5 truncate">
                {{ JSON.stringify(act.meta) }}
              </p>
            </div>
            <Button
              icon="pi pi-times"
              text size="small" severity="danger"
              v-tooltip.top="'Deactivate'"
              :loading="deactivatingId === act.id"
              class="shrink-0 ml-2"
              @click="handleDeactivate(act.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import InputText from 'primevue/inputtext'
import { POLARKIT_BASE_URL } from '@/constant'

interface LicenseUser {
  id: string
  email: string
  public_name: string
}

interface LicenseKey {
  id: string
  key: string
  status: 'granted' | 'revoked' | 'disabled' | 'active'
  benefit_id: string
  user: LicenseUser | null
  order_id: string | null
  expires_at: string | null
  usage: number
  limit_usage: number | null
  created_at: string
  modified_at: string | null
}

interface LicenseActivation {
  id: string
  license_key_id: string
  label: string
  meta: Record<string, unknown>
  created_at: string
  modified_at: string | null
}

const props = defineProps<{ extensionId?: string }>()

const licenses = ref<LicenseKey[]>([])
const loading = ref(true)
const togglingId = ref<string | null>(null)

// ── Benefit creation ──────────────────────────────────────────────────────
const benefitDrawerOpen = ref(false)
const isCreatingBenefit = ref(false)
const benefitError = ref('')
const benefitForm = reactive({
  name: '',
  description: '',
  activationLimit: '',
  usageLimit: '',
})

// ── Detail drawer ─────────────────────────────────────────────────────────
const detailDrawerOpen = ref(false)
const selectedLicense = ref<LicenseKey | null>(null)
const activations = ref<LicenseActivation[]>([])
const loadingActivations = ref(false)
const deactivatingId = ref<string | null>(null)
const isUpdating = ref(false)
const isActivating = ref(false)
const activateError = ref('')

const updateForm = reactive({ expires_at: '' })
const activateForm = reactive({ label: '' })

// ── Lifecycle ─────────────────────────────────────────────────────────────
onMounted(fetchLicenses)
watch(() => props.extensionId, fetchLicenses)

// ── Fetch ─────────────────────────────────────────────────────────────────
async function fetchLicenses() {
  if (!props.extensionId) return
  loading.value = true
  try {
    const res = await fetch(`${POLARKIT_BASE_URL}polar/licenses/extension/${props.extensionId}`)
    if (res.ok) {
      const data = await res.json()
      licenses.value = data?.items ?? data ?? []
    }
  } catch (e) {
    console.error('Failed to fetch licenses:', e)
  } finally {
    loading.value = false
  }
}

async function fetchActivations(licenseId: string) {
  loadingActivations.value = true
  try {
    const res = await fetch(`${POLARKIT_BASE_URL}polar/licenses/${licenseId}/activations`)
    if (res.ok) {
      const data = await res.json()
      activations.value = data?.items ?? data ?? []
    }
  } catch (e) {
    console.error('Failed to fetch activations:', e)
  } finally {
    loadingActivations.value = false
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────
function statusClass(status: string) {
  switch (status) {
    case 'granted':
    case 'active':
      return 'bg-green-100 text-green-700'
    case 'disabled':
    case 'revoked':
      return 'bg-red-100 text-red-600'
    default:
      return 'bg-gray-100 text-gray-500'
  }
}

function openDetail(lic: LicenseKey) {
  selectedLicense.value = lic
  activations.value = []
  updateForm.expires_at = lic.expires_at ? lic.expires_at.slice(0, 10) : ''
  activateForm.label = ''
  activateError.value = ''
  detailDrawerOpen.value = true
  fetchActivations(lic.id)
}

// ── Actions ───────────────────────────────────────────────────────────────
async function handleCreateBenefit() {
  if (!benefitForm.name || !props.extensionId) return
  isCreatingBenefit.value = true
  benefitError.value = ''
  try {
    const payload: Record<string, unknown> = {
      name: benefitForm.name,
      extensionId: props.extensionId,
      ...(benefitForm.description && { description: benefitForm.description }),
      ...(benefitForm.activationLimit && { activationLimit: Number(benefitForm.activationLimit) }),
      ...(benefitForm.usageLimit && { usageLimit: Number(benefitForm.usageLimit) }),
    }
    const res = await fetch(`${POLARKIT_BASE_URL}polar/benefits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      benefitDrawerOpen.value = false
      Object.assign(benefitForm, { name: '', description: '', activationLimit: '', usageLimit: '' })
      await fetchLicenses()
    } else {
      const err = await res.json().catch(() => ({}))
      benefitError.value = err?.message ?? 'Failed to create benefit'
    }
  } catch (e: any) {
    benefitError.value = e?.message ?? 'Request failed'
  } finally {
    isCreatingBenefit.value = false
  }
}

async function handleToggleStatus(lic: LicenseKey, status: 'granted' | 'disabled') {
  togglingId.value = lic.id
  try {
    const res = await fetch(`${POLARKIT_BASE_URL}polar/licenses/${lic.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) await fetchLicenses()
  } catch (e) {
    console.error('Failed to toggle license status:', e)
  } finally {
    togglingId.value = null
  }
}

async function handleUpdate() {
  if (!selectedLicense.value) return
  isUpdating.value = true
  try {
    const payload: Record<string, unknown> = {}
    if (updateForm.expires_at) payload['expires_at'] = new Date(updateForm.expires_at).toISOString()
    const res = await fetch(`${POLARKIT_BASE_URL}polar/licenses/${selectedLicense.value.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const updated = await res.json()
      selectedLicense.value = updated
      await fetchLicenses()
    }
  } catch (e) {
    console.error('Failed to update license:', e)
  } finally {
    isUpdating.value = false
  }
}

async function handleActivate() {
  if (!selectedLicense.value || !activateForm.label) return
  isActivating.value = true
  activateError.value = ''
  try {
    const res = await fetch(`${POLARKIT_BASE_URL}polar/licenses/${selectedLicense.value.id}/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: activateForm.label }),
    })
    if (res.ok) {
      activateForm.label = ''
      await fetchActivations(selectedLicense.value.id)
      await fetchLicenses()
    } else {
      const err = await res.json().catch(() => ({}))
      activateError.value = err?.message ?? 'Activation failed'
    }
  } catch (e: any) {
    activateError.value = e?.message ?? 'Request failed'
  } finally {
    isActivating.value = false
  }
}

async function handleDeactivate(activationId: string) {
  if (!selectedLicense.value) return
  deactivatingId.value = activationId
  try {
    const res = await fetch(`${POLARKIT_BASE_URL}polar/licenses/${selectedLicense.value.id}/deactivate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activation_id: activationId }),
    })
    if (res.ok) {
      await fetchActivations(selectedLicense.value.id)
      await fetchLicenses()
    }
  } catch (e) {
    console.error('Failed to deactivate:', e)
  } finally {
    deactivatingId.value = null
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
