<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Spinner from '@/icons/Spinner.vue'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const { isLoading, errorMessage, isAuthenticated } = storeToRefs(store)
const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  await store.login({ email: email.value, password: password.value })
  if (isAuthenticated.value) {
    router.push('/')
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-blue-50">
    <div class="w-full max-w-md rounded bg-white p-8 shadow-xs">
      <h2 class="text-center text-xl font-bold">Log in to your account</h2>
      <form @submit.prevent="handleLogin" class="mt-4 space-y-6">
        <fieldset>
          <label for="email" class="block text-sm"> Email address </label>
          <div class="mt-1">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :disabled="isLoading"
              class="login-input"
              placeholder="you@example.com"
            />
          </div>
        </fieldset>
        <fieldset>
          <label for="password" class="block text-sm"> Password </label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            :disabled="isLoading"
            class="login-input"
            placeholder="••••••••"
          />
        </fieldset>
        <div
          v-if="errorMessage"
          class="rounded-md border border-red-300 bg-red-100 p-3 text-sm text-red-700"
        >
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="animate-colors bg-primary hover:bg-primary/90 flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-75"
        >
          <Spinner v-if="isLoading" width="16" height="16" />
          {{ isLoading ? 'Logging in...' : 'Log in' }}
        </button>
      </form>
    </div>
  </div>
</template>
<style>
@import '../../style.css';

.login-input {
  @apply block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 disabled:bg-gray-100 disabled:opacity-50;
}
</style>
