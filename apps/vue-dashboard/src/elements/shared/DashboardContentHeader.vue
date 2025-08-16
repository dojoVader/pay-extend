<script setup lang="ts">


</script>

<template>
<div class="dashboard-content-header">

  <div class="title-heading flex flex-col p-2">
      <slot name="title"></slot>
  </div>
</div>
</template>

<style scoped>
.dashboard-content-header {
  background: #111111;
  margin-left: 0.5%;
  border-radius: 6px;
  margin-top: 0.5%;
  margin-right: 0.5%;
  border: 1px solid #1e1e1e;
}

.title-heading{
  padding: 1% 2%;
}

</style>