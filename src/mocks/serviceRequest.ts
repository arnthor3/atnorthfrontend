import { http, HttpResponse } from 'msw'
import { createServiceRequests } from './serviceRequestMock'
import { validateSession, simulateWait } from './mockUtils'
import { MOCK_USER_SESSION } from './user'

// on page refresh we will get a different set of mocks, not ideal but ok for
// this scenario,
const MOCK_REQUEST_POOL_SIZE = 5
const allMockServiceRequests = createServiceRequests(MOCK_REQUEST_POOL_SIZE)

export const getServiceRequests = http.get(
  '/api/company/:id/service-request',
  async ({ cookies, params }) => {
    if (!validateSession(cookies.sessionId)) {
      return HttpResponse.json(
        { data: 'error', error: 'Unauthorized: Invalid or missing session' },
        { status: 401, statusText: 'Unauthorized' }
      )
    }

    if (params.id !== MOCK_USER_SESSION.company) {
      return HttpResponse.json(
        { error: 'Company not found', status: 'error' },
        { status: 404 }
      )
    }

    await simulateWait([600, 1000])

    return HttpResponse.json(
      { data: allMockServiceRequests },
      { status: 200, statusText: 'OK' }
    )
  }
)
