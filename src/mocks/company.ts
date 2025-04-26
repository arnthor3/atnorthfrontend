import { http, HttpResponse } from 'msw'
import { validateSession, simulateWait } from './mockUtils'

export const MOCK_COMPANY = {
  name: 'Demo Org',
  id: 'comp-1234567890',
  sites: ['ICE01', 'DEN02', 'SWE03', 'NOR01'],
  groups: [
    'admin',
    'org admin',
    'user',
    'guest',
    'read-only',
    'disabled',
    'deleted'
  ],
  users: [
    'John Doe',
    'Jane Doe',
    'Bob Smith',
    'Alice Johnson',
    'Keith Richards'
  ]
}

export const getCompany = http.get(
  '/api/company/:id',
  async ({ params, cookies }) => {
    if (!validateSession(cookies.sessionId)) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401, statusText: 'Unauthorized' }
      )
    }
    await simulateWait([100, 400])
    if (params.id === MOCK_COMPANY.id) {
      return HttpResponse.json(
        { data: MOCK_COMPANY },
        {
          status: 200
        }
      )
    }
    return HttpResponse.json({ error: 'Company not found' }, { status: 404 })
  }
)
