import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthState, LoginValues } from '../types/auth'
import * as api from '../api/auth'
import { getErrorMessage } from '../helpers/error'

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  isSessionChecked: false
}

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false

        console.error('Login failed:', action.payload) // action.payload contains the error message
        // TODO: update "error state"
      })

    // Session Check
    builder
      .addCase(sessionCheck.fulfilled, (state, action) => {
        state.isSessionChecked = true

        if (action.payload.active) {
          state.isAuthenticated = true
        }
      })
      .addCase(sessionCheck.rejected, (state, action) => {
        state.isSessionChecked = false

        console.error('Session check failed:', action.payload) // action.payload contains the error message
        // TODO: update "error state"
      })
  }
})

// Export reducer
export default authSlice.reducer

// Selectors
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated

export const selectIsSessionChecked = (state: RootState) =>
  state.auth.isSessionChecked

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

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return api.logout()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const sessionCheck = createAsyncThunk(
  'auth/sessionCheck',
  async (_, { rejectWithValue }) => {
    try {
      return await api.sessionCheck()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)
