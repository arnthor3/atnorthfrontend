import type { ServiceRequest, Status } from './serviceRequest'
import { MOCK_COMPANY } from './company'
const pickRandomFromArray = <T>(arr: T[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

const pickRandomStatus = (): Status => {
  return pickRandomFromArray([
    'in_progress',
    'waiting_to_start',
    'completed',
    'cancelled'
  ])
}

const pickRandomUser = (): string => {
  return pickRandomFromArray(MOCK_COMPANY.users)
}

const createARandomDateFromLastTwoWeeks = () => {
  const lastTwoWeeks = 14 * 24 * 60 * 60 * 1000
  const randomDate = new Date(
    Date.now() - Math.floor(Math.random() * lastTwoWeeks)
  )
  return randomDate
}

const addRandomDaysToDate = (date: Date, days: number) => {
  const randomDays = Math.floor(Math.random() * days) + Math.random()
  return new Date(date.getTime() + randomDays * 24 * 60 * 60 * 1000)
}

export function createServiceRequests(count: number): ServiceRequest[] {
  let serviceRequests: ServiceRequest[] = []
  for (let i = 0; i < count; i++) {
    const status = pickRandomStatus()
    const created = createARandomDateFromLastTwoWeeks()
    let completed = undefined
    if (status === 'completed' || status === 'cancelled') {
      completed = addRandomDaysToDate(created, 5)
    }
    const serviceRequest: ServiceRequest = {
      reference: `SDP-${200 + i}`,
      requester: pickRandomUser(),
      type: 'Demo - Sevice Request',
      summary: 'Some text',
      status,
      serviceProject: 'pickonerandom',
      created: created,
      completed
    }
    serviceRequests.push(serviceRequest)
  }
  return serviceRequests
}
