import useSWR from "swr";

import { api } from "@/services/axios";
import { GetLinkResponse } from "@/types/Link";

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
