<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import ChevronDown from '@/icons/ChevronDown.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()

const sectionRef = ref<HTMLElement | null>(null)

function handleClickOutside(event: MouseEvent) {
  if (event.target === null) {
    return
  }
  if (sectionRef.value && !sectionRef.value.contains(event.target as Node)) {
    isDropdown.value = false
  }
}
function handleKeyDownEvent(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isDropdown.value = false
  }
}
const isDropdown = ref(false)
function toggleDropdown(e: Event) {
  e.stopPropagation()
  isDropdown.value = !isDropdown.value
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDownEvent)
}
async function logOut(event: Event) {
  event.stopPropagation()
  await store.logout()
  router.push('/login')
}
watch(isDropdown, (newValue) => {
  if (!newValue) {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleKeyDownEvent)
  }
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDownEvent)
})
</script>
<template>
  <section class="relative" ref="sectionRef">
    <button class="cursor-pointer p-2" tabindex="0" @click="toggleDropdown">
      <ChevronDown width="16" height="16" class="stroke-current" />
    </button>
    <!-- If would not do this in production, I would use a portal node to render this -->
    <div
      v-if="isDropdown"
      class="absolute top-full left-6 z-10 w-32 -translate-x-full bg-white shadow-md"
    >
      <ul>
        <li
          role="menuitem"
          tabindex="-1"
          class="border border-gray-100 p-2 hover:bg-blue-100 active:bg-blue-200"
        >
          <button>Profile</button>
        </li>
        <li
          role="menuitem"
          tabindex="-1"
          class="border border-gray-100 p-2 hover:bg-blue-100 active:bg-blue-200"
        >
          <button>Settings</button>
        </li>

        <li
          role="menuitem"
          tabindex="-1"
          class="border border-gray-100 hover:bg-blue-100 active:bg-blue-200"
        >
          <button class="flex w-full p-2" @click="logOut">Logout</button>
        </li>
      </ul>
    </div>
  </section>
</template>
