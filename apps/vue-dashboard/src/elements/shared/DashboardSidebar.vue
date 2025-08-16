<script setup lang="ts">

import PayExtendIcon from "@/elements/icons/PayExtendIcon.vue";
import DashboardMenuItem from "@/elements/shared/DashboardMenuItem.vue";
import DashboardExtensionContext from "@/elements/shared/DashboardExtensionContext.vue";
</script>

<template>
<div class="sidebar-ui">
  <DashboardExtensionContext />
  <div class="flex h-[91%] flex-col justify-between">
    <div class="sidebar-menu-list p-0 flex flex-col gap-2">
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14" stroke="#a8a8a8" stroke-width="1.5"></path> </g></svg>
        </template>
        <template #label>
          <span class="">Dashboard</span>
        </template>
      </DashboardMenuItem>
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <path d="M21 7.5L17 9.5M12 12L3 7.5M12 12V21.5M12 12C12 12 14.7426 10.6287 16.5 9.75C16.6953 9.65237 17 9.5 17 9.5M17 9.5V13M17 9.5L7.5 4.5" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
        </template>
        <template #label>
          <span class="">Extensions</span>
        </template>
      </DashboardMenuItem>
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 22H21" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 11C3 10.0572 3 9.58579 3.29289 9.29289C3.58579 9 4.05719 9 5 9C5.94281 9 6.41421 9 6.70711 9.29289C7 9.58579 7 10.0572 7 11V17C7 17.9428 7 18.4142 6.70711 18.7071C6.41421 19 5.94281 19 5 19C4.05719 19 3.58579 19 3.29289 18.7071C3 18.4142 3 17.9428 3 17V11Z" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M10 7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5C12.9428 5 13.4142 5 13.7071 5.29289C14 5.58579 14 6.05719 14 7V17C14 17.9428 14 18.4142 13.7071 18.7071C13.4142 19 12.9428 19 12 19C11.0572 19 10.5858 19 10.2929 18.7071C10 18.4142 10 17.9428 10 17V7Z" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M17 4C17 3.05719 17 2.58579 17.2929 2.29289C17.5858 2 18.0572 2 19 2C19.9428 2 20.4142 2 20.7071 2.29289C21 2.58579 21 3.05719 21 4V17C21 17.9428 21 18.4142 20.7071 18.7071C20.4142 19 19.9428 19 19 19C18.0572 19 17.5858 19 17.2929 18.7071C17 18.4142 17 17.9428 17 17V4Z" stroke="#a8a8a8" stroke-width="1.5"></path> </g></svg>
        </template>
        <template #label>
          <span class="">Stats</span>
        </template>
      </DashboardMenuItem>
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 17V18" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <path d="M16.5 17V18" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <path d="M14 17V18" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <path d="M11.5 17V18" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <path d="M19 5.11765L19.7204 4.90886L19.718 4.90062L19.7154 4.89243L19 5.11765ZM5 5.11765L4.28461 4.89243L4.28204 4.90062L4.27965 4.90886L5 5.11765ZM2.88886 20.6431L3.32203 20.0308L2.88886 20.6431ZM2.33706 20.0589L2.97133 19.6586L2.33706 20.0589ZM21.6629 20.0589L21.0287 19.6586L21.6629 20.0589ZM21.1111 20.6431L20.678 20.0308L21.1111 20.6431ZM21.1111 13.9451L20.678 14.5574L21.1111 13.9451ZM21.6629 14.5294L21.0287 14.9296L21.6629 14.5294ZM2.88886 13.9451L3.32203 14.5574L2.88886 13.9451ZM2.33706 14.5294L2.97133 14.9296L2.33706 14.5294ZM7.5 3.75H16.5V2.25H7.5V3.75ZM16.5 3.75C16.9281 3.75 17.2532 3.85015 17.5156 4.05473C17.785 4.26479 18.0648 4.64466 18.2846 5.34286L19.7154 4.89243C19.4352 4.0024 19.0172 3.32344 18.4378 2.87174C17.8514 2.41455 17.1765 2.25 16.5 2.25V3.75ZM7.5 2.25C6.82355 2.25 6.14861 2.41455 5.56216 2.87174C4.98276 3.32344 4.56481 4.0024 4.28461 4.89243L5.71539 5.34286C5.93519 4.64466 6.21496 4.26479 6.48441 4.05473C6.74682 3.85015 7.07188 3.75 7.5 3.75V2.25ZM18.2796 5.32644L21.1312 15.1645L22.5719 14.7469L19.7204 4.90886L18.2796 5.32644ZM4.27965 4.90886L1.42813 14.7469L2.86884 15.1645L5.72035 5.32644L4.27965 4.90886ZM5.5 14.3382H18.5V12.8382H5.5V14.3382ZM18.5 20.25H5.5V21.75H18.5V20.25ZM5.5 20.25C4.78126 20.25 4.30195 20.249 3.93724 20.2097C3.58737 20.172 3.42829 20.106 3.32203 20.0308L2.45569 21.2554C2.85387 21.5371 3.29814 21.6495 3.77661 21.7011C4.24024 21.751 4.81428 21.75 5.5 21.75V20.25ZM1.25 17.2941C1.25 18.0229 1.24919 18.6228 1.29557 19.1056C1.34296 19.5988 1.44521 20.0509 1.70279 20.4591L2.97133 19.6586C2.89185 19.5327 2.82557 19.3459 2.78869 18.9621C2.75081 18.5678 2.75 18.0524 2.75 17.2941H1.25ZM3.32203 20.0308C3.18573 19.9344 3.06595 19.8085 2.97133 19.6586L1.70279 20.4591C1.90001 20.7716 2.15523 21.0428 2.45569 21.2554L3.32203 20.0308ZM21.25 17.2941C21.25 18.0524 21.2492 18.5678 21.2113 18.9621C21.1744 19.3459 21.1082 19.5327 21.0287 19.6586L22.2972 20.4591C22.5548 20.0509 22.657 19.5988 22.7044 19.1056C22.7508 18.6228 22.75 18.0229 22.75 17.2941H21.25ZM18.5 21.75C19.1857 21.75 19.7598 21.751 20.2234 21.7011C20.7019 21.6495 21.1461 21.5371 21.5443 21.2554L20.678 20.0308C20.5717 20.106 20.4126 20.172 20.0628 20.2097C19.6981 20.249 19.2187 20.25 18.5 20.25V21.75ZM21.0287 19.6586C20.9341 19.8085 20.8143 19.9344 20.678 20.0308L21.5443 21.2554C21.8448 21.0428 22.1 20.7716 22.2972 20.4591L21.0287 19.6586ZM18.5 14.3382C19.2187 14.3382 19.6981 14.3393 20.0628 14.3785C20.4126 14.4162 20.5717 14.4822 20.678 14.5574L21.5443 13.3329C21.1461 13.0512 20.7019 12.9387 20.2234 12.8872C19.7598 12.8372 19.1857 12.8382 18.5 12.8382V14.3382ZM22.75 17.2941C22.75 16.5653 22.7508 15.9654 22.7044 15.4827C22.657 14.9894 22.5548 14.5373 22.2972 14.1291L21.0287 14.9296C21.1082 15.0556 21.1744 15.2423 21.2113 15.6261C21.2492 16.0204 21.25 16.5358 21.25 17.2941H22.75ZM20.678 14.5574C20.8143 14.6538 20.9341 14.7797 21.0287 14.9296L22.2972 14.1291C22.1 13.8166 21.8448 13.5454 21.5443 13.3329L20.678 14.5574ZM5.5 12.8382C4.81428 12.8382 4.24024 12.8372 3.77661 12.8872C3.29814 12.9387 2.85387 13.0512 2.45569 13.3329L3.32203 14.5574C3.42829 14.4822 3.58737 14.4162 3.93724 14.3785C4.30195 14.3393 4.78126 14.3382 5.5 14.3382V12.8382ZM2.75 17.2941C2.75 16.5358 2.75081 16.0204 2.78869 15.6261C2.82557 15.2423 2.89185 15.0556 2.97133 14.9296L1.70279 14.1291C1.44521 14.5373 1.34296 14.9894 1.29557 15.4827C1.24919 15.9654 1.25 16.5653 1.25 17.2941H2.75ZM2.45569 13.3329C2.15523 13.5454 1.90001 13.8166 1.70279 14.1291L2.97133 14.9296C3.06595 14.7797 3.18573 14.6538 3.32203 14.5574L2.45569 13.3329Z" fill="#a8a8a8"></path> </g></svg>
        </template>
        <template #label>
          <span class="">Firebase Center</span>
        </template>
      </DashboardMenuItem>
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.76121 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.76121C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12L22 12Z" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M16 12C16 13.3132 15.8965 14.6136 15.6955 15.8268C15.4945 17.0401 15.1999 18.1425 14.8284 19.0711C14.457 19.9997 14.016 20.7362 13.5307 21.2388C13.0454 21.7413 12.5253 22 12 22C11.4747 22 10.9546 21.7413 10.4693 21.2388C9.98396 20.7362 9.54301 19.9997 9.17157 19.0711C8.80014 18.1425 8.5055 17.0401 8.30448 15.8268C8.10346 14.6136 8 13.3132 8 12C8 10.6868 8.10346 9.38642 8.30448 8.17316C8.5055 6.95991 8.80014 5.85752 9.17157 4.92893C9.54301 4.00035 9.98396 3.26375 10.4693 2.7612C10.9546 2.25866 11.4747 2 12 2C12.5253 2 13.0454 2.25866 13.5307 2.76121C14.016 3.26375 14.457 4.00035 14.8284 4.92893C15.1999 5.85752 15.4945 6.95991 15.6955 8.17317C15.8965 9.38642 16 10.6868 16 12L16 12Z" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M2 12H22" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
        </template>
        <template #label>
          <span class="">Locale</span>
        </template>
      </DashboardMenuItem>
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z" stroke="#a8a8a8" stroke-width="1.5"></path> <circle cx="12" cy="9" r="2" stroke="#a8a8a8" stroke-width="1.5"></circle> <path d="M16 15C16 16.1046 16 17 12 17C8 17 8 16.1046 8 15C8 13.8954 9.79086 13 12 13C14.2091 13 16 13.8954 16 15Z" stroke="#a8a8a8" stroke-width="1.5"></path> </g></svg>
        </template>
        <template #label>
          <span class="">Account</span>
        </template>
      </DashboardMenuItem>
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 8.78594C20.4123 8.4341 19.5955 7.56969 18.9199 6.60834C18.4965 6.00591 17.5655 6.04252 17.1055 6.62076C16.0541 7.94268 14.4844 9 12 9C9.49345 9 7.91806 7.65471 6.86651 6.38877C6.42721 5.85991 5.58617 5.86697 5.20168 6.43233C4.50078 7.46288 3.68402 8.41274 2 8.78594" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 18.7859C20.4123 18.4341 19.5955 17.5697 18.9199 16.6083C18.4965 16.0059 17.5655 16.0425 17.1055 16.6208C16.0541 17.9427 14.4844 19 12 19C9.49345 19 7.91806 17.6547 6.86651 16.3888C6.42721 15.8599 5.58617 15.867 5.20168 16.4323C4.50078 17.4629 3.68402 18.4127 2 18.7859" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 13.7859C20.4123 13.4341 19.5955 12.5697 18.9199 11.6083C18.4965 11.0059 17.5655 11.0425 17.1055 11.6208C16.0541 12.9427 14.4844 14 12 14C9.49345 14 7.91806 12.6547 6.86651 11.3888C6.42721 10.8599 5.58617 10.867 5.20168 11.4323C4.50078 12.4629 3.68402 13.4127 2 13.7859" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </template>
        <template #label>
          <span class="">Digital Ocean</span>
        </template>
      </DashboardMenuItem>
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.4142 10.4142C18 9.82843 18 8.88562 18 7C18 5.11438 18 4.17157 17.4142 3.58579M17.4142 10.4142C16.8284 11 15.8856 11 14 11H10C8.11438 11 7.17157 11 6.58579 10.4142M17.4142 10.4142C17.4142 10.4142 17.4142 10.4142 17.4142 10.4142ZM17.4142 3.58579C16.8284 3 15.8856 3 14 3L10 3C8.11438 3 7.17157 3 6.58579 3.58579M17.4142 3.58579C17.4142 3.58579 17.4142 3.58579 17.4142 3.58579ZM6.58579 3.58579C6 4.17157 6 5.11438 6 7C6 8.88562 6 9.82843 6.58579 10.4142M6.58579 3.58579C6.58579 3.58579 6.58579 3.58579 6.58579 3.58579ZM6.58579 10.4142C6.58579 10.4142 6.58579 10.4142 6.58579 10.4142Z" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7Z" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M18 6C16.3431 6 15 4.65685 15 3" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18 8C16.3431 8 15 9.34315 15 11" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 6C7.65685 6 9 4.65685 9 3" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 8C7.65685 8 9 9.34315 9 11" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <path d="M5 20.3884H7.25993C8.27079 20.3884 9.29253 20.4937 10.2763 20.6964C12.0166 21.0549 13.8488 21.0983 15.6069 20.8138C16.4738 20.6734 17.326 20.4589 18.0975 20.0865C18.7939 19.7504 19.6469 19.2766 20.2199 18.7459C20.7921 18.216 21.388 17.3487 21.8109 16.6707C22.1736 16.0894 21.9982 15.3762 21.4245 14.943C20.7873 14.4619 19.8417 14.462 19.2046 14.9433L17.3974 16.3084C16.697 16.8375 15.932 17.3245 15.0206 17.4699C14.911 17.4874 14.7962 17.5033 14.6764 17.5172M14.6764 17.5172C14.6403 17.5214 14.6038 17.5254 14.5668 17.5292M14.6764 17.5172C14.8222 17.486 14.9669 17.396 15.1028 17.2775C15.746 16.7161 15.7866 15.77 15.2285 15.1431C15.0991 14.9977 14.9475 14.8764 14.7791 14.7759C11.9817 13.1074 7.62942 14.3782 5 16.2429M14.6764 17.5172C14.6399 17.525 14.6033 17.5292 14.5668 17.5292M14.5668 17.5292C14.0434 17.5829 13.4312 17.5968 12.7518 17.5326" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <rect x="2" y="14" width="3" height="8" rx="1.5" stroke="#a8a8a8" stroke-width="1.5"></rect> </g></svg>
        </template>
        <template #label>
          <span class="">Payment Integration</span>
        </template>
      </DashboardMenuItem>
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V18C2 19.8856 2 20.8284 2.58579 21.4142C3.17157 22 4.11438 22 6 22H8C9.88562 22 10.8284 22 11.4142 21.4142C12 20.8284 12 19.8856 12 18V17" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M12 7H11C9.11438 7 8.17157 7 7.58579 7.58579C7 8.17157 7 9.11438 7 11V13C7 14.8856 7 15.8284 7.58579 16.4142C8.17157 17 9.11438 17 11 17H13C14.8856 17 15.8284 17 16.4142 16.4142C17 15.8284 17 14.8856 17 13V12" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M12 6C12 4.11438 12 3.17157 12.5858 2.58579C13.1716 2 14.1144 2 16 2H18C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V8C22 9.88562 22 10.8284 21.4142 11.4142C20.8284 12 19.8856 12 18 12H16C14.1144 12 13.1716 12 12.5858 11.4142C12 10.8284 12 9.88562 12 8V6Z" stroke="#a8a8a8" stroke-width="1.5"></path> </g></svg>
        </template>
        <template #label>
          <span class="">DOM Selectors</span>
        </template>
      </DashboardMenuItem>

    </div>
    <div class="flex flex-col gap-2 next-list">
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10" stroke="#a8a8a8" stroke-width="1.5"></path> <path d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14" stroke="#a8a8a8" stroke-width="1.5"></path> </g></svg>
        </template>
        <template #label>
          <span class="">Help</span>
        </template>
      </DashboardMenuItem>
      <DashboardMenuItem class="menu-item flex flex-row justify-start gap-2">
        <template #icon>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> <path d="M21 7.5L17 9.5M12 12L3 7.5M12 12V21.5M12 12C12 12 14.7426 10.6287 16.5 9.75C16.6953 9.65237 17 9.5 17 9.5M17 9.5V13M17 9.5L7.5 4.5" stroke="#a8a8a8" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
        </template>
        <template #label>
          <span class="">Settings</span>
        </template>
      </DashboardMenuItem>
    </div>
  </div>

</div>
</template>

<style scoped>
.menu-item{
  align-items: center;
}
.sidebar-menu-list{
  margin-top: 14%;
  padding: 3% 3%;
  margin-right: 3%;
}
.next-list{
  padding: 3% 3%;
  margin-right: 3%;
}

</style>