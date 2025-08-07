/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosHeaders,
} from "axios";
import { getCookie, setCookie } from "cookies-next";

import { ApiResponse } from "@/types/ApiResponse";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import eventEmitter from "@/utils/eventEmitter";
import { EVENT_EMITTER } from "@/constants/common";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/" || "";
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN + "/api/" || "";

const isDevelopment = process.env.NEXT_PUBLIC_ENV === "development";

const REFRESH_TOKEN_URL = "auth/refresh-token";
const HEADERS_MULTIPLE_PART = {
  "Content-Type": "multipart/form-data; boundary=something",
};

const isServer = typeof window === "undefined";

const getServerCookies = async (name: string) => {
  if (!isServer) return undefined;
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const createInstance = (
  baseURL: string,
  customHeaders: Record<string, string> = {}
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

  instance.interceptors.request.use(
    async (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      let token: string | undefined;
      if (isServer) {
        token = await getServerCookies("accessToken");
      } else {
        token =
          getLocalStorageItem("accessToken") ||
          (getCookie("accessToken") as string | undefined);
      }

      if (config.url !== REFRESH_TOKEN_URL && token) {
        config.headers = axios.AxiosHeaders.from(config.headers || {});
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      // console.log(`🟢 Requesting: ${config.baseURL}${config.url}`, config.params, config.headers);
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else if (response.status === 401) {
        eventEmitter.emit(EVENT_EMITTER.LOGOUT);
      }
      return Promise.reject(response);
    },
    async (error: AxiosError) => {
      const { response } = error;

      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _isRefreshBefore?: boolean;
      };

      if (
        response?.status === 401 &&
        !originalRequest._isRefreshBefore &&
        originalRequest?.url !== REFRESH_TOKEN_URL &&
        getLocalStorageItem("refreshToken")
      ) {
        originalRequest._isRefreshBefore = true;
        try {
          const refresh = await refreshAccessToken();
          const newAccessToken = refresh?.data?.accessToken;

          if (newAccessToken) {
            setLocalStorageItem("accessToken", newAccessToken);
            setCookie("accessToken", newAccessToken);
            setCookie("refreshToken", newAccessToken);

            originalRequest.headers = AxiosHeaders.from(
              originalRequest.headers || {}
            );
            originalRequest.headers.set(
              "Authorization",
              `Bearer ${newAccessToken}`
            );
            return instance(originalRequest);
          }
        } catch (refreshError) {
          eventEmitter.emit(EVENT_EMITTER.LOGOUT);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const handleAxiosError = <T>(err: unknown): ApiResponse<T> => {
  if (axios.isAxiosError(err)) {
    const errorResponse: ApiResponse<T> = {
      code: err.response?.data?.code || err.response?.status || 500,
      message: err.response?.data?.message || err.message,
      ...(isDevelopment ? { errorDetails: err } : {}),
    };
    return errorResponse;
  }
  throw err;
};

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

  get: async <T, Params = Record<string, unknown>>(
    endpoint: string,
    params?: Params,
    options: Record<string, string> = {}
  ): Promise<ApiResponse<T>> => {
    try {
      return await instance.get(endpoint, { ...options, ...params });
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  put: async <T, Params>(
    endpoint: string,
    params: Params
  ): Promise<ApiResponse<T> | AxiosError> => {
    try {
      return await instance.put(endpoint, params);
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  patch: async <T, Params>(
    endpoint: string,
    params: Params
  ): Promise<ApiResponse<T> | AxiosError> => {
    try {
      return await instance.patch(endpoint, params);
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  delete: async <T, Params = Record<string, unknown>>(
    endpoint: string,
    params?: Params
  ): Promise<ApiResponse<T> | AxiosError> => {
    try {
      return await instance.delete(endpoint, { data: params });
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },
});

export const refreshAccessToken = async () => {
  const refreshToken =
    (getCookie("refreshToken") as string | undefined) ||
    getLocalStorageItem("refreshToken");
  return api.instance.post(REFRESH_TOKEN_URL, {
    refreshToken,
  });
};

const instance = createInstance(BASE_URL);

const nextApiInstance = createInstance(DOMAIN);

const api = createApi(instance);
export const nextApi = createApi(nextApiInstance);

export { api };
