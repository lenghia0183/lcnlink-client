import { Meta } from "./ApiResponse";
import { LinkStatus } from "@/constants/common";

export interface LinkData {
  id: string;
  originalUrl: string;
  shortedUrl: string;
  alias?: string;
  clicksCount?: number;
  successfulAccessCount: number;
  maxClicks?: number;
  isActive: boolean;
  expireAt?: string;
  createdAt: string;
  description?: string;
  password?: string;
  isUsePassword: boolean;
  status: LinkStatus;
  referrer: { id: string; referrer: string; alias?: string } | null;
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
  maxClicks?: number | null;
  referrerId?: string;
}

export interface UpdateLinkBody {
  alias?: string;
  expireAt?: string;
  newPassword?: string | null;
  currentPassword?: string | null;
  description?: string;
  maxClicks?: number | null;
  referrerId?: string;
}

export type GetTotalLinkPerStatusResponse = {
  [key in LinkStatus]: number;
};

export interface GetLinkStatisticOverviewResponse {
  totalLink: number;
  totalClicks: number;
  totalProtectedLink: number;
  totalLimitedLink: number;
  totalUniqueVisitors: number;
  totalSuccessfulAccess: number;
  returningVisitorRate: number;
}

export interface VerifyPasswordLinkBody {
  password: string;
}

export interface VerifyPasswordLinkResponse {
  originalUrl: string;
}

export interface LinkAnalyticsDeviceBreakdownResponse {
  device: string;
  count: number;
  percentage: number;
}

export interface LinkAnalyticsBrowserBreakdownResponse {
  browser: string;
  count: number;
  percentage: number;
}

export interface LinkAnalyticsCountryBreakdownResponse {
  country: string;
  count: number;
  percentage: number;
}

export interface LinkAnalyticsConsolidatedResponse {
  trend: Record<string, unknown>;
  countries: LinkAnalyticsCountryBreakdownResponse[];
  devices: LinkAnalyticsDeviceBreakdownResponse[];
  browsers: LinkAnalyticsBrowserBreakdownResponse[];
}
