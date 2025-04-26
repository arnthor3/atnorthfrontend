import ky from 'ky'

import type { User } from '../types/user'
export type UserAuth = {
  email: string
  password: string
}

type LoginSuccessResponse = {
  data: User
}

export const login = async (userAuth: UserAuth): Promise<User | undefined> => {
  const response = await ky
    .post('/api/login', {
      json: userAuth
    })
    .json<LoginSuccessResponse>()
  if (!response || !response.data) {
    throw new Error('Invalid successful response format from login API.')
  }
  return response.data
}

export const logout = async (): Promise<boolean> => {
  try {
    const response = await ky.post('/api/logout')
    return response.status === 200
  } catch (error) {
    return false
  }
}

export const getSessionStatus = async (): Promise<User> => {
  const res = await ky.get('/api/session-status').json<LoginSuccessResponse>()
  if (!res || !res.data) {
    throw new Error('Invalid successful response format from login API.')
  }
  return res.data
}
