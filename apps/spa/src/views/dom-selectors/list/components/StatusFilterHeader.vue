<template>
  <div class="card-header">
    <div class="md:flex items-center md:space-y-0 space-y-4 gap-3">
      <div class="relative">
        <input type="email" class="form-input form-input-sm ps-9" placeholder="Search for name,email" />
        <div class="absolute inset-y-0 start-0 flex items-center ps-3">
          <Icon icon="lucide:search" class="size-3.5 flex items-center text-default-500 fill-default-100"></Icon>
        </div>
      </div>
      <select class="form-input form-input-sm">
        <option selected>select an extension</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>
