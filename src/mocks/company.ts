import { http, HttpResponse } from 'msw'
import { validateSession, simulateWait } from './mockUtils'
import type { Company } from '@/types'

export const MOCK_COMPANY: Company = {
  name: 'Demo Org',
  id: 'comp-1234567890',
  sites: 5,
  notifications: 2,
  groups: 20,
  users: 25
}

const mock_dynamic_company = () => {
  const users = Math.floor(Math.random() * 5) + 20
  const sites = Math.floor(Math.random() * 5) + 5
  const groups = Math.floor(Math.random() * 5) + 10
  const notifications = Math.floor(Math.random() * 10) + 1
  return { ...MOCK_COMPANY, users, sites, groups, notifications }
}
export const getCompany = http.get(
  '/api/company/:id',
  async ({ params, cookies }) => {
    if (!validateSession(cookies.sessionId)) {
      return HttpResponse.json(
        { data: 'error', error: 'Unauthorized: Invalid or missing session' },
        { status: 401, statusText: 'Unauthorized' }
      )
    }
    await simulateWait([800, 1200])
    if (params.id === MOCK_COMPANY.id) {
      return HttpResponse.json(
        { data: mock_dynamic_company() },
        {
          status: 200
        }
      )
    }
    return HttpResponse.json({ error: 'Company not found' }, { status: 404 })
  }
)
