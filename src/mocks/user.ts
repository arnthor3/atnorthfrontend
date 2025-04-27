import { http, HttpResponse } from 'msw'
import { generateSessionId, simulateWait, validateSession } from './mockUtils'
import type { User, UserJsonBody } from '../types/user'

export const MOCK_USER_SESSION: User = {
  sessionId: '',
  userId: 'fake_user_id',
  name: 'Keith Richards',
  initials: 'KR',
  email: 'test@test.com',
  role: 'org admin',
  lastActivity: new Date(),
  expiresAt: new Date(),
  company: 'comp-1234567890'
}

export const USER_CREDENTIALS: UserJsonBody = {
  email: MOCK_USER_SESSION.email,
  password: 'test1234'
}

const SESSION_EXPIRY = 60 * 10

export const login = http.post('/api/login', async ({ request, cookies }) => {
  if (validateSession(cookies.sessionId)) {
    return HttpResponse.json(
      {
        message: `Active session in place`,
        data: MOCK_USER_SESSION
      },
      { status: 200 }
    )
  }

  const { email, password } = (await request.json()) as UserJsonBody

  await simulateWait([300, 900])

  if (
    email !== USER_CREDENTIALS.email ||
    password !== USER_CREDENTIALS.password
  ) {
    return HttpResponse.json(
      { data: 'Error', status: 'error', error: 'Invalid username or password' },
      { status: 401, statusText: 'Unauthorized' }
    )
  }
  const sessionId = generateSessionId()
  return HttpResponse.json(
    { status: 'success', data: MOCK_USER_SESSION },
    {
      status: 200,
      headers: {
        'Set-Cookie': `sessionId=${sessionId}; Max-Age=${SESSION_EXPIRY}`
      }
    }
  )
})

export const sessionStatus = http.get('/api/session-status', ({ cookies }) => {
  if (validateSession(cookies.sessionId)) {
    return HttpResponse.json(
      { status: 'success', data: MOCK_USER_SESSION },
      { status: 200 }
    )
  }
  localStorage.clear()

  return HttpResponse.json(
    { data: 'error', error: 'Unauthorized: Invalid or missing session' },
    { status: 401, statusText: 'Unauthorized' }
  )
})

export const logout = http.post('/api/logout', () => {
  // clear both private MSW and apps storage data
  localStorage.clear()
  return new HttpResponse(null, {
    status: 200,
    headers: {
      'Set-Cookie': `sessionId=; Path=/; Max-Age=0`
    }
  })
})
