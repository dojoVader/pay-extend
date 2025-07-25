<script setup lang="ts">

</script>

<template>
<div class="menu-item">
  <div class="menu-item-icon">
    <slot name="icon"></slot>
  </div>
  <div class="menu-item-label">
    <slot name="label"></slot>
  </div>

</div>
</template>

<style>
.menu-item-label{
  span{
    color:grey;
  }
}
</style>