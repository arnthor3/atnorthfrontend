import ky from 'ky'
import type { ServiceRequest } from '../types'

type ServiceRequestSuccessResponse = {
  data: ServiceRequest[]
}

export const getServiceRequests = async (
  companyId: string
): Promise<ServiceRequest[]> => {
  const res = await ky
    .get(`/api/company/${companyId}/service-request`)
    .json<ServiceRequestSuccessResponse>()
  return res.data
}
