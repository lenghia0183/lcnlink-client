"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Check,
  QrCode,
  ShieldOff,
} from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/FormFields/TextField";
import { toast } from "@/components/AppToast";
import { AppDialog } from "@/components/AppDialog";
import { AppButton } from "@/components/AppButton";
import { AppCard } from "@/components/AppCard";
import Image from "next/image";
import { z } from "zod";
import { useChange2FA, useGenerate2FA } from "@/services/api/auth";
import { IS_2FA_ENUM } from "@/constants/common";
import validateResponseCode from "@/utils/validateResponseCode";

const getTwoFAManagementSchema = (t: (key: string) => string) =>
  z.object({
    code: z
      .string()
      .min(1, t("codeRequired"))
      .length(6, t("codeLength"))
      .regex(/^\d+$/, t("codeFormat")),
  });

type TwoFAManagementFormValues = z.infer<
  ReturnType<typeof getTwoFAManagementSchema>
>;

interface TwoFAManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userIsEnable2FA: IS_2FA_ENUM;
  onToggle2FA: (formValues: { twoFactorCode: string }) => void;
  isToggling: boolean;
}

export default function TwoFAManagementModal({
  open,
  onOpenChange,
  userIsEnable2FA,
  onToggle2FA,
  isToggling,
}: TwoFAManagementModalProps) {
  const t = useTranslations("Manage2FA");
  const tCommon = useTranslations("Common");
  const tProfile = useTranslations("Profile");
  const schema = getTwoFAManagementSchema(t);

  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [isShowSecret, setIsShowSecret] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const {
    data: generate2FAResponse,
    mutate: mutateGenerate2FA,
    isLoading: isLoadingGenerate2FA,
  } = useGenerate2FA();

  const { trigger: triggerChange2FA, isMutating: isMutatingChange2FA } =
    useChange2FA();

  useEffect(() => {
    if (open) {
      mutateGenerate2FA();
    }
  }, [open, mutateGenerate2FA]);

  useEffect(() => {
    if (generate2FAResponse) {
      setQrCodeUrl(generate2FAResponse?.data?.qrCodeUrl || "");
      setSecret(generate2FAResponse?.data?.secret || "");
    }
  }, [generate2FAResponse]);

  const methods = useForm<TwoFAManagementFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const generateNew2FA = async () => {
    mutateGenerate2FA();
  };

  const onSubmitUpdate2FA = async (formValues: TwoFAManagementFormValues) => {
    triggerChange2FA(
      {
        newTwoFactorSecret: secret,
        otp: formValues.code,
      },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
            toast.success(response.message);
            onOpenChange(false);
          } else {
            toast.error(response.message);
          }
        },
        onError: (response) => {
          toast.error(response.message);
        },
      }
    );
  };

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setIsCopied(true);
      toast.success(t("secretCopied"));
      setTimeout(() => setIsCopied(false), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const handleClose = () => {
    methods.reset();
    setQrCodeUrl("");
    setSecret("");
    onOpenChange(false);
  };

  const handleSubmitToggle = () => {
    if (!userIsEnable2FA && qrCodeUrl && secret) {
      // If enabling 2FA and we have generated codes, use update API
      methods.handleSubmit(onSubmitUpdate2FA)();
    } else {
      // Otherwise use the regular toggle API
      const codeValue = methods.getValues("code");
      onToggle2FA({ twoFactorCode: codeValue });
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={handleClose}
      title={
        userIsEnable2FA
          ? tProfile("disableTwoFactor")
          : qrCodeUrl && secret
          ? t("updateButton")
          : tProfile("setupTwoFactor")
      }
      description={
        userIsEnable2FA
          ? tProfile("disableTwoFactorDesc")
          : qrCodeUrl && secret
          ? t("newCodeDescription")
          : tProfile("setupTwoFactorDesc")
      }
      footerActions={[
        {
          label: tCommon("cancel"),
          onClick: handleClose,
          variant: "outline",
        },
        {
          label: userIsEnable2FA
            ? tProfile("disable")
            : qrCodeUrl && secret
            ? t("updateButton")
            : tProfile("verify"),
          onClick: handleSubmitToggle,
          variant: userIsEnable2FA ? "destructive" : "default",
          disabled: isToggling || isMutatingChange2FA,
        },
      ]}
      classNameContent="max-w-2xl max-h-[80vh] overflow-y-auto"
    >
      <div className="space-y-6">
        {!userIsEnable2FA && (
          <>
            {/* Generate New 2FA Section */}
            <AppCard
              className="border-0 bg-gray-50 dark:bg-gray-800/50"
              title={t("generateNew")}
              description={t("generateDescription")}
              padded
            >
              <div className="text-center">
                <AppButton
                  onClick={generateNew2FA}
                  disabled={isLoadingGenerate2FA}
                  iconLeft={
                    <RefreshCw
                      className={`h-4 w-4 ${
                        isLoadingGenerate2FA ? "animate-spin" : ""
                      }`}
                    />
                  }
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  {isLoadingGenerate2FA
                    ? tCommon("loading")
                    : t("generateButton")}
                </AppButton>
              </div>
            </AppCard>

            {/* QR Code and Secret Display */}
            {qrCodeUrl && secret && (
              <AppCard
                className="border-0 bg-blue-50/50 dark:bg-blue-900/10"
                title={t("newCode")}
                description={t("newCodeDescription")}
                padded
              >
                <div className="space-y-4">
                  {/* QR Code */}
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <QrCode className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex justify-center mb-4">
                      <Image
                        src={qrCodeUrl || ""}
                        alt="QR Code"
                        width={180}
                        height={180}
                        className="border rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("scanQRInstruction")}
                    </p>
                  </div>

                  {/* Secret Key */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("secretKey")}
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg border font-mono text-sm">
                        {isShowSecret ? secret : "•".repeat(secret.length)}
                      </div>
                      <AppButton
                        variant="outline"
                        size="icon"
                        onClick={() => setIsShowSecret(!isShowSecret)}
                      >
                        {isShowSecret ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </AppButton>
                      <AppButton
                        variant="outline"
                        size="icon"
                        onClick={copySecret}
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </AppButton>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {t("secretInstruction")}
                    </p>
                  </div>
                </div>
              </AppCard>
            )}
          </>
        )}

        {Boolean(userIsEnable2FA) && (
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <ShieldOff className="h-12 w-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <p className="text-yellow-800 dark:text-yellow-200">
              {tProfile("disableTwoFactorWarning")}
            </p>
          </div>
        )}

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(
              qrCodeUrl && secret && !userIsEnable2FA
                ? onSubmitUpdate2FA
                : (formValues) =>
                    onToggle2FA({ twoFactorCode: formValues.code })
            )}
            noValidate
            className="space-y-4"
          >
            <TextField
              name="code"
              label={tProfile("verificationCode")}
              placeholder={t("codePlaceholder")}
              className="text-center text-xl tracking-widest"
              maxLength={6}
              autoComplete="one-time-code"
            />
          </form>
        </FormProvider>
      </div>
    </AppDialog>
  );
}
