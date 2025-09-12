import { toast } from "@/components/AppToast";
import { PATH } from "@/constants/path";
import { handleAuthSuccess } from "@/utils/auth-cookies";
import { LoginResponse } from "@/types/auth";
import { ApiResponse } from "@/types/ApiResponse";
import { ErrorCodeEnum } from "@/constants/reponse-code";

export interface AuthFlowOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  showSuccessToast?: boolean;
  redirectTo?: string;
}

export interface RememberMeData {
  email: string;
  password: string;
  remember: boolean;
}

export const handleSuccessfulAuth = async (
  response: ApiResponse<LoginResponse>,
  rememberMeData?: RememberMeData,
  options: AuthFlowOptions = {}
): Promise<boolean> => {
  const { onSuccess, showSuccessToast = true } = options;

  try {
    // Set authentication cookies
    const success = await handleAuthSuccess(
      {
        accessToken: response.data?.accessToken ?? "",
        refreshToken: response.data?.refreshToken ?? "",
      },
      rememberMeData
    );

    if (success) {
      if (showSuccessToast) {
        toast.success(response.message);
      }

      onSuccess?.();
      return true;
    }

    return false;
  } catch (error) {
    console.error("Auth success handling failed:", error);
    return false;
  }
};

export const handle2FARequired = async (
  response: ApiResponse<LoginResponse>,
  rememberMeData?: RememberMeData,
  options: AuthFlowOptions = {}
): Promise<boolean> => {
  const { onSuccess } = options;

  try {
    // Set authentication cookies for 2FA flow
    const success = await handleAuthSuccess(
      {
        accessToken: response.data?.accessToken ?? "",
        refreshToken: response.data?.refreshToken ?? "",
      },
      rememberMeData
    );

    if (success) {
      onSuccess?.();
      return true;
    }

    return false;
  } catch (error) {
    console.error("2FA handling failed:", error);
    return false;
  }
};

export const handleEmailNotVerifiedError = (
  email: string,
  onResendEmail: (email: string) => void,
  isResending: boolean,
  tEmailVerify: (key: string) => string
) => {
  const toastId = toast.error(
    tEmailVerify("title"),
    tEmailVerify("description"),
    {
      action: {
        label: isResending
          ? tEmailVerify("resending")
          : tEmailVerify("resendEmail"),
        onClick: () => onResendEmail(email),
      },
      duration: 10000,
    }
  );
  console.log("toastId", toastId);
  return toastId;
};

export const handleAuthError = (
  response: { errorCode?: string; message: string },
  email: string,
  onResendEmail: (email: string) => void,
  isResending: boolean,
  tEmailVerify: (key: string) => string
): number | string | null => {
  // Check if it's EMAIL_NOT_VERIFIED error
  if (response.errorCode === ErrorCodeEnum.EMAIL_NOT_VERIFIED) {
    return handleEmailNotVerifiedError(
      email,
      onResendEmail,
      isResending,
      tEmailVerify
    );
  }
  console.log("response return null", response);
  // Handle other errors
  toast.error(response.message);
  return null;
};

export const createAuthFlowHandler = (
  loginUser: (user: LoginResponse) => void,
  router: { push: (path: string) => void },
  onResendEmail: (email: string) => void,
  isResendingEmail: boolean,
  tEmailVerify: (key: string) => string
) => {
  return {
    handleSuccess: async (
      response: ApiResponse<LoginResponse>,
      rememberMeData?: RememberMeData
    ) => {
      const success = await handleSuccessfulAuth(response, rememberMeData, {
        onSuccess: () => {
          if (response.data) {
            loginUser(response.data);
          }
          router.push(PATH.HOME);
        },
      });

      return success;
    },

    handle2FA: async (
      response: ApiResponse<LoginResponse>,
      rememberMeData?: RememberMeData
    ) => {
      const success = await handle2FARequired(response, rememberMeData, {
        onSuccess: () => {
          router.push(`${PATH.VERIFY_2FA}?token=${response.data?.otpToken}`);
          toast.info(response.message);
        },
      });

      return success;
    },

    handleError: (
      response: { errorCode?: string; message: string },
      email: string
    ) => {
      return handleAuthError(
        response,
        email,
        onResendEmail,
        isResendingEmail,
        tEmailVerify
      );
    },
  };
};
