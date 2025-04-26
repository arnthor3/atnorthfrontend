import { test } from './testExtend'
import { getCompany } from './company'
import { HTTPError } from 'ky'
import { beforeEach, expect } from 'vitest'
import { login } from './user'
import { MOCK_USER_SESSION, USER_CREDENTIALS } from '../mocks/user'
import { MOCK_COMPANY } from '../mocks/company'

beforeEach(async () => {
  localStorage.clear()
  await login({ ...USER_CREDENTIALS })
})

test('getcompany should fail if bad company id', async () => {
  try {
    await getCompany('bad_data')
  } catch (error) {
    if (error instanceof HTTPError) {
      expect(error.response.status).toBe(404)
    }
  }
})

test('getcompany should work if logged in', async () => {
  const res = await getCompany(MOCK_USER_SESSION.company)
  expect(res).toBeDefined()
  expect(res.groups.length).toBe(MOCK_COMPANY.groups.length)
})
