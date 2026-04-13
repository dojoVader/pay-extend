<template>
  <AppLayout>
    <div class="flex items-start justify-between mb-6">
      <PageHeader title="Extensions Manager" subtitle="Extension" />
      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm" @click="drawerOpen = true">
          <Icon icon="lucide:plus" class="text-sm" />
          Add Extension
        </button>
      </div>
    </div>

    <div class="card overflow-hidden">
      <!-- Filter bar -->
      <div class="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100">
        <div class="relative">
          <Icon icon="lucide:search"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          <input type="text" v-model="search" placeholder="Search extensions..."
                 class="form-input pl-9 py-1.5 text-sm w-56" />
        </div>
        <select v-model="statusFilter" class="form-input py-1.5 text-sm w-36">
          <option value="">All Status</option>
          <option>Pending</option>
          <option>Published</option>
          <option>Rejected</option>
          <option>Disabled</option>
        </select>
        <div class="ml-auto text-xs text-gray-400">{{ filtered.length }} results</div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
          <tr>
            <th><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-indigo-600" /></th>
            <th>Extension</th>
            <th>Item ID</th>
            <th>Status</th>
            <th>Active</th>
            <th>Created</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in filtered" :key="item.id">
            <td><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-indigo-600" /></td>
            <td>
              <div>
                <p class="font-medium text-gray-900 text-sm">{{ item.extensionName }}</p>
                <p class="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{{ item.extensionDescription }}</p>
              </div>
            </td>
            <td class="font-mono text-xs text-gray-500">{{ item.extensionItemId }}</td>
            <td>
              <span class="badge" :class="statusBadge(item.status)">{{ item.status }}</span>
            </td>
            <td>
                <span class="w-8 h-4 rounded-full inline-flex items-center px-1 text-xs"
                      :class="item.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'">
                  {{ item.active ? "On" : "Off" }}
                </span>
            </td>
            <td class="text-gray-400 text-xs">{{ item.createdAt }}</td>
            <td>
              <div class="relative">
                <Button type="button" icon="pi pi-ellipsis-v" @click="toggle($event, item)" aria-haspopup="true"
                        aria-controls="overlay_menu" class="btn-icon btn-ghost text-gray-400" />

              </div>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="7" class="text-center py-12 text-gray-400 text-sm">No extensions found</td>
          </tr>
          </tbody>
        </table>
      </div>
      <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
      <div class="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <p class="text-xs text-gray-400">Showing <b class="text-gray-600">{{ filtered.length }}</b> of {{ items.length
          }} extensions</p>
      </div>
    </div>

    <!-- Drawer -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="drawerOpen" class="drawer-overlay" @click="drawerOpen = false" />
      </Transition>
      <Transition name="slide">
        <div v-if="drawerOpen" class="drawer-panel">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 class="font-semibold text-gray-900 text-sm">Add New Extension</h3>
            <button class="btn-icon btn-ghost text-gray-400" @click="drawerOpen = false">
              <Icon icon="lucide:x" class="text-sm" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-5">
            <form class="space-y-4" @submit.prevent="handleSubmit">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Extension Item ID <span
                    class="text-red-500">*</span></label>
                  <IconField>
                    <InputText v-model="form.extensionItemId" variant="filled" placeholder="Unique ID"
                               :disabled="isFetchingExtension" class="w-full" />
                    <InputIcon v-if="isFetchingExtension" class="pi pi-spin pi-spinner" />
                  </IconField>
                  <p v-if="errors.extensionItemId" class="text-xs text-red-500 mt-1">{{ errors.extensionItemId }}</p>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Extension Name <span class="text-red-500">*</span></label>
                  <input v-model="form.extensionName" type="text" class="form-input" placeholder="Display name" />
                  <p v-if="errors.extensionName" class="text-xs text-red-500 mt-1">{{ errors.extensionName }}</p>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Description <span
                  class="text-red-500">*</span></label>
                <textarea v-model="form.extensionDescription" rows="3" class="form-input"
                          placeholder="What does this extension do?" maxlength="255" />
                <div class="flex justify-between mt-1">
                  <p v-if="errors.extensionDescription" class="text-xs text-red-500">{{ errors.extensionDescription
                    }}</p>
                  <p class="text-xs text-gray-400 ml-auto">{{ form.extensionDescription.length }}/255</p>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select v-model="form.status" class="form-input">
                  <option v-for="s in statusOptions" :key="s">{{ s }}</option>
                </select>
              </div>

              <div class="flex items-center gap-2">
                <input type="checkbox" v-model="form.active" id="active-toggle"
                       class="w-4 h-4 rounded text-indigo-600" />
                <label for="active-toggle" class="text-sm text-gray-700">Active</label>
              </div>
            </form>
          </div>

          <div class="flex items-center justify-between px-5 py-4 border-t border-gray-100">
            <button class="btn btn-secondary btn-sm" @click="resetForm">Reset</button>
            <div class="flex gap-2">
              <button class="btn btn-secondary btn-sm" @click="drawerOpen = false">Cancel</button>
              <button class="btn btn-primary btn-sm" :disabled="isSubmitting || isFetchingExtension"
                      @click="handleSubmit">
                <Icon v-if="isSubmitting" icon="lucide:loader-2" class="text-sm animate-spin" />
                Save
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import InputIcon from "primevue/inputicon";
import AppLayout from "@/layouts/AppLayout.vue";
import PageHeader from "@/components/PageHeader.vue";
import { POLARKIT_BASE_URL } from "@/constant";
import Button from "primevue/button";
import Menu from "primevue/menu";

