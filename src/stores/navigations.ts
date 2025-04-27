import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', () => {
  const isSideBarOpen = ref(false)

  async function setSideBarState(value: boolean) {
    isSideBarOpen.value = value
  }

  return {
    isSideBarOpen,
    setSideBarState
  }
})
