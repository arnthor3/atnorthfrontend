<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useCompanyStore } from '@/stores/company'
import ButtonLink from '../ButtonLink.vue'
import Notification from '@/icons/Notification.vue'
import Options from './Options.vue'
const userStore = useUserStore()
const companyStore = useCompanyStore()
const { user } = storeToRefs(userStore)
const { company } = storeToRefs(companyStore)
</script>
<template>
  <section class="flex items-center justify-between gap-6">
    <ButtonLink fixedBg to="#notifications">
      <Notification width="20" height="20" />
      <span
        v-if="(company?.notifications ?? 0) > 0"
        name="notifications"
        class="absolute -right-1 -bottom-1 h-4 w-4 rounded bg-red-500 text-center text-xs text-white"
        >{{ company?.notifications }}</span
      >
    </ButtonLink>
    <div class="flex items-center gap-2">
      <div
        v-if="user?.initials"
        class="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-blue-300 text-xl font-extrabold"
      >
        {{ user?.initials }}
      </div>
      <div
        v-else
        class="h-[42px] w-[42px] animate-pulse rounded-xl bg-gray-300"
      ></div>
      <div class="flex flex-col">
        <p v-if="user?.name" class="text-sm font-semibold">{{ user?.name }}</p>
        <div
          v-else
          class="block h-4 w-12 animate-pulse rounded bg-gray-300"
        ></div>
        <small v-if="user?.email" class="text-xs">{{ user?.role }}</small>
        <div
          v-else
          class="mt-1 block h-3 w-12 animate-pulse rounded bg-gray-300"
        ></div>
      </div>
      <Options />
    </div>
  </section>
</template>
