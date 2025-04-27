<script setup lang="ts">
import { ref, watch } from 'vue'
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
  if (!(sectionRef.value && !sectionRef.value.contains(event.target as Node))) {
    return
  }
  isDropdown.value = false
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
  console.log('clicked')
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
</script>
<template>
  <section class="relative" ref="sectionRef">
    <button class="cursor-pointer p-2" tabindex="0" @click="toggleDropdown">
      <ChevronDown width="16" height="16" class="stroke-current" />
    </button>
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
        <div class="my-1 border-t border-gray-200"></div>

        <li
          role="menuitem"
          tabindex="-1"
          class="border border-gray-100 p-2 hover:bg-blue-100 active:bg-blue-200"
        >
          <button @click="logOut">Logout</button>
        </li>
      </ul>
    </div>
  </section>
</template>
