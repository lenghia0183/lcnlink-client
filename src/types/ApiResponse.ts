import { ErrorCodeEnum, ResponseCodeEnum } from "@/constants/reponse-code";
import { AxiosError } from "axios";

export interface Meta {
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ApiResponse<T> {
  statusCode: ResponseCodeEnum;
  data?: T;
  errorDetails?: AxiosError;
  message: string;
  errorCode?: ErrorCodeEnum;
}
