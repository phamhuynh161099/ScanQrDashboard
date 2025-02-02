import HttpStatusCode from "@/constants/httpStatusCode.enum";
import axios, { AxiosError, type AxiosInstance } from "axios";
// import { toast } from 'react-toastify'
import { URL_LOGIN, URL_LOGOUT, URL_REGISTER } from "@/apis/auth.api";
import config from "@/constants/config";
import { ErrorResponse } from "src/types/utils.type";
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS,
} from "./auth";
import { isAxiosUnauthorizedError } from "./utils";
export class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "expire-access-token": 60 * 60 * 24, // 1 ngày
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data;
          console.log("access_token", data.accessToken);
          this.accessToken = data.accessToken;
          this.refreshToken = data.refreshToken;

          setAccessTokenToLS(this.accessToken);
          setRefreshTokenToLS(this.refreshToken);
          setProfileToLS(data);
        } else if (url === URL_LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";
          clearLS();
        }
        return response;
      },
      (error: AxiosError) => {
        // Error code 422 401
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
          ].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          //   toast.error(message)
        }

        // Nếu là lỗi 401
        if (
          isAxiosUnauthorizedError<
            ErrorResponse<{ name: string; message: string }>
          >(error)
        ) {
          clearLS();
          this.accessToken = "";
          this.refreshToken = "";
          //   toast.error(error.response?.data.data?.message || error.response?.data.message)
        }
        return Promise.reject(error);
      }
    );
  }
}
const http = new Http().instance;
export default http;
