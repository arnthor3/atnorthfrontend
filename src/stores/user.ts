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
      isAuthenticated.value = true
      user.value = res
    } catch (error: unknown) {
      if (error instanceof Error) {
        errorMessage.value = error.message
        return
      }
      errorMessage.value = 'Unknown error occured while logging in'
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
      user.value = await api.getSessionStatus()
      isAuthenticated.value = true
    } catch (error) {
      // A marker to see in the logs where the session was terminated
      console.log('********* here ***********')
      isAuthenticated.value = false
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
