import { Dispatch, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define the interface for the state
interface AuthState {
  isAuthenticated: boolean
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false
}

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isAuthenticated = true
    },
    logoutSuccess(state) {
      state.isAuthenticated = false
    }
  }
})

// Export actions
export const { loginSuccess, logoutSuccess } = authSlice.actions

// Export reducer
export default authSlice.reducer

// Selectors
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated

// Thunks
export const login =
  (username: string, password: string) => async (dispatch: Dispatch) => {
    try {
      console.log(username, password)

      // TODO: API call
      // const response = await api.login(username, password);
      // const data = response.data;

      dispatch(loginSuccess())
    } catch (error) {
      // TODO: handle error
      console.error('Login failed:', error)
    }
  }

export const logout = () => async (dispatch: Dispatch) => {
  try {
    // TODO: API call
    // const response = await api.logout();

    dispatch(logoutSuccess())
  } catch (error) {
    // TODO: handle error
    console.error('Logout failed:', error)
  }
}

export const session = () => async (dispatch: Dispatch) => {
  try {
    // TODO: API call

    dispatch(loginSuccess())
  } catch (error) {
    // TODO: handle error
    console.error('Session check failed:', error)
  }
}
