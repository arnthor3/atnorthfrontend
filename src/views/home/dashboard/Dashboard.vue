<script setup lang="ts">
import Sites from '@/icons/Sites.vue'
import Users from '@/icons/Users.vue'
import Groups from '@/icons/Groups.vue'
import DashboardCard from '@/components/Main/DashboardCard.vue'
import Button from '@/components/Main/Button.vue'
import Table from '@/components/Main/Table.vue'
import { useServiceRequestStore } from '@/stores/serviceRequest'
import { useCompanyStore } from '@/stores/company'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, watchEffect } from 'vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
const serviceRequestStore = useServiceRequestStore()
const { serviceRequests } = storeToRefs(serviceRequestStore)

const MINUTE_IN_MS = 1000 * 60

let pollingIntervalId: ReturnType<typeof setInterval> | null = null

watchEffect(() => {
  const companyId = user.value?.company
  if (!companyId) {
    userStore.getSession()
    return
  }
  if (!company.value) {
    companyStore.getCompany(companyId)
  }
  if (!serviceRequests.value) {
    serviceRequestStore.getServiceRequests(companyId)
  }
})

onMounted(() => {
  pollingIntervalId = setInterval(() => {
    if (!user.value) {
      return
    }
    userStore.getSession()
    companyStore.getCompany(user.value?.company)
  }, MINUTE_IN_MS)
})

onUnmounted(() => {
  if (pollingIntervalId) {
    clearInterval(pollingIntervalId)
  }
})
</script>
<template>
  <main class="main-content">
    <h1 v-if="company?.name" class="mb-8 text-2xl font-semibold">
      {{ company?.name }}'s dashboard
    </h1>
    <div
      v-else
      class="mr-2 mb-8 block h-8 w-64 animate-pulse rounded bg-gray-300"
    ></div>
    <section
      class="grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] justify-start gap-8"
    >
      <DashboardCard label="Sites" :value="company?.sites">
        <Sites width="42" />
      </DashboardCard>
      <DashboardCard label="Users" :value="company?.users">
        <Users width="48" height="48" />
      </DashboardCard>
      <DashboardCard label="Groups" :value="company?.groups">
        <Groups width="42" />
      </DashboardCard>
    </section>
    <section>
      <h2 class="mt-8 text-[18px]">Latest requests</h2>
      <Table></Table>
      <div
        v-if="!!serviceRequests"
        class="my-8 flex items-center justify-center"
      >
        <Button>Show more</Button>
      </div>
    </section>
  </main>
</template>
