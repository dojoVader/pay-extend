<template>
  <Vertical>
    <PageTitle subtitle="Payment" title="Integrations" />
    <div id="integration" class="" role="tabpanel" aria-labelledby="integrationTabs">
      <h6 class="mb-4 text-[15px]">Payment Integrations</h6>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <a href="/integrations/payment/stripe" class="card hover:bg-primary/10">
          <div class="card">
            <div class="card-body">
              <div class="flex gap-3 mb-5">
                <div class="grow">
                  <svg fill="#ffffff" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.706 9.663c0-1.394 1.162-1.931 3.025-1.931 2.713 0 6.156 0.831 8.869 2.294v-8.393c-2.956-1.181-5.906-1.631-8.863-1.631-7.231 0-12.050 3.775-12.050 10.087 0 9.869 13.55 8.269 13.55 12.525 0 1.65-1.431 2.181-3.419 2.181-2.95 0-6.763-1.219-9.756-2.844v8.031c3.079 1.329 6.396 2.017 9.75 2.025 7.413 0 12.519-3.188 12.519-9.6 0-10.637-13.625-8.731-13.625-12.744z"></path> </g></svg>
                </div>

                <div class="shrink-0">
                  <button type="button" class="btn btn-sm border-primary border-dashed text-primary hover:bg-primary/10"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="cable" class="lucide lucide-cable inline-block size-3"><path d="M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z"></path><path d="M17 21v-2"></path><path d="M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10"></path><path d="M21 21v-2"></path><path d="M3 5V3"></path><path d="M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z"></path><path d="M7 5V3"></path></svg> Setup</button>
                </div>
              </div>
              <h6 class="mb-2 text-base">Stripe</h6>
              <p class="text-default-500">Stripe Integration using Payment Links</p>
            </div>
          </div><!--end col-->
        </a>
        <a href="/integrations/payment/firebase-admin" class="card hover:bg-primary/10">
        <div class="card">
          <div class="card-body">
            <div class="flex gap-3 mb-5">
              <div class="grow">
              <!-- Firebase Logo -->
                <svg viewBox="0 0 32 32" height="32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>file_type_firebase</title><path d="M5.8,24.6l.17-.237L13.99,9.149l.017-.161L10.472,2.348a.656.656,0,0,0-1.227.207Z" style="fill:#ffc24a"></path><path d="M5.9,24.42l.128-.25L13.965,9.114,10.439,2.448a.6.6,0,0,0-1.133.206Z" style="fill:#ffa712"></path><path d="M16.584,14.01l2.632-2.7L16.583,6.289a.678.678,0,0,0-1.195,0L13.981,8.971V9.2Z" style="fill:#f4bd62"></path><path d="M16.537,13.9l2.559-2.62L16.537,6.4a.589.589,0,0,0-1.074-.047L14.049,9.082l-.042.139Z" style="fill:#ffa50e"></path><polygon points="5.802 24.601 5.879 24.523 6.158 24.41 16.418 14.188 16.548 13.834 13.989 8.956 5.802 24.601" style="fill:#f6820c"></polygon><path d="M16.912,29.756,26.2,24.577,23.546,8.246A.635.635,0,0,0,22.471,7.9L5.8,24.6l9.233,5.155a1.927,1.927,0,0,0,1.878,0" style="fill:#fde068"></path><path d="M26.115,24.534,23.483,8.326a.557.557,0,0,0-.967-.353L5.9,24.569l9.131,5.1a1.912,1.912,0,0,0,1.863,0Z" style="fill:#fcca3f"></path><path d="M16.912,29.6a1.927,1.927,0,0,1-1.878,0L5.876,24.522,5.8,24.6l9.233,5.155a1.927,1.927,0,0,0,1.878,0L26.2,24.577l-.023-.14Z" style="fill:#eeab37"></path></g></svg>
              </div>

              <div class="shrink-0">
                <button type="button" class="btn btn-sm border-primary border-dashed text-primary hover:bg-primary/10"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="cable" class="lucide lucide-cable inline-block size-3"><path d="M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z"></path><path d="M17 21v-2"></path><path d="M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10"></path><path d="M21 21v-2"></path><path d="M3 5V3"></path><path d="M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z"></path><path d="M7 5V3"></path></svg> Setup</button>
              </div>
            </div>
            <h6 class="mb-2 text-base">Firebase</h6>
            <p class="text-default-500">Configure Firestore Database for Stripe Histories</p>
          </div>
        </div><!--end col-->
        </a>





      </div><!--end grid-->
    </div>
  </Vertical>
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import Vertical from '@/layouts/vertical.vue'
</script>


