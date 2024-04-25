export interface AuthState {
  isAuthenticated: boolean
  isSessionChecked: boolean
}

export interface LoginValues {
  email: string
  password: string
}

export interface SessionCheck {
  active: boolean
}
