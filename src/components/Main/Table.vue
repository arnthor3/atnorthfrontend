<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useServiceRequestStore } from '@/stores/serviceRequst'
import Spinner from '@/icons/Spinner.vue'
import ChevronDown from '@/icons/ChevronDown.vue'
import { format, intervalToDuration } from 'date-fns'
import StatusLabel from './StatusLabel.vue'
import DurationLabel from './DurationLabel.vue'
import type { ServiceRequest } from '@/types'
const store = useServiceRequestStore()

const { serviceRequests, isLoading } = storeToRefs(store)

const getDuration = (item: ServiceRequest) => {
  const interval = intervalToDuration({
    start: item.created,
    end: item.completed ? item.completed : new Date()
  })
  const retInterval = {
    weeks: interval.weeks ?? 0,
    days: interval.days ?? 0,
    hours: interval.hours ?? 0,
    minutes: interval.minutes ?? 0
  }
  return {
    ...retInterval,
    weeks:
      retInterval.weeks === 0 && retInterval.days > 6 ? 1 : retInterval.weeks
  }
}
</script>
<template>
  <div class="mt-4 mb-6">
    <table class="min-w-[1100px] table-fixed">
      <thead>
        <tr>
          <th class="header-cell w-[10%]">reference</th>
          <th class="header-cell w-[15%]">type</th>
          <th class="header-cell w-[10%]">summary</th>
          <th class="header-cell w-[15%]">status</th>
          <th class="header-cell">service project</th>
          <th class="header-cell">requester</th>
          <th class="header-cell">response time</th>
          <th class="header-cell w-[10%]">created</th>
          <th class="header-cell w-[30px]"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr
          v-for="item in serviceRequests"
          :key="item.reference"
          class="hover:bg-gray-50"
        >
          <td class="table-cell">{{ item.reference }}</td>
          <td class="table-cell">{{ item.type }}</td>
          <td :title="item.summary" class="table-cell">
            {{ item.summary }}
          </td>
          <td class="table-cell"><StatusLabel :status="item.status" /></td>
          <td class="table-cell">{{ item.serviceProject }}</td>
          <td class="table-cell">{{ item.requester }}</td>
          <td class="table-cell">
            <DurationLabel :duration="getDuration(item)" />
          </td>
          <td class="table-cell">
            {{ format(item.created, 'dd.MM.yy') }}
          </td>
          <td class="table-cell">
            <div class="mr-auto flex w-full min-w-4 justify-end">
              <ChevronDown
                class="stroke-primary-light"
                width="16"
                height="16"
              />
            </div>
          </td>
        </tr>
        <tr
          v-if="
            !isLoading && (!serviceRequests || serviceRequests?.length === 0)
          "
        >
          <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">
            No data available
          </td>
        </tr>
        <tr v-if="isLoading">
          <td colspan="8">
            <div class="block flex h-8 items-center justify-center py-8">
              <Spinner width="24" height="24" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
@import '../../style.css';

.header-cell {
  @apply text-atn-small px-3 py-3 text-left font-medium tracking-wider uppercase;
}

.table-cell {
  @apply px-3 py-4 text-sm whitespace-nowrap text-gray-900;
}

table.table-fixed {
  table-layout: fixed;
  width: 100%;
}

table.table-fixed td,
table.table-fixed th {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
