import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserJsonBody as UserParams, User } from '../types'
import * as api from '../api/user'

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref(false)
  const user = ref<User | undefined>()
  const isLoading = ref(false)
  const errorMessage = ref<string | undefined>()

  async function login(params: UserParams) {
    isLoading.value = true
    try {
      const res = await api.login(params)
      if (typeof res === 'undefined') {
        errorMessage.value = 'Unexpected error'
        return
      }
      isAuthenticated.value = true
      user.value = res
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message
      }
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await api.logout()
      isAuthenticated.value = false
      user.value = undefined
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message
      }
    }
  }

  async function getSession() {
    try {
      await api.getSessionStatus()
      isAuthenticated.value = true
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message
      }
    }
  }

  return {
    isAuthenticated,
    user,
    isLoading,
    errorMessage,
    login,
    logout,
    getSession
  }
})
