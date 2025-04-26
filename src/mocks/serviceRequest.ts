import { http, HttpResponse } from 'msw'
import { createServiceRequests } from './serviceRequestMock'
import { validateSession, simulateWait, JSON_HEADER } from './mockUtils'

export type Status =
  | 'in_progress'
  | 'waiting_to_start'
  | 'completed'
  | 'cancelled'

export type ServiceRequest = {
  reference: string
  type: string
  summary: string
  status: Status
  serviceProject: string
  requester: string
  created: Date
  completed?: Date
}
// on page refresh we will get a different set of mocks, not ideal but ok for
// this scenario,
const MOCK_REQUEST_POOL_SIZE = 10
const allMockServiceRequests = createServiceRequests(MOCK_REQUEST_POOL_SIZE)

export const getServiceRequests = http.get(
  '/api/company/:id/service-requests',
  async ({ cookies, params }) => {
    if (params.id !== 'comp-1234567890') {
      return HttpResponse.json({ error: 'Company not found' }, { status: 404 })
    }
    if (!validateSession(cookies.sessionId)) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401, statusText: 'Unauthorized' }
      )
    }

    try {
      await simulateWait({ waitRange: [200, 800], chancesOfError: 5 })
    } catch (error: any) {
      return HttpResponse.json(
        { error: error.message || 'Failed to fetch service requests' },
        { status: 500 }
      )
    }
    return HttpResponse.json(
      { data: allMockServiceRequests },
      { status: 200, statusText: 'OK' }
    )
  }
)
