import { AuthResponse } from 'src/types/auth.type'
import http from '@/utils/http'

export const URL_LOGIN = 'auth/login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const URL_ME = 'auth/me'

const authApi = {
  registerAccount(body: { username: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  login(body: { username: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },

  logout() {
    return http.post(URL_LOGOUT)
  },


  me() {
    return http.get<AuthResponse>(URL_ME)
  },
}

export default authApi
