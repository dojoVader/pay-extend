<template>
  <div class="topbar-item hs-dropdown relative inline-flex">
    <button class="cursor-pointer bg-pink-100 rounded-full" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
      <img :src="avatar1" alt="user-image" class="hs-dropdown-toggle rounded-full size-9.5" />
    </button>
    <div class="hs-dropdown-menu min-w-48" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-with-icons">
      <div class="p-2">
        <RouterLink to="" class="flex gap-3">
          <div class="relative inline-block">
            <div class="rounded bg-default-200">
              <img :src="avatar1" alt="" class="size-12 rounded" />
            </div>
            <span class="-top-1 -end-1 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h6 class="mb-1 text-sm font-semibold text-default-800">{{ name }}</h6>
            <p class="text-default-500">{{role}}</p>
          </div>
        </RouterLink>
      </div>
      <div class="border-t border-t-default-200 -mx-2 my-2"></div>
      <div class="flex flex-col gap-y-1">
        <div class="border-t border-default-200 -mx-2 my-1"></div>
        <RouterLink class="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded" @click="auth.logout()" to="/auth/login" >
          <Icon icon="lucide:log-out" class="size-4"></Icon>
          Sign Out
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import avatar1 from '@/assets/images/user/avatar-1.png'
import { RouterLink } from 'vue-router';
import { ref } from "vue";
import { useAuth } from "@/stores/auth.ts";

const name = ref('');
const role = ref('');
const auth = useAuth();
const decodedToken = auth.getUser();

console.log(decodedToken);
name.value = decodedToken?.user?.name || 'User';
role.value = 'Admin';
</script>
