import useSWRMutation from "swr/mutation";
import { AuthFormValues } from "@/app/[locale]/login/validation";
import { api } from "@/services/axios";
import { LoginResponse } from "@/types/auth";

export const useLogin = () => {
  const url = "v1/auth/login";

  const fetcher = async (key: string, { arg }: { arg: AuthFormValues }) => {
    return api.post<LoginResponse, AuthFormValues>(key, arg);
  };

  return useSWRMutation(url, fetcher);
};
