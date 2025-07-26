
<template>
  <div class="extension-context-ui px-2 py-2 card flex justify-center">
    <Select v-model="selectedCity" :options="groupedCities" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder="Select Extension Settings" class="w-full md:w-56">
      <template #optiongroup="slotProps">
        <div class="flex items-center h-full">
          <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
          <div>{{ slotProps.option.label }}</div>
        </div>
      </template>
    </Select>
  </div>
</template>
<style>
.extension-context-ui .p-select{
  background: #171717;
  border-radius: 6px;
  padding: 3% 3%;
  border: 1px solid #202020;
  transition: all 0.5s ease-in-out;
  width: 100%;
  margin-right: 3%;
  font-size: 20px;
}
.p-select-label{
  color: #ffffff;
  font-size: 13px !important;
}
</style>
<script setup>
import { ref } from "vue";
import Select from 'primevue/select';

const selectedCity = ref();
const groupedCities = ref([
  {
    label: 'Approved Extensions',
    code: 'AE',
    items: [
      { label: 'XLabel', value: 'XLabel' },
      { label: 'ShopifyIntegration', value: 'ShopifyIntegration' },
      { label: 'GoogleAnalytics', value: 'GoogleAnalytics' },
      { label: 'SEOptimizer', value: 'SEOptimizer' }
    ]
  },


]);
</script>
