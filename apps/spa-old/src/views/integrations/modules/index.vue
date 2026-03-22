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

        <!-- New Custom SMTP card -->
        <a href="/integrations/notification/smtp" class="card hover:bg-primary/10">
          <div class="card">
            <div class="card-body">
              <div class="flex gap-3 mb-5">
                <div class="grow">
                  <!-- Simple envelope icon -->
                  <svg viewBox="0 0 24 24" height="32"  fill="white" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 18L9 12M20 18L15 12M3 8L10.225 12.8166C10.8665 13.2443 11.1872 13.4582 11.5339 13.5412C11.8403 13.6147 12.1597 13.6147 12.4661 13.5412C12.8128 13.4582 13.1335 13.2443 13.775 12.8166L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>

                <div class="shrink-0">
                  <button type="button" class="btn btn-sm border-primary border-dashed text-primary hover:bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block size-3"><path d="M4 4h16v16H4z"></path></svg>
                    Configure
                  </button>
                </div>
              </div>
              <h6 class="mb-2 text-base">Custom SMTP</h6>
              <p class="text-default-500">Configure SMTP server for outgoing emails</p>
            </div>
          </div><!--end col-->
        </a>

        <!-- New Chrome Webstore card -->
        <a href="/integrations/extension/chrome-webstore" class="card hover:bg-primary/10">
          <div class="card">
            <div class="card-body">
              <div class="flex gap-3 mb-5">
                <div class="grow">
                  <!-- Chrome icon -->
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.8195 6.9C14.6795 6.28 17.5795 6.19 20.4495 6.66C18.6795 3.86 15.5595 2 11.9995 2C8.88953 2 6.10953 3.42 4.26953 5.65C4.70953 6.95 5.26953 8.19 5.93953 9.37C6.31953 10.05 7.28953 10.02 7.67953 9.35C8.52953 7.92 10.0595 6.96 11.8195 6.9Z" fill="white"></path> <path d="M7.72002 14.7214C5.72002 12.5814 4.16002 10.1414 3.09002 7.44141C1.59002 10.4014 1.60002 14.0314 3.43002 17.0814C5.03002 19.7514 7.67002 21.4114 10.53 21.8414C11.42 20.7914 12.2 19.6714 12.87 18.5014C13.26 17.8214 12.73 17.0114 11.95 17.0114C10.28 17.0214 8.67002 16.2014 7.72002 14.7214Z" fill="white"></path> <path d="M8.57031 11.9982C8.57031 12.6082 8.72031 13.1782 9.03031 13.7182C9.64031 14.7682 10.7703 15.4282 11.9903 15.4282C13.2103 15.4282 14.3503 14.7682 14.9503 13.7182C15.2603 13.1782 15.4203 12.6082 15.4203 11.9982C15.4203 10.1082 13.8803 8.57817 11.9903 8.57817C10.1103 8.56817 8.57031 10.1082 8.57031 11.9982Z" fill="white"></path> <path d="M21.3402 8.41931C19.9702 8.12931 18.5802 7.96931 17.2002 7.94931C16.4102 7.93931 15.9602 8.79931 16.3502 9.48931C16.7502 10.1993 16.9802 11.0193 16.9802 11.8893C16.9802 12.7293 16.7602 13.5593 16.3502 14.2993C15.4102 17.1793 14.0102 19.7393 12.1602 21.9993C17.6102 21.9093 22.0002 17.4693 22.0002 11.9993C22.0002 10.7393 21.7702 9.52931 21.3402 8.41931Z" fill="white"></path> </g></svg>
                </div>

                <div class="shrink-0">
                  <button type="button" class="btn btn-sm border-primary border-dashed text-primary hover:bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block size-3"><path d="M4 4h16v16H4z"></path></svg>
                    Setup
                  </button>
                </div>
              </div>
              <h6 class="mb-2 text-base">Chrome Webstore</h6>
              <p class="text-default-500">Validate Chrome Webstore extension</p>
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


