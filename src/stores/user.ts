import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserJsonBody as UserParams, User } from '../types'
import * as api from '../api/user'
import { HTTPError } from 'ky'

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
      if (error instanceof HTTPError) {
        try {
          const errorBody = await error.response.json()
          errorMessage.value =
            errorBody?.error || 'An unknown API error occurred.'
        } catch (parseError) {
          console.error('Failed to parse error response body:', parseError)
          errorMessage.value = error.message
        }
        return
      }
      if (error instanceof Error) {
        errorMessage.value = error.message
        return
      }
      errorMessage.value = 'An unexpected error occurred.'

      isAuthenticated.value = false
      user.value = undefined
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
