import axios from 'axios'

const client = axios.create()

if (import.meta.env.DEV) {
  client.defaults.baseURL = 'http://localhost:3000'
}

export default client
