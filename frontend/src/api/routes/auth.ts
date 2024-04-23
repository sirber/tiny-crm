import httpClient from '@/api/axios'

const basePath = '/api/auth/'

export function getSession() {
  return httpClient.get(basePath).then((response) => response.data)
}

export function login(user: any) {
  return httpClient.post(basePath + 'login', user).then((response) => response.data)
}