interface Extension {
  id: number;
  extensionItemId: string;
  extensionName: string;
  extensionDescription: string;
  status: string;
  active: boolean;
  createdAt: string;
}

interface DistributionChannel {
  deployPercentage: number;
  crxVersion: string;
}

interface PublishedItemRevisionStatus {
  state: string;
  distributionChannels: DistributionChannel[];
}

interface ChromeWebstoreFetchStatusResponse {
  name: string;
  itemId: string;
  publicKey: string;
  publishedItemRevisionStatus: PublishedItemRevisionStatus;
}


const items = ref<Extension[]>([]);
const search = ref("");
const statusFilter = ref("");
const drawerOpen = ref(false);
const isSubmitting = ref(false);
const isFetchingExtension = ref(false);
const statusOptions = ["Pending", "Published", "Rejected", "Disabled"];

const form = reactive({
  extensionItemId: "",
  extensionName: "",
  extensionDescription: "",
  status: "Pending",
  publicKey: "",
  extensionLogo: "",
  active: true
});

const errors = reactive<Record<string, string | null>>({
  extensionItemId: null,
  extensionName: null,
  extensionDescription: null
});

const router = useRouter()
const menu = ref()
const selectedItem = ref<Extension | null>(null)
const menuItems = computed(() => [
  {
    label: 'Manage Payment',
    icon: 'pi pi-credit-card',
    command: () => {
      if (selectedItem.value) router.push(`/extension/item/${selectedItem.value.id}`)
    },
  },
  { label: 'View Payment History', icon: 'pi pi-history' },
])

const toggle = (event: Event, item: Extension) => {
  selectedItem.value = item
  menu.value.toggle(event)
}

let fetchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(() => form.extensionItemId, (val) => {
  if (fetchTimeout) clearTimeout(fetchTimeout);
  if (!val) return;
  fetchTimeout = setTimeout(async () => {
    isFetchingExtension.value = true;
    try {
      const response = (await fetch(`${POLARKIT_BASE_URL}chrome-webstore/items/${val}`)) as unknown as ChromeWebstoreFetchStatusResponse;
      form.status = response.publishedItemRevisionStatus.state;
    } catch {
      // ignore — credential check is handled by the backend
    } finally {
      isFetchingExtension.value = false;
    }
  }, 500);
});

const filtered = computed(() => {
  return items.value.filter((item) => {
    const matchSearch = !search.value || item.extensionName.toLowerCase().includes(search.value.toLowerCase()) || item.extensionItemId.toLowerCase().includes(search.value.toLowerCase());
    const matchStatus = !statusFilter.value || item.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

onMounted(() => {
  fetchExtensions();
});

async function fetchExtensions() {
  try {
    const response = await fetch(`${POLARKIT_BASE_URL}extension/all`);
    if (response.ok) {
      items.value = await response.json();
    }
  } catch (e) {
    console.error("Error fetching extensions:", e);
  }
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Published: "badge-green",
    Pending: "badge-yellow",
    Rejected: "badge-red",
    Disabled: "badge-gray"
  };
  return map[status] ?? "badge-gray";
}

function validate(): boolean {
  errors.extensionItemId = form.extensionItemId ? null : "Required";
  errors.extensionName = form.extensionName ? null : "Required";
  errors.extensionDescription = form.extensionDescription ? null : "Required";
  return !errors.extensionItemId && !errors.extensionName && !errors.extensionDescription;
}

function resetForm() {
  form.extensionItemId = "";
  form.extensionName = "";
  form.extensionDescription = "";
  form.status = "Pending";
  form.active = true;
  Object.keys(errors).forEach((k) => (errors[k] = null));
}

async function handleSubmit() {
  if (!validate()) return;
  isSubmitting.value = true;
  try {
    const response = await fetch(`${POLARKIT_BASE_URL}extension/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (response.ok) {
      await fetchExtensions();
      drawerOpen.value = false;
      resetForm();
    }
  } catch (e) {
    console.error("Error adding extension:", e);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style>
:root {
  --p-button-primary-background: #4f46e5 !important;
}


</style>
