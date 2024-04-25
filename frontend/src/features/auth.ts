import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store"; // assuming you have a RootState type defined

// Define the interface for the state
interface AuthState {
  isAuthenticated: boolean;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isAuthenticated = true;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const { loginSuccess, logoutSuccess } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

// Thunks
export const login =
  (username: string, password: string) => async (dispatch: Dispatch) => {
    console.log(username, password);

    // Perform login logic here, like making an API call
    // For example:
    try {
      // Simulate API call
      // const response = await api.login(username, password);
      // const data = response.data;

      // Simulated success
      dispatch(loginSuccess());
    } catch (error) {
      // Handle login failure
      console.error("Login failed:", error);
      // You might want to dispatch an action here to update state indicating login failure
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  // Perform logout logic here, like making an API call to invalidate session
  // For example:
  try {
    // Simulate API call
    // const response = await api.logout();

    // Simulated success
    dispatch(logoutSuccess());
  } catch (error) {
    // Handle logout failure
    console.error("Logout failed:", error);
    // You might want to dispatch an action here to update state indicating logout failure
  }
};
