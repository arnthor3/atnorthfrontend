import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Company } from '../types'
import * as api from '../api/company'

export const useCompanyStore = defineStore('company', () => {
  const company = ref<Company | undefined>()
  const isLoading = ref(false)
  const errorMessage = ref<string | undefined>()

  async function getCompany(companyId: string) {
    isLoading.value = true
    try {
      company.value = await api.getCompany(companyId)
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        errorMessage.value = error.message
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    company,
    isLoading,
    errorMessage,
    getCompany
  }
})
