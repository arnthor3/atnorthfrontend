<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ButtonLink from './ButtonLink.vue'
import Dashboard from '@/icons/Dashboard.vue'
import Checkmark from '@/icons/Checkmark.vue'
import Chart from '@/icons/Chart.vue'
import Users from '@/icons/Users.vue'
import Phone from '@/icons/Phone.vue'
import { storeToRefs } from 'pinia'
import { useNavigationStore } from '@/stores/navigations'

const navigationStore = useNavigationStore()
const { isSideBarOpen } = storeToRefs(navigationStore)
function ifSideBarIsOpen() {
  if (isSideBarOpen.value) {
    navigationStore.setSideBarState(false)
  }
}
</script>
<template>
  <aside
    class="fixed z-20 flex h-full w-50 -translate-x-full transform flex-col items-center bg-blue-50 lg:static lg:z-auto lg:col-span-1 lg:row-span-2 lg:flex lg:w-auto lg:translate-x-0 lg:bg-none lg:transition-none"
    :class="[
      isSideBarOpen
        ? 'translate-x-0 shadow-lg transition-transform duration-300'
        : '-translate-x-full'
    ]"
    @click="ifSideBarIsOpen"
  >
    <header class="mt-4 mb-4">
      <RouterLink to="/" class="text-white">
        <img
          class="w-10 object-contain"
          src="../assets/atNorth.png"
          alt="atNorth"
        />
      </RouterLink>
    </header>
    <ul class="flex flex-col gap-4">
      <li>
        <ButtonLink label="Dashboard" to="/">
          <Dashboard width="20" height="20" />
        </ButtonLink>
      </li>
      <li>
        <ButtonLink label="Support" to="/support">
          <Checkmark width="20" height="20" />
        </ButtonLink>
      </li>
      <li>
        <ButtonLink label="Data" to="/data">
          <Chart width="20" height="20" />
        </ButtonLink>
      </li>
      <li>
        <ButtonLink label="Manager" to="/manager">
          <Users width="20" height="20" />
        </ButtonLink>
      </li>
    </ul>
    <ButtonLink label="Help" to="#help" class="mt-auto md:mb-8 lg:mb-0">
      <Phone width="20" height="20" />
    </ButtonLink>
  </aside>
</template>
