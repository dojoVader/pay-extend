<template>
  <AppLayout>
    <div class="flex items-start justify-between mb-6">
      <PageHeader title="DOM Selectors" subtitle="Extension" />
      <button class="btn btn-primary btn-sm" @click="drawerOpen = true">
        <Icon icon="lucide:plus" class="text-sm" />
        Add Selector
      </button>
    </div>

    <div class="card overflow-hidden">
      <!-- Filter bar -->
      <div class="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100">
        <div class="relative">
          <Icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          <input type="text" v-model="search" placeholder="Search selectors..." class="form-input pl-9 py-1.5 text-sm w-56" />
        </div>
        <select v-model="statusFilter" class="form-input py-1.5 text-sm w-36">
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <div class="ml-auto text-xs text-gray-400">{{ filtered.length }} results</div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th><input type="checkbox" class="w-4 h-4 rounded border-gray-300" /></th>
              <th>Key</th>
              <th>Selector</th>
              <th>Strategy</th>
              <th>Version</th>
              <th>Status</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filtered" :key="item.id">
              <td><input type="checkbox" class="w-4 h-4 rounded border-gray-300" /></td>
              <td>
                <div>
                  <p class="font-mono text-xs font-medium text-indigo-700">{{ item.key }}</p>
                  <p v-if="item.description" class="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{{ item.description }}</p>
                </div>
              </td>
              <td class="font-mono text-xs text-gray-600 max-w-xs truncate">{{ item.selector }}</td>
              <td>
                <span class="badge badge-blue">{{ item.multipleStrategy }}</span>
              </td>
              <td class="text-xs text-gray-500">v{{ item.version }}</td>
              <td>
                <span class="badge" :class="item.isActive ? 'badge-green' : 'badge-gray'">
                  {{ item.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="text-xs text-gray-400">{{ item.updatedAt }}</td>
              <td>
                <Button type="button" icon="pi pi-ellipsis-v" @click="toggle($event, item)" aria-haspopup="true" aria-controls="overlay_menu" class="btn-icon btn-ghost text-gray-400" />
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="8" class="text-center py-12 text-gray-400 text-sm">No selectors found</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 py-3 border-t border-gray-100">
        <p class="text-xs text-gray-400">Showing <b class="text-gray-600">{{ filtered.length }}</b> of {{ items.length }} selectors</p>
      </div>
    </div>

    <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />

    <!-- Drawer -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="drawerOpen" class="drawer-overlay" @click="drawerOpen = false" />
      </Transition>
      <Transition name="slide">
        <div v-if="drawerOpen" class="drawer-panel">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 class="font-semibold text-gray-900 text-sm">{{ isEditing ? 'Edit' : 'Add' }} DOM Selector</h3>
            <button class="btn-icon btn-ghost text-gray-400" @click="drawerOpen = false">
              <Icon icon="lucide:x" class="text-sm" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-5 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Extension Context ID <span class="text-red-500">*</span></label>
                <input v-model.number="form.extensionContextId" type="number" class="form-input" placeholder="101" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Key <span class="text-red-500">*</span></label>
                <input v-model="form.key" type="text" class="form-input" placeholder="checkout.total" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">CSS Selector <span class="text-red-500">*</span></label>
              <input v-model="form.selector" type="text" class="form-input font-mono text-sm" placeholder="#checkout .total .amount" />
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="form.description" rows="2" class="form-input" placeholder="What does this selector target?" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Multiple Strategy</label>
                <select v-model="form.multipleStrategy" class="form-input">
                  <option>first</option>
                  <option>last</option>
                  <option>all</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Attribute</label>
                <input v-model="form.attribute" type="text" class="form-input" placeholder="textContent" />
              </div>
            </div>

            <div class="flex items-center gap-2">
              <input type="checkbox" v-model="form.isActive" id="selector-active" class="w-4 h-4 rounded text-indigo-600" />
              <label for="selector-active" class="text-sm text-gray-700">Active</label>
            </div>
          </div>

          <div class="flex items-center justify-between px-5 py-4 border-t border-gray-100">
            <button class="btn btn-secondary btn-sm" @click="resetForm">Reset</button>
            <div class="flex gap-2">
              <button class="btn btn-secondary btn-sm" @click="drawerOpen = false">Cancel</button>
              <button class="btn btn-primary btn-sm" @click="handleSave">Save</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'
import Button from 'primevue/button'
import Menu from 'primevue/menu'


const isEditing = ref(false)
const menu = ref()
const currentItem = ref<DomSelectorRow | null>(null)
const menuItems = ref([
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => {
      if (currentItem.value) {
        isEditing.value = true
        Object.assign(form, currentItem.value)
        drawerOpen.value = true
      }
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      if (currentItem.value) {
        items.value = items.value.filter(i => i.id !== currentItem.value!.id)
      }
    }
  }
])

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

const items = ref<DomSelectorRow[]>([])

const search = ref('')
const statusFilter = ref('')
const drawerOpen = ref(false)

const form = reactive({
  extensionContextId: 0,
  key: '',
  selector: '',
  description: '',
  multipleStrategy: 'first' as MultipleStrategy,
  attribute: '',
  isActive: true,
})

const filtered = computed(() => {
  return items.value.filter((item) => {
    const matchSearch = !search.value || item.key.toLowerCase().includes(search.value.toLowerCase()) || item.selector.toLowerCase().includes(search.value.toLowerCase())
    const matchStatus = !statusFilter.value || String(item.isActive) === statusFilter.value
    return matchSearch && matchStatus
  })
})

function resetForm() {
  form.extensionContextId = 0
  form.key = ''
  form.selector = ''
  form.description = ''
  form.multipleStrategy = 'first'
  form.attribute = ''
  form.isActive = true
  isEditing.value = false
}

function handleSave() {
  if (!form.key || !form.selector) return
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
  if (isEditing.value && currentItem.value) {
    // update
    const index = items.value.findIndex(i => i.id === currentItem.value!.id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...form, updatedAt: ts }
    }
  } else {
    // add
    const nextId = (items.value.reduce((max, it) => Math.max(max, it.id), 0) || 0) + 1
    items.value.unshift({ id: nextId, extensionContextId: form.extensionContextId, key: form.key, selector: form.selector, fallbacks: [], multipleStrategy: form.multipleStrategy, attribute: form.attribute || null, description: form.description || null, version: 1, isActive: form.isActive, createdAt: ts, updatedAt: ts })
  }
  drawerOpen.value = false
  resetForm()
}

const toggle = (event: Event, item: DomSelectorRow) => {
  currentItem.value = item
  menu.value?.toggle(event)
}
</script>


