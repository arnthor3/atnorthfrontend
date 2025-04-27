import type { ServiceRequest, Status } from '../types/serviceRequest'
import { MOCK_COMPANY } from './company'

const users = [
  'Olivia Davis',
  'Ethan Martinez',
  'Sophia Rodriguez',
  'Liam Smith',
  'Ava Johnson',
  'Noah Williams',
  'Isabella Brown',
  'Lucas Jones',
  'Mia Garcia',
  'Jackson Miller'
]

const serviceProjects = [
  'Project Support Hub',
  'Service Delivery Platform',
  'Client Engagement Project',
  'Managed Services Center',
  'Professional Services Suite',
  'Solutions Implementation Project',
  'Customer Success Initiative',
  'Technical Assistance Program',
  'Project Resource Management',
  'Service Innovation Lab'
]

const serviceProjectSummaries = [
  'This project focuses on enhancing our client support infrastructure, providing a more seamless and efficient experience for all service requests.',
  'The aim of this service delivery platform is to streamline our processes, improve response times, and ensure consistent quality across all client engagements.',
  'This client engagement project seeks to build stronger relationships through proactive communication and tailored service offerings to meet individual needs.',
  'Our managed services center will offer comprehensive and proactive IT support, allowing clients to focus on their core business without technical disruptions.',
  'The professional services suite aims to deliver expert consulting and implementation services, helping clients achieve their strategic objectives effectively.',
  'This solutions implementation project will focus on deploying and integrating new technologies to improve our service capabilities and client outcomes.',
  'The customer success initiative is designed to ensure client satisfaction and loyalty through dedicated support and continuous value delivery.',
  'This technical assistance program provides specialized expertise and support for complex technical issues, ensuring swift and effective resolutions.',
  'Our project resource management system will optimize the allocation of skilled personnel to service projects, maximizing efficiency and client value.',
  'The service innovation lab will explore and implement new technologies and methodologies to continuously improve our service offerings and client experiences.'
]

const pickRandomFromArray = <T>(arr: T[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

const pickRandomSummaryProject = () => {
  return pickRandomFromArray(serviceProjectSummaries)
}

const pickRandomSerivceProject = () => {
  return pickRandomFromArray(serviceProjects)
}

const pickRandomStatus = (): Status => {
  return pickRandomFromArray([
    'in_progress',
    'waiting_for_start',
    'completed',
    'cancelled'
  ])
}

const pickRandomUser = (): string => {
  return pickRandomFromArray(users)
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
      summary: pickRandomSummaryProject(),
      status,
      serviceProject: pickRandomSerivceProject(),
      created: created,
      completed
    }
    serviceRequests.push(serviceRequest)
  }
  return serviceRequests
}
