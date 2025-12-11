<template>
  <div class="grid lg:grid-cols-4 grid-cols-1 mb-5 gap-5">
    <div class="lg:col-span-2">
      <h5 class="mb-2 text-xl text-default-800 font-semibold">Welcome User</h5>
      <p>

        <RouterLink to="" class="underline text-default-900">The Dashboard</RouterLink> contains analytics, records and events integrated to your extension.
        <RouterLink to="" class="text-danger">Learn More</RouterLink>
      </p>
    </div>

    <div class="lg:col-start-4">
      <div class="card">
        <div class="card-body">
          <div class="grid grid-cols-3">
            <div class="px-4 text-center border-e border-default-200 text-sm">
              <h6 class="mb-1 font-bold">
                <span class="counter-value text-default-800" data-target="36">0</span>
              </h6>
              <p class="text-default-500">Approved</p>
            </div>

            <div class="px-4 text-center border-e border-default-200 text-sm">
              <h6 class="mb-1 font-bold">
                <span class="counter-value text-default-800" data-target="465">0</span>
              </h6>
              <p class="text-default-500">Pending</p>
            </div>

            <div class="px-4 text-center text-sm">
              <h6 class="mb-1 font-bold">
                <span class="counter-value text-default-800" data-target="50">0</span>
              </h6>
              <p class="text-default-500">Rejected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>
