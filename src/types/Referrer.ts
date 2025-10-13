export interface ReferrerData {
  id: string;
  referrer: string;
  alias?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetReferrerResponse {
  items: ReferrerData[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface CreateReferrerBody {
  referrer: string;
  alias?: string;
}

export interface UpdateReferrerBody {
  referrer?: string;
  alias?: string;
}