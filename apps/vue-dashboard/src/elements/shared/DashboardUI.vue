<script setup lang="ts">

import DashboardSidebar from "@/elements/shared/DashboardSidebar.vue";
import DashboardContent from "@/elements/shared/DashboardContent.vue";
</script>

<template>
<div class="dashboard-ui-layout p-10 w-full m-5 h-full">
  <div class="dashboard-content w-full px-2 py-2 h-full flex flex-row">
    <DashboardSidebar class="dashboard-sidebar"/>
    <DashboardContent class="dashboard-content-section flex-1"/>

  </div>

</div>
</template>

<style scoped>
.dashboard-content{
  background: #111111;
  border-radius: 7px;
}
.dashboard-sidebar{
  width: 250px;
  height: 100%;
}

</style>