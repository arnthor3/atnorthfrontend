import { test } from '../api/testExtend'
import { expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useServiceRequestStore } from './serviceRequst'
import { MOCK_USER_SESSION, USER_CREDENTIALS } from '../mocks/user'

import { login } from '../api/user'

beforeEach(async () => {
  setActivePinia(createPinia())
  await login({ ...USER_CREDENTIALS })
})

test('should have return error message', async () => {
  const store = useServiceRequestStore()
  await store.getServiceRequests('test')
  expect(store.isLoading).toBe(false)
  expect(typeof store.errorMessage).toBeDefined()
})

test('should correctly set loading status', async () => {
  const store = useServiceRequestStore()
  const promise = store.getServiceRequests(MOCK_USER_SESSION.company)
  expect(store.isLoading).toBe(true)
  await promise
  expect(store.isLoading).toBe(false)
})

test('should set the service request data', async () => {
  const store = useServiceRequestStore()
  await store.getServiceRequests(MOCK_USER_SESSION.company)
  expect(store.serviceRequests).toBeDefined()
  expect(store.serviceRequests?.length).toBeGreaterThan(1)
})
