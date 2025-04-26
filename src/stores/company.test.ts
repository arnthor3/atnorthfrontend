import { test } from '../api/testExtend'
import { expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCompanyStore } from './company'
import { MOCK_USER_SESSION, USER_CREDENTIALS } from '../mocks/user'
import { MOCK_COMPANY } from '../mocks/company'
import { login } from '../api/user'

beforeEach(async () => {
  setActivePinia(createPinia())
  await login({ ...USER_CREDENTIALS })
})

test('should have return error message', async () => {
  const store = useCompanyStore()
  await store.getCompany('test')
  expect(store.isLoading).toBe(false)
  expect(typeof store.errorMessage).toBeDefined()
})

test('should correctly set loading status', async () => {
  const store = useCompanyStore()
  const promise = store.getCompany(MOCK_USER_SESSION.company)
  expect(store.isLoading).toBe(true)
  await promise
  expect(store.isLoading).toBe(false)
})

test('should set the company data', async () => {
  const store = useCompanyStore()
  await store.getCompany(MOCK_USER_SESSION.company)
  expect(store.company).toBeDefined()
  expect(store.company?.name).toBe(MOCK_COMPANY.name)
})
