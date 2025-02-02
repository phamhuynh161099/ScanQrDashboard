import { AuthResponse } from "src/types/auth.type";
import http from "@/utils/http";

/**
 * Need separate
 */
export const URL_LOGIN = "auth/login";
export const URL_REGISTER = "register";
export const URL_LOGOUT = "logout";
export const URL_REFRESH_TOKEN = "refresh-access-token";
export const URL_ME = "auth/me";

const authApi = {
  /**
   * Test register account
   */
  registerAccount(body: { username: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body);
  },

  /**
   * Test login
   */
  login(body: { username: string; password: string }) {
    return http.post<any>(URL_LOGIN, body);
  },

  /**
   * Test logout
   */
  logout() {
    return http.post(URL_LOGOUT);
  },

  /**
   * Get my infor
   */
  me() {
    return http.get<AuthResponse>(URL_ME);
  },
};

export default authApi;
