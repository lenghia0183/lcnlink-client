import useSWR from "swr";

import { api } from "@/services/axios";
import {
  CreateLinkBody,
  GetLinkResponse,
  GetLinkStatisticOverviewResponse,
  GetTotalLinkPerStatusResponse,
  LinkAnalyticsBrowserBreakdownResponse,
  LinkAnalyticsCountryBreakdownResponse,
  LinkAnalyticsDeviceBreakdownResponse,
  LinkData,
  UpdateLinkBody,
  VerifyPasswordLinkResponse,
} from "@/types/Link";
import useSWRMutation from "swr/mutation";
import { VerifyPasswordLinkBody } from "./../../types/Link";

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

export const useCreateLink = () => {
  const url = "v1/links";

  const fetcher = async (
    key: string,
    { arg }: { arg: { body: CreateLinkBody } }
  ) => {
    const response = await api.post<LinkData, CreateLinkBody>(key, arg.body);
    return response;
  };

  return useSWRMutation(url, fetcher);
};

export const useUpdateLink = () => {
  const url = "v1/links/:id";

  const fetcher = async (
    key: string,
    { arg }: { arg: { id: string; body: UpdateLinkBody } }
  ) => {
    const finalUrl = key.replace(":id", arg.id);
    const response = await api.put<LinkData, UpdateLinkBody>(
      finalUrl,
      arg.body
    );
    return response;
  };

  return useSWRMutation(url, fetcher);
};

export const useGetTotalLinkPerStatus = () => {
  const url = "v1/links/total-link-per-status";

  const fetcher = async (url: string) => {
    const response = await api.get<GetTotalLinkPerStatusResponse>(url);
    return response.data;
  };

  return useSWR(url, fetcher);
};

export const useGetLinkStatisticOverview = () => {
  const url = "v1/links/statistic-overview";

  const fetcher = async (url: string) => {
    const response = await api.get<GetLinkStatisticOverviewResponse>(url);
    return response.data;
  };

  return useSWR(url, fetcher);
};

export const useVerifyPasswordLink = () => {
  const url = "v1/links/:alias/verify-password";

  const fetcher = async (
    key: string,
    {
      arg,
    }: {
      arg: {
        alias: string;
        body: VerifyPasswordLinkBody;
      };
    }
  ) => {
    key = key.replace(":alias", arg.alias);
    return api.post<VerifyPasswordLinkResponse, VerifyPasswordLinkBody>(
      key,
      arg.body
    );
  };

  return useSWRMutation(url, fetcher);
};

export const useDeviceBreakdown = () => {
  const url = "v1/links/analytics/devices";

  const fetcher = async (url: string) => {
    const response = await api.get<LinkAnalyticsDeviceBreakdownResponse[]>(url);
    return response.data;
  };

  return useSWR(url, fetcher);
};

export const useGetBrowserBreakdown = () => {
  const url = "v1/links/analytics/browsers";

  const fetcher = async (url: string) => {
    const response = await api.get<LinkAnalyticsBrowserBreakdownResponse[]>(
      url
    );
    return response.data;
  };

  return useSWR(url, fetcher);
};

export const useGetCountryBreakdown = () => {
  const url = "v1/links/analytics/countries";

  const fetcher = async (url: string) => {
    const response = await api.get<LinkAnalyticsCountryBreakdownResponse[]>(
      url
    );
    return response.data;
  };

  return useSWR(url, fetcher);
};
