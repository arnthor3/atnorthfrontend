<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header/Header.vue'
import { useCompanyStore } from '@/stores/company'
import { useServiceRequestStore } from '@/stores/serviceRequst'
import { onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useNavigationStore } from '@/stores/navigations'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useNavigationStore()
const { isSideBarOpen } = storeToRefs(store)
const { isAuthenticated } = storeToRefs(useUserStore())

watch(isAuthenticated, (newVal) => {
  if (!newVal) {
    router.push('/login')
  }
})
onUnmounted(() => {
  useCompanyStore().reset()
  useServiceRequestStore().reset()
})
</script>
<template>
  <div
    class="grid h-screen grid-cols-1 grid-rows-[64px_1fr_auto] bg-blue-50 lg:grid-cols-[75px_1fr] xl:grid-cols-[200px_1fr]"
  >
    <div
      @click="store.setSideBarState(false)"
      v-if="isSideBarOpen"
      class="fixed z-10 h-screen w-screen backdrop-blur-sm"
    ></div>
    <Sidebar />
    <Header></Header>
    <router-view></router-view>

    <footer class="col-span-1 flex justify-center pt-2 pb-4 lg:col-span-2">
      <img src="@/assets/atnorth.webp" alt="" class="w-32 object-contain" />
    </footer>
  </div>
</template>
