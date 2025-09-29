<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ProductService } from '@/data/extension';
import DataView from 'primevue/dataview';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ExtensionContextAdd from '../elements/shared/ExtensionContextAdd.vue';


const showAddModal = ref(false);

const ROWS_PER_PAGE = 5;

onMounted(() => {
  ProductService.getProductsSmall().then((data) => {
    products.value = data;
    totalRecords.value = data.length;
  });
});

const products = ref();
const totalRecords = ref(0);
const getSeverity = (product: any): HintedString => {
  switch (product.status) {
    case 'active':
      return 'success';

    case 'pending':
      return 'danger';

    default:
      return null;
  }
};
</script>

<template>
  <div class="execution-context p-5 flex flex-col gap-6">
    <div class="flex flex-col gap-1">
      <h4 class="mt-3 text-1xl text-white">Stats</h4>
    </div>
    <div class="extension-stats mt-4">
      <div class="flex flex-row gap-4">
        <div class="bg-transparent stat-item p-5 rounded-lg flex-1">
          <h3 class="text-1xl text-white">Approved Extensions</h3>
          <p class="text-white text-2xl">4</p>
        </div>
        <div class="bg-transparent stat-item p-5 rounded-lg flex-1">
          <h3 class="text-1xl text-white">Pending Extensions</h3>
          <p class="text-white text-2xl">2</p>
        </div>
        <div class="bg-transparent stat-item p-5 rounded-lg flex-1">
          <h3 class="text-1xl text-white">Rejected Extensions</h3>
          <p class="text-white text-2xl">1</p>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-between items-center gap-1 mt-5">
      <div>
        <h4 class="mt-3 text-1xl text-white">Extension Apps</h4>
        <span class="text-sm font-bold text-gray-400">View existing extensions</span>
      </div>
      <div>
        <Button label="Add Extension" rounded @click="showAddModal = true" />
      </div>
    </div>

    <!-- Modal for Add Extension -->
    <Dialog :visible="showAddModal" :closable="false" :style="{ width: '50%' }" modal
      @click.self="showAddModal = false">
        <ExtensionContextAdd @close="showAddModal = false"  />

    </Dialog>

    <div class="extension-data-grid pb-5">
      <DataView :paginator="true" class="mb-5" :total-records="totalRecords" :rowsPerPageOptions="[5, 10, 20]"
        :rows="ROWS_PER_PAGE" :value="products">
        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div class="flex flex-col sm:flex-row sm:items-center p-6 gap" :class="{
                'border-t border-surface-200 dark:border-surface-700':
                  index !== 0,
              }">
                <div class="md:w-40 relative">
                  <img class="block xl:block mx-auto rounded w-2/6 h-2/6 object-cover" :src="`${item.extensionLogoUrl}`"
                    :alt="item.extensionName" />
                </div>
                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                  <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                    <div>
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                        item.extensionDescription }}</span>
                      <div class="text-lg font-medium mt-2">
                        {{ item.extensionName }}
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col md:items-end gap-8">
                    <div class="flex flex-row-reverse md:flex-row gap-2">
                      <Tag :value="item.status === 'active'
                        ? 'Approved'
                        : item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)
                        " :severity="getSeverity(item)"></Tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>

<style scoped>
:root {}

.stat-item {
  background: #1e1e1e;
  border: 1px solid #2c2c2c;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  max-width: 240px;
}

.p-dataview {
  height: auto;
}

.p-button {
  --p-button-padding-x: 0.7rem;
  --p-button-padding-y: 0.4rem;
  font-size: 0.8rem;
}

.extension-data-grid {
  height: 400px;
  padding-bottom: 3%;
}
</style>
