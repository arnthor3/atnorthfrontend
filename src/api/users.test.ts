import { test } from './testExtend'
import { afterAll, beforeEach, expect } from 'vitest'
import { login, logout, getSessionStatus } from './user'
import { USER_CREDENTIALS } from '../mocks/user'

import { HTTPError } from 'ky'

beforeEach(async () => {
  localStorage.clear()
  await logout()
})

afterAll(async () => {
  localStorage.clear()
  await logout()
})

test('login with wrong info should fail', async () => {
  try {
    await login({
      email: 'wrong@email.com',
      password: 'wrongpassword'
    })
    expect.fail('Login should have thrown an error for wrong credentials.')
  } catch (error: unknown) {
    if (error instanceof Error) {
      expect(error.message).toBe('Invalid username or password')
    }
  }
  try {
    await getSessionStatus()
    expect.fail('the api function should throw')
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      expect(error.response.status).toBe(401)
    }
  }
})

test('login with right info should succeed and set session', async () => {
  try {
    await login({ ...USER_CREDENTIALS })
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      expect(error.response.status).toBe(401)
    }
  }
  const res = await getSessionStatus()
  expect(res.email).toBe(USER_CREDENTIALS.email)
})

test('getSessionStatus should return true when logged in', async () => {
  await login({ ...USER_CREDENTIALS })
  const res = await getSessionStatus()
  expect(res.email).toBe(USER_CREDENTIALS.email)
})

test('logout should clear the session', async () => {
  await login({ ...USER_CREDENTIALS })
  const logoutSuccess = await logout()
  expect(logoutSuccess).toBe(true)
  try {
    await getSessionStatus()
    expect.fail('the api function should throw')
  } catch (error) {
    if (error instanceof HTTPError) {
      expect(error.response.status).toBe(401)
    }
  }
})

test('getSessionStatus should throw when logged out', async () => {
  try {
    await getSessionStatus()
    expect.fail('should throw')
  } catch (error) {
    if (error instanceof HTTPError) {
      expect(error.response.status).toBe(401)
    }
  }
})
