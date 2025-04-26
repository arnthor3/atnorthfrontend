import { http, HttpResponse } from 'msw'
import {
  generateSessionId,
  JSON_HEADER,
  simulateWait,
  validateSession
} from './mockUtils'

export type UserInfo = {
  sessionId: string
  userId: string
  username: string
  initials: string
  email: string
  role: string
  lastActivity: Date
  expiresAt: Date
  company: string
}

type UserJsonBody = {
  email: string
  password: string
}

const MOCK_USER_SESSION: UserInfo = {
  sessionId: '1234567890',
  userId: '1234567890',
  username: 'Keith Richards',
  initials: 'KR',
  email: 'test@test.om',
  role: 'org admin',
  lastActivity: new Date(),
  expiresAt: new Date(),
  company: 'comp-1234567890'
}

const USER_CREDENTIALS: UserJsonBody = {
  email: 'keith.richards@test.com',
  password: 'test1234'
}

const SESSION_EXPIRY = 5 * 60 * 1000

export const login = http.post('/api/login', async ({ request, cookies }) => {
  if (validateSession(cookies.sessionId)) {
    return HttpResponse.json(
      { message: `Already logged in ${cookies.sessionId}` },
      { status: 200 }
    )
  }

  const { email, password } = (await request.json()) as UserJsonBody
  try {
    await simulateWait({
      waitRange: [300, 900],
      chancesOfError: 15,
      errorMessage:
        'Opps... Something went wrong, please try again - (mock error)'
    })
  } catch (error) {
    return HttpResponse.json(
      { data: error },
      {
        status: 500,
        headers: { ...JSON_HEADER },
        statusText: 'Internal Server Error'
      }
    )
  }

  if (
    email !== USER_CREDENTIALS.email ||
    password !== USER_CREDENTIALS.password
  ) {
    return HttpResponse.json(
      { error: 'Invalid username or password' },
      { status: 401, statusText: 'Unauthorized' }
    )
  }
  const sessionId = generateSessionId()
  console.log(sessionId)
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
  return HttpResponse.json(
    {
      error: {
        code: 'unauthorized',
        message: 'No active session found.',
        details:
          'The user does not have a valid or active session on the server. Please authenticate or log in.'
      }
    },
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
