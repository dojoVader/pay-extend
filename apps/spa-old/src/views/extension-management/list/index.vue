<template>
  <Vertical>
    <PageTitle subtitle="Extensions" title="Extensions Manager" />
    <div class="card px-2 py-4">
      <div class="card-header">
        <div class="flex flex-col gap-1">
          <h6 class="card-title ">Extension List</h6>
          <small>The following extensions are managed by PayExtend</small>
        </div>

        <button class="btn btn-sm bg-primary text-white" aria-haspopup="dialog" aria-expanded="false" aria-controls="drawerEnd" data-hs-overlay="#drawerEnd"><Icon icon="lucide:plus" class="size-4 me-1"></Icon>Add Extension</button>
      </div>
      <StatusFilterHeader />
      <ExtensionTable />
    </div>
    <div id="drawerEnd" class="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-2xl z-80 bg-card border-e border-default-200" role="dialog" tabindex="-1" aria-labelledby="drawerEnd-label">
      <ExtensionAdd/>
    </div>
  </Vertical>
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import Vertical from '@/layouts/vertical.vue'
import StatusFilterHeader from './components/StatusFilterHeader.vue'
import ExtensionTable from './components/ExtensionTable.vue'
import { Icon } from '@iconify/vue'
import ExtensionAdd from "@/views/extension-management/list/components/ExtensionAdd.vue";
</script>
