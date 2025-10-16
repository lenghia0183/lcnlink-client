import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { api } from "@/services/axios";
import {
  ReferrerData,
  GetReferrerResponse,
  CreateReferrerBody,
  UpdateReferrerBody,
} from "@/types/Referrer";

interface GetReferrersParams {
  page?: number;
  limit?: number;
  keyword?: string;
}

const getReferrersList = async (params: GetReferrersParams) => {
  const response = await api.get<GetReferrerResponse>(
    "v1/referrers/list",
    params
  );
  return response.data;
};

export const useGetReferrers = (params: GetReferrersParams) => {
  const url = `v1/referrers/list`;

  return useSWR(url, () => getReferrersList(params));
};

export const useDeleteReferrer = () => {
  const url = "v1/referrers/:id";

  const fetcher = async (key: string, { arg }: { arg: { id: string } }) => {
    const finalUrl = key.replace(":id", arg.id);
    const response = await api.delete(finalUrl);
    return response;
  };

  return useSWRMutation(url, fetcher);
};

export const useCreateReferrer = () => {
  const url = "v1/referrers";

  const fetcher = async (
    key: string,
    { arg }: { arg: { body: CreateReferrerBody } }
  ) => {
    const response = await api.post<ReferrerData, CreateReferrerBody>(
      key,
      arg.body
    );
    return response;
  };

  return useSWRMutation(url, fetcher);
};

export const useUpdateReferrer = () => {
  const url = "v1/referrers/:id";

  const fetcher = async (
    key: string,
    { arg }: { arg: { id: string; body: UpdateReferrerBody } }
  ) => {
    const finalUrl = key.replace(":id", arg.id);
    const response = await api.put<ReferrerData, UpdateReferrerBody>(
      finalUrl,
      arg.body
    );
    return response;
  };

  return useSWRMutation(url, fetcher);
};

export const fetchReferrers = async (
  params: GetReferrersParams
): Promise<ReferrerData[]> => {
  const response = await getReferrersList(params);
  return response?.items || [];
};

export const searchReferrers = async (
  keyword: string
): Promise<ReferrerData[]> => {
  return fetchReferrers({ keyword, limit: 10 });
};
