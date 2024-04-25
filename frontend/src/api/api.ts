import { BASE_URL } from '../constants'

// Function to handle common options and error checking for fetch requests
async function handleResponse(response: Response) {
  // Error check
  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
    )
  }

  // Check if response body is empty
  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    return {} // Return empty JSON object if body is empty
  }

  return response.json()
}

// GET request function
export async function get(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return handleResponse(response)
}

// POST request function
export async function post(endpoint: string, data: unknown = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return handleResponse(response)
}

// PUT request function
export async function put(endpoint: string, data: unknown = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return handleResponse(response)
}

// DELETE request function
export async function del(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return handleResponse(response)
}
