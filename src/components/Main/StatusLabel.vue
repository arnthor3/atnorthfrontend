<script setup lang="ts">
import type { Status } from '@/types'
type TableButtonProps = {
  status: Status
}
defineProps<TableButtonProps>()
function convertStatusToStr(status: Status) {
  switch (status) {
    case 'cancelled': {
      return 'Cancelled'
    }
    case 'completed': {
      return 'Completed'
    }
    case 'in_progress': {
      return 'In progress'
    }
    case 'waiting_for_start': {
      return 'Waiting for start'
    }
  }
}
</script>
<template>
  <div
    class="flex w-fit items-center rounded px-2 py-1"
    :class="[
      status === 'cancelled' && 'bg-red-100',
      status === 'completed' && 'bg-green-100',
      status === 'in_progress' && 'bg-yellow-100',
      status === 'waiting_for_start' && 'bg-blue-100'
    ]"
  >
    <svg
      width="9"
      height="9"
      :class="[
        status === 'cancelled' && 'fill-red-500',
        status === 'completed' && 'fill-green-500',
        status === 'in_progress' && 'fill-yellow-500',
        status === 'waiting_for_start' && 'fill-blue-500'
      ]"
    >
      <circle cx="4.5" cy="4.5" r="4" />
    </svg>
    <span class="ml-1 block text-xs">{{ convertStatusToStr(status) }}</span>
  </div>
</template>
