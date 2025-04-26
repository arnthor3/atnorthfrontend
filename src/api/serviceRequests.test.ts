import { test } from './testExtend'
import { getServiceRequests } from './serviceRequest'
import { afterAll, beforeEach, expect } from 'vitest'
import { login, logout } from './user'
import { MOCK_USER_SESSION, USER_CREDENTIALS } from '../mocks/user'
import { HTTPError } from 'ky'

beforeEach(async () => {
  localStorage.clear()
  await logout()
})

afterAll(async () => {
  localStorage.clear()
  await logout()
})

test('service requests with no session and wrong company', async () => {
  try {
    await getServiceRequests('1234')
  } catch (error) {
    if (error instanceof HTTPError) {
      expect(error.response.status).toBe(401)
    }
  }
})

test('service requests with no session', async () => {
  await login({ ...USER_CREDENTIALS })
  const res = await getServiceRequests(MOCK_USER_SESSION.company)
  expect(Array.isArray(res)).toBe(true)
})
