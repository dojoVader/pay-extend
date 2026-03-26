<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from '@/stores/theme'

// Initialize theme on app start so the dark class is applied on every page
useTheme()
</script>
