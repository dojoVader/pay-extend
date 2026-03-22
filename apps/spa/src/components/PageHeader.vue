<template>
  <div class="mb-6">
    <p v-if="subtitle" class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{{ subtitle }}</p>
    <h1 class="text-xl font-semibold text-gray-900">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>
