<template>
  <header class="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-4 flex-shrink-0">
    <!-- Sidebar toggle -->
    <button
      class="btn-icon btn-ghost text-gray-500"
      @click="$emit('toggle-sidebar')"
      aria-label="Toggle sidebar"
    >
      <Icon icon="lucide:align-left" class="text-base" />
    </button>

    <!-- Breadcrumb / page title -->
    <div class="flex items-center gap-2 text-sm text-gray-500 min-w-0">
      <span class="text-gray-400 text-xs font-medium uppercase tracking-wide">{{ breadcrumb }}</span>
      <Icon v-if="title !== breadcrumb" icon="lucide:chevron-right" class="text-xs text-gray-300 flex-shrink-0" />
      <span v-if="title !== breadcrumb" class="text-gray-700 font-medium truncate">{{ title }}</span>
    </div>

    <div class="flex-1" />

    <!-- Search -->
    <div class="hidden md:flex items-center relative">
      <Icon icon="lucide:search" class="absolute left-3 text-gray-400 text-sm pointer-events-none" />
      <input
        type="search"
        placeholder="Search..."
        class="form-input pl-9 pr-4 py-1.5 text-sm w-52 bg-gray-50 border-gray-200 focus:bg-white"
      />
    </div>

    <!-- Notification bell -->
    <button class="btn-icon btn-ghost text-gray-500 relative" aria-label="Notifications">
      <Icon icon="lucide:bell" class="text-base" />
      <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
    </button>

    <!-- User avatar -->
    <div class="flex items-center gap-2">
      <span class="hidden sm:block text-sm text-gray-700 font-medium">{{ auth.user?.name }}</span>
      <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm select-none">
        {{ initial }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useAuth } from '@/stores/auth'

defineEmits<{ (e: 'toggle-sidebar'): void }>()

const route = useRoute()
const auth = useAuth()

const routeTitles: Record<string, { breadcrumb: string; title: string }> = {
  '/dashboard': { breadcrumb: 'Overview', title: 'Dashboard' },
  '/extension/index': { breadcrumb: 'Extension', title: 'Extensions' },
  '/extension/dom-selector': { breadcrumb: 'Extension', title: 'DOM Selectors' },
  '/extension/logs': { breadcrumb: 'Extension', title: 'Logs' },
  '/integrations/payment': { breadcrumb: 'Account', title: 'Integrations' },
  '/integrations/payment/stripe': { breadcrumb: 'Integrations', title: 'Stripe' },
  '/integrations/notification/smtp': { breadcrumb: 'Integrations', title: 'SMTP' },
  '/integrations/extension/chrome-webstore': { breadcrumb: 'Integrations', title: 'Chrome Webstore' },
}

const info = computed(() => routeTitles[route.path] ?? { breadcrumb: 'PayExtend', title: '' })
const breadcrumb = computed(() => info.value.breadcrumb)
const title = computed(() => info.value.title)

const initial = computed(() => {
  const name = auth.user?.name ?? 'U'
  return name.charAt(0).toUpperCase()
})
</script>
