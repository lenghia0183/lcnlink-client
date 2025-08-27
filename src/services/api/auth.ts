import useSWR from "swr";
import { User } from "@/types/user";
import { api, apiNoToken } from "@/services/axios";
import {
  ForgotPasswordBody,
  LoginBody,
  LoginResponse,
  RegisterBody,
  RegisterResponse,
} from "@/types/auth";

import useSWRMutation from "swr/mutation";

export const useGetMe = () => {
  const url = `v1/auth/me`;
  const fetcher = async (url: string) => {
    const response = await api.get<User>(url);
    return response.data;
  };

  return useSWR(url, fetcher);
};

export const useLogin = () => {
  const url = "v1/auth/login";

  const fetcher = async (key: string, { arg }: { arg: LoginBody }) => {
    return apiNoToken.post<LoginResponse, LoginBody>(key, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useRegister = () => {
  const url = "v1/auth/register";

  const fetcher = async (key: string, { arg }: { arg: RegisterBody }) => {
    return apiNoToken.post<RegisterResponse, RegisterBody>(key, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useForgotPassword = () => {
  const url = "v1/auth/forgot-password";

  const fetcher = async (key: string, { arg }: { arg: ForgotPasswordBody }) => {
    return apiNoToken.post<RegisterResponse, ForgotPasswordBody>(key, arg);
  };

  return useSWRMutation(url, fetcher);
};
