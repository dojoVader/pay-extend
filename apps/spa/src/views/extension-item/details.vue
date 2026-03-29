<template>
  <div class="mb-6 flex flex-col gap-1">
    <div class="flex items-center gap-2">
      <span class="text-xs font-medium text-gray-400 uppercase tracking-wide">Extension ID</span>
      <span class="font-mono text-sm text-gray-700">{{ extensionItemId ?? "—" }}</span>
    </div>
    <p class="text-sm text-gray-500 max-w-2xl">{{ description ?? "—" }}</p>
  </div>

  <Tabs value="product">
    <TabList>
      <Tab value="product">Product</Tab>
      <Tab value="checkout">Checkout Sessions</Tab>
      <Tab value="analytics">Analytics</Tab>
      <Tab value="refunds">Refunds</Tab>
    </TabList>

    <TabPanels>
      <TabPanel value="product">
        <ProductPanel />
      </TabPanel>
      <TabPanel value="checkout">
        <CheckoutPanel />
      </TabPanel>
      <TabPanel value="analytics">
        <AnalyticsPanel />
      </TabPanel>
      <TabPanel value="refunds">
        <RefundsPanel />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup lang="ts">
defineProps<{
  extensionId?: number
  extensionItemId?: string
  description?: string
}>();

import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import DiscountPanel from "./discount/index.vue";
import ProductPanel from "./product/index.vue";
import CheckoutPanel from "./checkout/index.vue";
import AnalyticsPanel from "./analytics/index.vue";
import RefundsPanel from "./refunds/index.vue";
</script>
