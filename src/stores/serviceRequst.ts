import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ServiceRequest } from '../types'
import * as api from '../api/serviceRequest'

export const useServiceRequestStore = defineStore('service_request', () => {
  const serviceRequests = ref<ServiceRequest[] | undefined>()
  const isLoading = ref(false)
  const errorMessage = ref<string | undefined>()

  async function getServiceRequests(companyId: string) {
    isLoading.value = true
    try {
      serviceRequests.value = await api.getServiceRequests(companyId)
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    serviceRequests,
    isLoading,
    errorMessage,
    getServiceRequests
  }
})
