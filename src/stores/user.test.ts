import { test } from '../api/testExtend'
import { expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from './user'
import { USER_CREDENTIALS } from '../mocks/user'

import { logout } from '../api/user'
import { MOCK_COMPANY } from '../mocks/company'

let store: ReturnType<typeof useUserStore>

beforeEach(async () => {
  setActivePinia(createPinia())
  localStorage.clear()
  await logout()
  store = useUserStore()
})

test('should have return error message', async () => {
  await store.login({ email: 'test', password: 'test' })
  expect(store.isLoading).toBe(false)
  expect(typeof store.errorMessage).toBeDefined()
})

test('should correctly set loading status', async () => {
  const promise = store.login({ ...USER_CREDENTIALS })
  expect(store.isLoading).toBe(true)
  await promise
  expect(store.isLoading).toBe(false)
})

test('should set the user session', async () => {
  await store.login({ ...USER_CREDENTIALS })
  expect(store.user).toBeDefined()
  expect(store.user?.company).toBe(MOCK_COMPANY.id)
})

test('can log out', async () => {
  await store.login({ ...USER_CREDENTIALS })
  expect(store.isAuthenticated).toBe(true)
  await store.logout()
  expect(store.isAuthenticated).toBe(false)
})
