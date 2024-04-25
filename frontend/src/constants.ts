const isDev = import.meta.env.DEV

export const BASE_URL = isDev ? 'http://localhost:3000/api' : '/api'
