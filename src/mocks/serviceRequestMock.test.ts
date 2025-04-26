import { expect, describe, it } from 'vitest'
import { createServiceRequests } from './serviceRequestMock'

describe('Service Requests', () => {
  it('should return an empty array when 0 is given as an argument', () => {
    const serviceRequests = createServiceRequests(0)
    expect(serviceRequests.length).toBe(0)
  })
  it('should know how to create service requests', () => {
    const serviceRequests = createServiceRequests(40)
    expect(serviceRequests.length).toBe(40)
  })
  it('should create valid dates for service requests', () => {
    const serviceRequests = createServiceRequests(40)
    serviceRequests.forEach((serviceRequest) => {
      if (
        serviceRequest.status === 'completed' ||
        serviceRequest.status === 'cancelled'
      ) {
        const { completed, created } = serviceRequest
        expect(serviceRequest.completed).toBeDefined()
        expect(completed?.getTime()).toBeGreaterThan(created.getTime())
      }
    })
  })
  it('should create random users for service requests', () => {
    const serviceRequests = createServiceRequests(40)
    const countUsers = new Set(serviceRequests.map((d) => d.requester))
    expect(countUsers.size).toBeGreaterThan(1)
  })
})
