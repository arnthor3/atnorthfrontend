<script setup lang="ts">
import Questionmark from '@/icons/Questionmark.vue'
type DashboardProps = {
  label: string
  value?: string | number
}
defineProps<DashboardProps>()
</script>
<template>
  <section class="flex h-38 min-w-60 flex-col rounded-lg bg-blue-50 p-4">
    <div class="flex w-full justify-between">
      <span class="text-[18px] font-bold">{{ label }}</span>
      <Questionmark></Questionmark>
    </div>
    <div class="mt-auto flex w-full justify-between">
      <div class="flex items-end">
        <span v-if="value" class="mr-2 text-4xl font-black">{{ value }}</span>
        <span
          v-else
          class="mr-2 block h-10 w-10 animate-pulse rounded bg-gray-300"
        ></span>
        <span class="text-[18px]">{{ label }}</span>
      </div>
      <slot></slot>
    </div>
  </section>
</template>
