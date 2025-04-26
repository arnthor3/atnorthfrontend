export type User = {
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

export type UserJsonBody = {
  email: string
  password: string
}
