import { AxiosError } from "axios";

export interface Pagination {
  currentPage: number;
  currentResult: number;
  limit: number;
  totalPage: number;
  totalResult: number;
}

export interface ApiResponse<T> {
  code: number;
  data?: T;
  errorDetails?: AxiosError;
  message: string;
}
