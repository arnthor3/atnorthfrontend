<script setup lang="ts">
import Menu from '@/icons/Menu.vue'
import User from './User.vue'
import { useNavigationStore } from '@/stores/navigations'
const navigationStore = useNavigationStore()
</script>
<template>
  <header
    class="col-span-1 row-span-1 mr-2 flex h-full justify-around lg:mr-4 xl:mr-16"
  >
    <div class="ml-4 flex h-full items-center justify-center lg:hidden">
      <button
        @click="navigationStore.setSideBarState(true)"
        class="flex h-12 w-12 items-center justify-center rounded transition-colors duration-150 ease-in-out hover:bg-white"
      >
        <Menu width="24" height="24"></Menu>
      </button>
    </div>
    <div class="ml-auto flex">
      <User />
    </div>
  </header>
</template>
