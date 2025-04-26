import { setupWorker } from 'msw/browser'
import { getServiceRequests } from './serviceRequest'
import { login, sessionStatus, logout } from './user'
import { getCompany } from './company'

export const worker = setupWorker(
  getServiceRequests,
  getCompany,
  login,
  logout,
  sessionStatus
)
