import useSWR from "swr";
import { User } from "@/types/user";
import { api } from "@/services/axios";

export const useGetMe = () => {
  const url = `v1/auth/me`;
  const fetcher = async (url: string) => {
    const response = await api.get<User>(url);
    return response.data;
  };

  return useSWR(url, fetcher);
};
