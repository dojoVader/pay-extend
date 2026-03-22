<template>
  <aside
    class="fixed inset-y-0 left-0 z-20 flex flex-col bg-white border-r border-gray-100 transition-all duration-200"
    :class="collapsed ? 'w-16' : 'w-60'"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-4 h-14 border-b border-gray-100 flex-shrink-0">
      <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 flex-shrink-0">
        <Icon icon="lucide:puzzle" class="text-white text-sm" />
      </div>
      <span v-if="!collapsed" class="font-semibold text-gray-900 text-sm">PayExtend</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-3 px-2">
      <template v-for="section in menu" :key="section.key">
        <!-- Section title -->
        <p
          v-if="!collapsed && section.isTitle"
          class="px-2 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400"
        >
          {{ section.label }}
        </p>
        <div v-else-if="collapsed && section.isTitle" class="mt-3 border-t border-gray-100" />

        <!-- Nav item with children -->
        <template v-if="!section.isTitle && section.children">
          <button
            class="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            :class="{ 'bg-gray-50 text-gray-900': isGroupActive(section) }"
            @click="toggleGroup(section.key)"
          >
            <Icon :icon="section.icon || 'lucide:circle'" class="text-base flex-shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">{{ section.label }}</span>
            <Icon
              v-if="!collapsed"
              icon="lucide:chevron-right"
              class="text-xs text-gray-400 transition-transform"
              :class="{ 'rotate-90': openGroups.has(section.key) }"
            />
          </button>
          <div v-if="!collapsed && openGroups.has(section.key)" class="ml-4 mt-0.5 mb-1 border-l border-gray-100 pl-3 space-y-0.5">
            <RouterLink
              v-for="child in section.children"
              :key="child.key"
              :to="child.url || '/'"
              class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors"
              :class="isActive(child.url) ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            >
              <Icon v-if="child.icon" :icon="child.icon" class="text-sm flex-shrink-0" />
              {{ child.label }}
            </RouterLink>
          </div>
        </template>

        <!-- Simple nav item -->
        <RouterLink
          v-else-if="!section.isTitle && section.url"
          :to="section.url"
          class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors"
          :class="isActive(section.url) ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
        >
          <Icon :icon="section.icon || 'lucide:circle'" class="text-base flex-shrink-0" />
          <span v-if="!collapsed">{{ section.label }}</span>
        </RouterLink>
      </template>
    </nav>

    <!-- Bottom: user logout -->
    <div class="flex-shrink-0 border-t border-gray-100 p-2">
      <RouterLink
        to="/auth/logout"
        class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
      >
        <Icon icon="lucide:log-out" class="text-base flex-shrink-0" />
        <span v-if="!collapsed">Sign out</span>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

type NavChild = { key: string; label: string; icon?: string; url?: string }
type NavSection = {
  key: string
  label: string
  isTitle?: boolean
  icon?: string
  url?: string
  children?: NavChild[]
}

defineProps<{ collapsed?: boolean }>()

const route = useRoute()

const menu: NavSection[] = [
  { key: 'overview-title', label: 'Overview', isTitle: true },
  {
    key: 'dashboards',
    label: 'Info Center',
    icon: 'lucide:gauge',
    children: [{ key: 'hr', label: 'Home', icon: 'lucide:home', url: '/dashboard' }],
  },
  { key: 'apps-title', label: 'Apps', isTitle: true },
  {
    key: 'extension',
    label: 'Extension',
    icon: 'lucide:picture-in-picture-2',
    children: [
      { key: 'extension-list', label: 'Extensions', icon: 'lucide:blocks', url: '/extension/index' },
      { key: 'dom-selector', label: 'DOM Selector', icon: 'lucide:code', url: '/extension/dom-selector' },
      { key: 'extension-logs', label: 'Logs', icon: 'lucide:scroll-text', url: '/extension/logs' },
    ],
  },
  { key: 'account-title', label: 'Account', isTitle: true },
  {
    key: 'integration',
    label: 'Integrations',
    icon: 'lucide:hand-coins',
    url: '/integrations/payment',
  },
]

const openGroups = ref<Set<string>>(new Set(['dashboards', 'extension']))

function toggleGroup(key: string) {
  if (openGroups.value.has(key)) {
    openGroups.value.delete(key)
  } else {
    openGroups.value.add(key)
  }
}

function isActive(url?: string) {
  if (!url) return false
  return route.path === url || route.path.startsWith(url + '/')
}

function isGroupActive(section: NavSection) {
  return section.children?.some((c) => isActive(c.url))
}
</script>
