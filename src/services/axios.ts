/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { getCookie } from "cookies-next";

import { ApiResponse } from "@/types/ApiResponse";
import eventEmitter from "@/utils/eventEmitter";
import { EVENT_EMITTER } from "@/constants/common";
import { getServerCookies } from "@/utils/cookies.";
import { isServer } from "@/utils/env";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/" || "";
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN + "/api/" || "";
const isDevelopment = process.env.NEXT_PUBLIC_ENV === "development";

const REFRESH_TOKEN_URL = "auth/refresh-token";
const HEADERS_MULTIPLE_PART = {
  "Content-Type": "multipart/form-data; boundary=something",
};

// --- Tạo Axios instance ---
export const createInstance = (
  baseURL: string,
  customHeaders: Record<string, string> = {},
  useToken = true
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...customHeaders,
    },
  });

  // request interceptor chỉ thêm token nếu useToken = true
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      let token: string | undefined;
      let locale: string | undefined;

      if (isServer) {
        token = await getServerCookies("accessToken");
      } else {
        token = getCookie("accessToken") as string | undefined;
        locale = getCookie("i18n") as string | undefined;
      }

      if (locale) {
        config.headers = axios.AxiosHeaders.from(config.headers || {});
        config.headers.set("x-lang", locale);
      }

      if (token && config.url !== REFRESH_TOKEN_URL) {
        config.headers = axios.AxiosHeaders.from(config.headers || {});
        if (useToken) {
          config.headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // response interceptor: refresh token nếu 401
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.status >= 200 && response.status < 300
        ? response.data
        : Promise.reject(response);
    },
    async (error: AxiosError) => {
      const { response } = error;
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
        response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest?.url !== REFRESH_TOKEN_URL
      ) {
        originalRequest._retry = true;
        try {
          await refreshAccessToken();
          return instance(originalRequest);
        } catch {
          eventEmitter.emit(EVENT_EMITTER.LOGOUT);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// --- Xử lý lỗi ---
const handleAxiosError = <T>(err: unknown): ApiResponse<T> => {
  if (axios.isAxiosError(err)) {
    console.log("err", err);
    return {
      statusCode: err.response?.data?.code || err.response?.status || 500,
      message: err.response?.data?.message || err.message,
      errorCode: err.response?.data?.errorCode,
      ...(isDevelopment ? { errorDetails: err } : {}),
    };
  }
  throw err;
};

// --- Tạo API wrapper ---
export const createApi = (instance: AxiosInstance) => ({
  instance,

  post: async <T, Body = Record<string, unknown>>(
    endpoint: string,
    body: Body
  ): Promise<ApiResponse<T>> => {
    try {
      return await instance.post(endpoint, body);
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  postMultiplePart: async <T>(
    endpoint: string,
    params: Record<string, unknown>
  ): Promise<ApiResponse<T>> => {
    try {
      return await instance.post(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
      });
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  putMultiplePart: async <T>(
    endpoint: string,
    params: Record<string, unknown> | FormData
  ): Promise<ApiResponse<T>> => {
    try {
      return await instance.put(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
      });
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  get: async <T, Params = unknown>(
    endpoint: string,
    params?: Params,
    options: Record<string, string> = {}
  ): Promise<ApiResponse<T>> => {
    try {
      return await instance.get(endpoint, {
        params,
        ...options,
      });
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  put: async <T, Params>(
    endpoint: string,
    params: Params
  ): Promise<ApiResponse<T>> => {
    try {
      return await instance.put(endpoint, params);
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  patch: async <T, Params>(endpoint: string, params: Params) => {
    try {
      return await instance.patch(endpoint, params);
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  delete: async <T, Params = Record<string, unknown>>(
    endpoint: string,
    params?: Params
  ): Promise<ApiResponse<T>> => {
    try {
      return await instance.delete(endpoint, { data: params });
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },
});

// --- Refresh access token ---
export const refreshAccessToken = async () => {
  const res = await nextApiNoToken.post(REFRESH_TOKEN_URL, {});
  if (!res) throw new Error("Failed to refresh token");
  console.log("refresh token response", res);
};

// --- Tạo instance ---
const instance = createInstance(BASE_URL);
const nextApiInstance = createInstance(DOMAIN);

const instanceNoToken = createInstance(BASE_URL, {}, false);
const instanceNextApiNoToken = createInstance(DOMAIN, {}, false);

// --- Tạo API ---
const api = createApi(instance);
const nextApi = createApi(nextApiInstance);

const apiNoToken = createApi(instanceNoToken);
const nextApiNoToken = createApi(instanceNextApiNoToken);

export { api, nextApi, apiNoToken, nextApiNoToken };
