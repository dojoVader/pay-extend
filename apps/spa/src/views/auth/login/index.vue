<template>
  <Auth>
    <div class="mt-8 text-center">
      <h4 class="mb-2.5 text-xl font-semibold text-primary">Welcome Back !</h4>
      <p class="text-base text-default-500">Sign in to continue to Payextend.</p>
    </div>
    <form @submit.prevent="onSubmit" class="text-left w-full mt-10">
      <div class="mb-4">
        <label for="email" class="block font-medium text-default-900 text-sm mb-2">Username/ Email ID</label>
        <input
          v-model="form.email"
          @input="onChange('email')"
          type="text"
          id="email"
          class="form-input"
          :class="errors.email ? 'border border-red-400' : ''"
          placeholder="Enter Username or email"
          style="padding: 0 12px"
        />
        <p v-if="errors.email" class="text-sm text-red-500 mt-1">{{ errors.email }}</p>
      </div>
      <div class="mb-4">
        <RouterLink to="/auth/reset-pass" class="text-primary font-medium text-sm mb-2 float-end">Forgot Password ?</RouterLink>
        <label for="Password" class="block font-medium text-default-900 text-sm mb-2">Password</label>
        <input
          v-model="form.password"
          @input="onChange('password')"
          type="password"
          id="Password"
          class="form-input"
          :class="errors.password ? 'border border-red-400' : ''"
          placeholder="Enter Password"
          style="padding: 0 12px"
        />
        <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</p>
      </div>
      <div class="flex items-center gap-2 mb-4">
        <input id="checkbox-1" type="checkbox" class="form-checkbox" />
        <label class="text-default-900 text-sm font-medium" for="checkbox-1">Remember Me</label>
      </div>
      <div class="mt-10 text-center">
        <button type="submit" class="btn bg-primary text-white w-full" :disabled="loading">{{ loading ? 'Signing...' : 'Sign In' }}</button>
      </div>
<!--      <div class="flex w-full justify-center items-center gap-2">-->
<!--        <RouterLink to="" class="btn border border-default-200 flex-grow hover:bg-default-150 shadow-sm hover:text-default-800">-->
<!--          <Icon icon="logos:google-icon" class="iconify-color"></Icon>-->
<!--          Use Google-->
<!--        </RouterLink>-->
<!--        <RouterLink to="" class="btn border border-default-200 flex-grow hover:bg-default-150 shadow-sm hover:text-default-800">-->
<!--          <Icon icon="logos:apple" class="iconify text-mono"></Icon>-->
<!--          Use Apple-->
<!--        </RouterLink>-->
<!--      </div>-->
      <div class="mt-10 text-center">
        <p class="text-base text-default-500">
          Don't have an Account ?
          <RouterLink to="/auth/register" class="font-semibold underline hover:text-primary transition duration-200">SignUp</RouterLink>
        </p>
      </div>
    </form>
  </Auth>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import Auth from "@/layouts/auth.vue";
import { reactive, ref } from "vue";
import { PAYEXTEND_ENDPOINTS, PayextendPath } from "@/helpers";
import { useAuth } from "@/stores/auth.ts";

// auth User
const user = useAuth();

// form state
const form = reactive({ email: '', password: '' })
const errors = reactive<{ [k: string]: string | null }>({ email: null, password: null })
const loading = ref(false)
const router = useRouter()

// validation regex
const emailRegex = /^\S+@\S+\.\S+$/
const passwordRegex = /^(?=.*\d).{8,}$/ // at least 8 chars and one number

function validateField(field: string) {
  if (field === 'email') {
    if (!form.email) {
      errors.email = 'Email is required'
      return false
    }
    if (!emailRegex.test(form.email)) {
      errors.email = 'Enter a valid email'
      return false
    }
    errors.email = null
    return true
  }
  if (field === 'password') {
    if (!form.password) {
      errors.password = 'Password is required'
      return false
    }
    if (!passwordRegex.test(form.password)) {
      errors.password = 'Password must be at least 8 characters and include a number'
      return false
    }
    errors.password = null
    return true
  }
  return true
}

function onChange(field: string) {
  validateField(field)
}

function validateAll() {
  const e1 = validateField('email')
  const e2 = validateField('password')
  return e1 && e2
}

// mock auth endpoint
async function authLogin(data: { email: string; password: string }) {
  const root = PayextendPath()
  const res = await fetch(`${root}${PAYEXTEND_ENDPOINTS.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw { status: res.status, message: errorData.message };
  }
  return await res.json();
}

async function onSubmit() {
  if (!validateAll()) return
  loading.value = true
  try {
    const res = await authLogin({ email: form.email, password: form.password })
    if (res.access_token) {
      // navigate to dashboard or show success — for now just console
      user.setUser({
        name: res.name,
        token: res.access_token,
      })
      await router.push('/dashboard/hr')
    } else {
      // set a generic form error on password for now
      errors.password = res.message || 'Login failed'
    }
  } catch (error: any) {
    const message = error.message;
    if (message == 'No installation found for this user.') {
     errors.password = message + ' Redirecting to registration...';
     setTimeout(async() => {
       await router.push('/auth/register')
     },3000)
    } else {
      errors.password = error.message || 'Login failed'
    }
  }
  loading.value = false
}
</script>
