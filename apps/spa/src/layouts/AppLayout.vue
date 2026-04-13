<template>
  <div class="flex h-screen overflow-hidden bg-gray-50 dark:bg-black">
    <Sidebar :collapsed="sidebarCollapsed" />

    <!-- Main area -->
    <div
      class="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-200"
      :class="sidebarCollapsed ? 'ml-16' : 'ml-60'"
    >
      <Topbar @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />

      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'

const sidebarCollapsed = ref(false)
</script>
