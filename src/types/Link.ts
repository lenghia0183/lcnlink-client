import { Meta } from "./ApiResponse";
import { LinkStatus } from "@/constants/common";

export interface LinkData {
  id: string;
  originalUrl: string;
  shortedUrl: string;
  alias?: string;
  clicksCount: number;
  successfulAccessCount: number;
  maxClicks?: number;
  isActive: boolean;
  expireAt?: string;
  createdAt: string;
  description?: string;
  password?: string;
  isUsePassword: boolean;
  status: LinkStatus;
}

export interface GetLinkResponse extends Meta {
  items: LinkData[];
}

export interface CreateLinkBody {
  originalUrl: string;
  alias?: string;
  expireAt?: string;
  password?: string;
  description?: string;
  maxClicks?: number;
}

export interface UpdateLinkBody {
  alias?: string;
  expireAt?: string;
  password?: string;
  description?: string;
  maxClicks?: number;
}

export type GetTotalLinkPerStatusResponse = {
  [key in LinkStatus]: number;
};

export interface GetLinkStatisticOverviewResponse {
  totalLink: number;
  totalClicks: number;
  totalProtectedLink: number;
  totalLimitedLink: number;
}

export interface VerifyPasswordLinkBody {
  password: string;
}

export interface VerifyPasswordLinkResponse {
  originalUrl: string;
}
