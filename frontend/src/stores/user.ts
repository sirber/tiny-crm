import { defineStore } from 'pinia'
import { login } from '../api/auth'
import { getProfile } from '../api/profile'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import type { User } from '@/types/User'
import type { Business } from '@/types/Business'

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    token: '',
    business: [] as Business[],
    roles: ''
  }),

  getters: {
    isAdmin: (state) => state.roles.includes('admin'),
    isAuthenticated: (state) => {
      if (!state.token) {
        return false
      }

      // Check if the token is still valid
      const decodedToken = jwtDecode(state.token) as { exp: number }
      const now = Date.now().valueOf() / 1000

      if (decodedToken?.exp > now) {
        return true
      }

      state.token = ''
      return false
    }
  },

  actions: {
    doLogin(email: string, password: string) {
      return login({ email, password })
        .then((payload) => {
          // Token
          const token = payload.access_token
          this.token = token
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

          // User Profile
          return getProfile()
        })
        .then((user: User) => {
          this.roles = user.roles

          // Business
          this.business = user.business
          const defaultBusiness = this.business.find((b) => b.isDefault)

          if (defaultBusiness) {
            axios.defaults.headers.common['Business'] = defaultBusiness.id
          }
        })
    },

    doLogout() {
      axios.defaults.headers.common['Authorization'] = ''
      axios.defaults.headers.common['Business'] = ''
      this.token = ''
    }
  }
})
