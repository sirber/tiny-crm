import { LoginValues, SessionCheck } from '../types/auth'
import { get, post } from './api'

export async function login(credentials: LoginValues): Promise<void> {
  const { email, password } = credentials

  return post('/auth/login', { email, password })
}

export async function logout(): Promise<void> {
  return post('/auth/logout')
}

export async function sessionCheck(): Promise<SessionCheck> {
  // FIXME: use an interface for return
  return get('/auth/session')
}
