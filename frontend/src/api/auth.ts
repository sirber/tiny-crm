import { LoginValues } from '../types/auth'
import { post } from './api'

export async function login(credentials: LoginValues): Promise<void> {
  const { email, password } = credentials

  return post('/auth/login', { email, password })
}

export async function logout(): Promise<void> {
  return post('/auth/logout')
}
