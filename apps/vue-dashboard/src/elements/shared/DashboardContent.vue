<script setup lang="ts">
import DashboardContentHeader from "@/elements/shared/DashboardContentHeader.vue";
import ScrollPanel from 'primevue/scrollpanel';

</script>

<template>
<div class="dashboard-content-section  w-full h-full rounded-sm">
  <DashboardContentHeader>
    <template #title>
      <h3 class="text-xl text-white font-bold">Welcome User</h3>
      <span class="text-sm font-bold title-slogan">Friday, July 25, 2025</span>
    </template>
  </DashboardContentHeader>
  <ScrollPanel style="height: 100%">
  <div class="dashboard-content-body p-2">

  </div>
  </ScrollPanel>

</div>
</template>

<style scoped>
.dashboard-content-section{
  background: #171717;
  overflow: hidden;
}
.title-slogan{
  color: #a0a0a0;
  font-weight: 500;
}
.dashboard-content-body{
  background: #111111;
  margin-left: 0.5%;
  border-radius: 6px;
  margin-top: 0.5%;
  margin-right: 0.5%;
  border: 1px solid #1e1e1e;
  height: 98%;
  overflow-y: auto;
  padding-bottom: 2%;
}
</style>