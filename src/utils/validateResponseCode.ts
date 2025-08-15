import { ResponseCodeEnum } from "@/constants/reponse-code";

const validateResponseCode = (code: ResponseCodeEnum) => {
  if ([ResponseCodeEnum.SUCCESS, ResponseCodeEnum.CREATED].includes(code)) {
    return true;
  }
  return false;
};
export default validateResponseCode;
