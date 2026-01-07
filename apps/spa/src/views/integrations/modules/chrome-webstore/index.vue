<template>
  <Vertical>
    <PageTitle subtitle="Extension" title="Chrome Webstore Settings" />
    <div id="integration" class="" role="tabpanel" aria-labelledby="integrationTabs">
      <div class="card h-auto p-0">
        <!-- Chrome Webstore Configuration -->
        <div class="stripe-region flex flex-row gap-1 px-8 py-8 w-full">
          <div class="w-2/6 flex flex-col gap-1">
            <h3 class="text-white text-lg">Chrome Webstore API</h3>
            <p>Configure your Chrome Webstore API credentials for publishing extensions</p>
          </div>
          <div class="w-4/6 flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-300 mr-2">Status:</span>
              <span class="badge py-0.5 px-2.5 text-sm capitalize font-medium rounded-full text-white " :class="{
                'bg-info': isConfigured ,
                'bg-red-600': !isConfigured
              }">{{integrationStatus ?? 'Configured'}}</span>
            </div>
          </div>
        </div>

        <div class="stripe-settings px-8 py-6">
          <!-- API Credentials -->
          <div class="flex flex-row items-start gap-4 py-4 border-t border-gray-700">
            <div class="w-2/6">
              <h3 class="text-white text-lg">API Credentials</h3>
              <p class="text-sm text-gray-300">Enter your Chrome Webstore API client ID and secret.</p>
            </div>

            <div class="w-4/6 flex flex-col gap-3">
              <div>
                <label class="text-sm text-gray-300">Client ID</label>
                <input
                  type="text"
                  v-model="chromeConfig.clientId"
                  placeholder="Your Client ID"
                  class="form-input w-full"
                  readonly
                />
              </div>

              <div>
                <label class="text-sm text-gray-300">Client Secret</label>
                <div class="relative">
                  <input
                    :type="showSecret ? 'text' : 'password'"
                    v-model="chromeConfig.clientSecret"
                    placeholder="••••••••"
                    class="form-input w-full pr-10"
                    readonly
                  />
                  <button
                    type="button"
                    @click="showSecret = !showSecret"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg v-if="showSecret" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tokens -->
          <div class="flex flex-row items-start gap-4 py-4 border-t border-gray-700">
            <div class="w-2/6">
              <h3 class="text-white text-lg">Tokens</h3>
              <p class="text-sm text-gray-300">Provide your refresh token for API access.</p>
            </div>

            <div class="w-4/6 flex flex-col gap-3">
              <div>
                <label class="text-sm text-gray-300">Refresh Token</label>
                <div class="relative">
                  <input
                    :type="showRefresh ? 'text' : 'password'"
                    v-model="chromeConfig.refreshToken"
                    placeholder=""
                    readonly
                    class="form-input w-full pr-10"

                  />
                  <button
                    type="button"
                    @click="showRefresh = !showRefresh"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg v-if="showRefresh" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </div>
              </div>


            </div>
          </div>

          <!-- Additional Settings -->
          <div class="flex flex-row items-start gap-4 py-4 border-t border-gray-700">
            <div class="w-2/6">
              <h3 class="text-white text-lg">Publisher ID</h3>
              <p class="text-sm text-gray-300">Chrome Webstore Publisher ID</p>
            </div>

            <div class="w-4/6 flex flex-col gap-3">
              <div>
                <label class="text-sm text-gray-300">Publisher ID</label>
                <input
                  type="text"
                  v-model="chromeConfig.publisherID"
                  placeholder="Your Publisher ID"
                  class="form-input w-full pr-10"

                />
              </div>
              <div class="flex gap-2">
                <button class="btn btn-primary" @click="saveConfig">Save Settings</button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </Vertical>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import Vertical from '@/layouts/vertical.vue'
import { PAYEXTEND_BASE_URL } from "@/constant";

const chromeConfig = reactive({
  clientId: '',
  clientSecret: '',
  refreshToken: '',
  notes: '',
  publisherID: '',
})

const showSecret = ref(false)
const showRefresh = ref(false)
const integrationStatus = ref('')
const isConfigured = ref(false)

onMounted(() => {

  getConfig()
});

async function getConfig(){
  const response = await fetch(`${PAYEXTEND_BASE_URL}chrome-webstore/config`)
  const data = await response.json()
  if(response.status === 200){
    chromeConfig.clientId = data.clientId
    chromeConfig.clientSecret = data.secret
    chromeConfig.refreshToken = data.refreshToken
    chromeConfig.publisherID = data.publisherID
  }else{
    errorCode.value = data.statusCode;

  }
  integrationStatus.value = data.message;
}

function saveConfig() {
  // TODO: Replace with real API call / secure storage
  console.log('Saving Chrome Webstore config', chromeConfig)
  // For now, save to localStorage
  localStorage.setItem('chrome_webstore_config', JSON.stringify(chromeConfig))
}

function testConnection() {
  // TODO: Implement actual Chrome Webstore API test
  console.log('Testing Chrome Webstore connection', chromeConfig)
}
</script>

<style scoped>

</style>
