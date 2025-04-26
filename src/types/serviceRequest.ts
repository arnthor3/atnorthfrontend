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
