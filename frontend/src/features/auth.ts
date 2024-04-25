import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthState, LoginValues } from '../types/auth'
import * as api from '../api/auth'
import { getErrorMessage } from '../helpers/error'

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false

        console.error('Login failed:', action.payload) // action.payload contains the error message
        // TODO: update "error state"
      })
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
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginValues, { rejectWithValue }) => {
    try {
      return api.login(credentials)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  // TODO: call api
  return logoutSuccess()
})
