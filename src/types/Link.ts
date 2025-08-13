export interface LinkData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customAlias?: string;
  clicks: number;
  maxClicks?: number;
  createdAt: Date;
  expiresAt?: Date;
  description?: string;
  password?: string;
  isPasswordProtected: boolean;
  status: "active" | "expired" | "disabled" | "limit_reached";
}
