<template>
  <AppLayout>
    <PageHeader title="Integrations" subtitle="Payment" />

    <h2 class="text-sm font-semibold text-gray-700 mb-4">Payment Integrations</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <a
        v-for="integration in integrations"
        :key="integration.name"
        :href="integration.href"
        class="card p-5 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group block"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="{ backgroundColor: integration.iconBg }">
            <Icon :icon="integration.icon" class="text-xl" :style="{ color: integration.iconColor }" v-if="integration.name !== 'Polar'" />
            <div v-else v-html="integration.icon">
 
            </div>
          </div>
          <span class="btn btn-secondary btn-sm text-indigo-600 border-indigo-200 group-hover:bg-indigo-50">
            <Icon icon="lucide:cable" class="text-xs" />
            {{ integration.action }}
          </span>
        </div>
        <h3 class="font-semibold text-gray-900 text-sm mb-1">{{ integration.name }}</h3>
        <p class="text-xs text-gray-400 leading-relaxed">{{ integration.description }}</p>
      </a>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader.vue'

const integrations = [
  {
    name: 'Polar',
    description: 'Polar integration using Checkout Links for subscriptions and one-time payments.',
    href: '/integrations/payment/stripe',
    action: 'Setup',
    icon: '<svg viewBox="-0.5 -0.5 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="Polar-Sh--Streamline-Iconoir" height="16" width="16">\n' +
      '  <desc>\n' +
      '    Polar Sh Streamline Icon: https://streamlinehq.com\n' +
      '  </desc>\n' +
      '  <path d="M7.5 14.337187499999999C3.7239375000000003 14.337187499999999 0.6628125 11.276062499999998 0.6628125 7.5 0.6628125 3.7239375000000003 3.7239375000000003 0.6628125 7.5 0.6628125c3.7760624999999997 0 6.837187500000001 3.061125 6.837187500000001 6.837187500000001 0 3.7760624999999997 -3.061125 6.837187500000001 -6.837187500000001 6.837187500000001Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></path>\n' +
      '  <path d="M7.5 14.337187499999999c-1.5104375 0 -2.7348749999999997 -3.061125 -2.7348749999999997 -6.837187500000001C4.765125 3.7239375000000003 5.9895625 0.6628125 7.5 0.6628125c1.5103749999999998 0 2.7348749999999997 3.061125 2.7348749999999997 6.837187500000001 0 3.7760624999999997 -1.2245 6.837187500000001 -2.7348749999999997 6.837187500000001Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></path>\n' +
      '  <path d="M5.4488125 13.653500000000001c-2.051125 -0.6837500000000001 -2.7348749999999997 -3.6845624999999997 -2.7348749999999997 -5.811625 0 -2.1270625 1.025625 -4.7860625 3.418625 -6.495375" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></path>\n' +
      '  <path d="M9.551187500000001 1.3464999999999998c2.051125 0.6837500000000001 2.7348749999999997 3.6846250000000005 2.7348749999999997 5.811625 0 2.1270625 -1.025625 4.7860625 -3.418625 6.495375" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></path>\n' +
      '</svg>',
    iconBg: '#f5f3ff',
    iconColor: '#6366f1',
  },
  {
    name: 'Firebase',
    description: 'Configure Firestore Database for Stripe payment histories and user records.',
    href: '/integrations/payment/firebase-admin',
    action: 'Setup',
    icon: 'simple-icons:firebase',
    iconBg: '#fff7ed',
    iconColor: '#f59e0b',
  },
  {
    name: 'Custom SMTP',
    description: 'Configure SMTP server for sending transactional and notification emails.',
    href: '/integrations/notification/smtp',
    action: 'Configure',
    icon: 'lucide:mail',
    iconBg: '#f0fdf4',
    iconColor: '#10b981',
  },
  {
    name: 'Chrome Webstore',
    description: 'Validate and publish extensions via the Chrome Web Store API.',
    href: '/integrations/extension/chrome-webstore',
    action: 'Setup',
    icon: 'simple-icons:googlechrome',
    iconBg: '#eff6ff',
    iconColor: '#3b82f6',
  },
]
</script>
