import { LinkStatus } from "@/constants/common";
import { Meta } from "./ApiResponse";

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
