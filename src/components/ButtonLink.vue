<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
type ButtonLinkProps = {
  label?: string
  to: string
  fixedBg?: boolean
}
defineProps<ButtonLinkProps>()

const route = useRoute()
</script>
<template>
  <RouterLink
    :to="to"
    class="group relative flex cursor-pointer flex-col items-center justify-center"
  >
    <div
      :class="[(to === route.path || fixedBg) && 'bg-white']"
      class="flex h-12 w-12 items-center justify-center rounded transition-colors duration-150 ease-in-out group-hover:bg-white"
    >
      <slot></slot>
    </div>
    <span
      v-if="label"
      style="font-size: 12px; font-weight: 600"
      class="text-sm"
      >{{ label }}</span
    >
    <slot name="notifications"></slot>
  </RouterLink>
</template>
