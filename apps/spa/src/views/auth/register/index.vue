<template>
  <div class="min-h-screen flex items-stretch bg-gray-800 text-white">
    <!-- Left sidebar -->
    <aside class="w-80 bg-gray-900/80 px-8 py-10 hidden md:flex flex-col gap-8">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">

        </div>
        <h1 class="text-lg font-semibold">{{ appName }}</h1>
      </div>

      <nav class="flex-1">
        <ol class="space-y-6">
          <li v-for="(s) in steps" :key="s.title" class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div v-html="s.svgIcon" class="w-5 h-5"></div>
            </div>

            <div class="flex flex-col">

              <p class="text-sm font-semibold">{{ s.title }}</p>
              <p class="text-xs text-white">{{ s.subtitle }}</p>
            </div>
          </li>
        </ol>
      </nav>

      <div class="text-sm text-white">
        <a href="#" class="inline-flex items-center gap-2 hover:text-white"> A Retani Consult toolkit for SAAS Chrome Extensions</a>
      </div>
    </aside>

    <!-- Right panel (main) -->
    <main class="flex-1 flex justify-center px-6">
      <div class="max-w-md w-full">
        <div class="flex flex-col gap-1 mb-6 mt-10">
          <h2 class="text-2xl font-semibold text-left">Welcome to {{ appName }}</h2>
          <p class="text-sm text-white">Setup company details to get started.</p>
        </div>

        <form @submit.prevent="createAccount" class="space-y-8">
          <div>
            <label for="workspace" class="block text-sm font-medium text-white mb-2">
              e.g Your organization name
            </label>
            <input type="text" id="workspace" placeholder="Organization Name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-white mb-2">
              Your support email address
            </label>
            <p class="text-sm text-amber-50 mb-4">Add email address, all logs and notifications will be sent to this address.</p>
            <input v-model="form.email" type="email" id="email" placeholder="e.g support@email.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">

          </div>

          <!-- Added username and password fields -->
          <div>
            <label for="username" class="block text-sm font-medium text-white mb-2">Username</label>
            <input v-model="form.username" type="text" id="username" placeholder="e.g johndoe" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-white mb-2">Password</label>
            <input v-model="form.password" type="password" id="password" placeholder="Choose a password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
          </div>



          <div class="pt-6">
            <button type="submit" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition">
              Save and continue
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { appName } from "@/helpers";

const stripeSvg = `<svg fill="#ffffff" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>Stripe icon</title><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"></path></g></svg>`;


const steps = [
  { title: 'Stripe Integration', subtitle: 'Accept Stripe Payments with minimal config', svgIcon: stripeSvg },
  {title: 'Logs', subtitle: 'View extension logs and errors in one place', svgIcon: `<svg fill="#ffffff" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>Logs icon</title><path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"></path><path d="M16.7071 7.29289C16.3166 6.90237 15.6834 6.90237 15.2929 7.29289L10.2929 12.2929C9.90237 12.6834 9.90237 13.3166 10.2929 13.7071L13.2929 16.7071C13.6834 17.0976 14.3166 17.0976 14.7071 16.7071C15.0976 16.3166 15.0976 15.6834 14.7071 15.2929L11.4142 12L16.7071 7.29289Z"></path></g></svg>` },
  {title: 'DOM Selector', subtitle: 'Easily manage DOM elements for your extensions', svgIcon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>language_xml</title>  <path d="M12.89,3l2,.4L11.11,21l-2-.4L12.89,3m6.7,9L16,8.41V5.58L22.42,12,16,18.41V15.58L19.59,12m-18,0L8,5.58V8.41L4.41,12,8,15.58v2.83Z"></path> </g></svg>` }
]

const activeStep = ref(0)

const form = ref({ email: '', username: '', password: '' })

function createAccount() {
  // small client-side validation and step progression adapted for this setup page
  if (!form.value.email) {
    // in a real app show toast / inline errors
    alert('Please provide a support email address')
    return
  }

  // simulate success and move to next step
  if (activeStep.value < steps.length - 1) {
    activeStep.value++
  } else {
    // finished onboarding
    alert('Setup complete — this is a demo flow')
  }
}
</script>
