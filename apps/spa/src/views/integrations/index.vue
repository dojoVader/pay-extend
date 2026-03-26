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
            <Icon :icon="integration.icon" class="text-xl" :style="{ color: integration.iconColor }" />
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
    name: 'Stripe',
    description: 'Stripe integration using Payment Links for subscriptions and one-time payments.',
    href: '/integrations/payment/stripe',
    action: 'Setup',
    icon: 'simple-icons:polar',
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
