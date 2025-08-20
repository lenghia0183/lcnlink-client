import useSWR from "swr";

import { api } from "@/services/axios";
import { GetLinkResponse } from "@/types/Link";
import useSWRMutation from "swr/mutation";

interface GetLinksParams {
  page?: number;
  limit?: number;
  keyword?: string;
  filter?: string;
}

export const useGetLinks = (params: GetLinksParams) => {
  const url = `v1/links/list`;
  const fetcher = async (url: string) => {
    const response = await api.get<GetLinkResponse>(url, params);
    return response.data;
  };

  return useSWR(url, fetcher);
};

export const useDeleteLink = () => {
  const url = "v1/links/:id";

  const fetcher = async (key: string, { arg }: { arg: { id: string } }) => {
    const finalUrl = key.replace(":id", arg.id);
    const response = await api.delete(finalUrl);
    return response;
  };

  return useSWRMutation(url, fetcher);
};
