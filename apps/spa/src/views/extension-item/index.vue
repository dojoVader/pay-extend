<template>
  <AppLayout>
    <div class="flex items-start justify-between mb-6">
      <div class="flex items-center gap-3">
        <button class="btn-icon btn-ghost text-gray-400" @click="router.back()">
          <Icon icon="lucide:arrow-left" class="text-sm" />
        </button>
        <PageHeader :title="extension?.extensionName ?? 'Extension'" subtitle="Extension" />
      </div>
      <span class="badge" :class="statusBadge(extension?.status ?? '')">{{ extension?.status }}</span>
    </div>

    <ExtensionDetails
      :extension-id="extension?.id"
      :extension-item-id="extension?.extensionItemId"
      :description="extension?.extensionDescription"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'
import ExtensionDetails from './details.vue'
import { PAYEXTEND_BASE_URL } from '@/constant'

interface Extension {
  id: number
  extensionItemId: string
  extensionName: string
  extensionDescription: string
  status: string
  active: boolean
  createdAt: string
}

const router = useRouter()
const route = useRoute()
const extension = ref<Extension | null>(null)

onMounted(async () => {
  try {
    const response = await fetch(`${PAYEXTEND_BASE_URL}extension/${route.params.id}`)
    if (response.ok) {
      extension.value = await response.json()
    }
  } catch (e) {
    console.error('Failed to load extension:', e)
  }
})

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Published: 'badge-green',
    Pending: 'badge-yellow',
    Rejected: 'badge-red',
    Disabled: 'badge-gray',
  }
  return map[status] ?? 'badge-gray'
}
</script>
