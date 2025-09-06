"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { 
  Shield, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  QrCode,
  ShieldCheck,
  ShieldOff 
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

// Validation schema for 2FA management
const getTwoFAManagementSchema = (t: any) =>
  z.object({
    code: z.string()
      .min(1, t("codeRequired"))
      .length(6, t("codeLength"))
      .regex(/^\d+$/, t("codeFormat")),
  });

type TwoFAManagementFormValues = z.infer<ReturnType<typeof getTwoFAManagementSchema>>;

interface TwoFAManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userIsEnable2FA: boolean;
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

  const [qrCode, setQrCode] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [isShowSecret, setIsShowSecret] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const methods = useForm<TwoFAManagementFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const generateNew2FA = async () => {
    setIsGenerating(true);
    try {
      // Call the API to generate new 2FA
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/2fa/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setQrCode(data.data.qrCode || data.qrCode);
        setSecret(data.data.secret || data.secret);
        toast.success(t("generateSuccess"));
      } else {
        toast.error(data.message || t("generateError"));
      }
    } catch (error) {
      console.error("Generate 2FA error:", error);
      toast.error(t("generateError"));
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmitUpdate2FA = async (formValues: TwoFAManagementFormValues) => {
    setIsUpdating(true);
    try {
      // Call the API to update 2FA with the new secret
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/2fa/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          code: formValues.code,
          secret: secret,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success(t("updateSuccess"));
        // Reset form and close modal
        methods.reset();
        setQrCode("");
        setSecret("");
        onOpenChange(false);
      } else {
        toast.error(data.message || t("updateError"));
      }
    } catch (error) {
      console.error("Update 2FA error:", error);
      toast.error(t("updateError"));
    } finally {
      setIsUpdating(false);
    }
  };

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setIsCopied(true);
      toast.success(t("secretCopied"));
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error(t("copyError"));
    }
  };

  const handleClose = () => {
    methods.reset();
    setQrCode("");
    setSecret("");
    onOpenChange(false);
  };

  const handleSubmitToggle = () => {
    if (!userIsEnable2FA && qrCode && secret) {
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
          : qrCode && secret 
            ? t("updateButton")
            : tProfile("setupTwoFactor")
      }
      description={
        userIsEnable2FA
          ? tProfile("disableTwoFactorDesc")
          : qrCode && secret
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
            : qrCode && secret 
              ? t("updateButton")
              : tProfile("verify"),
          onClick: handleSubmitToggle,
          variant: userIsEnable2FA ? "destructive" : "default",
          disabled: isToggling || isUpdating,
        },
      ]}
      classNameContent="max-w-2xl"
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
                  disabled={isGenerating}
                  iconLeft={<RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  {isGenerating ? tCommon("loading") : t("generateButton")}
                </AppButton>
              </div>
            </AppCard>

            {/* QR Code and Secret Display */}
            {qrCode && secret && (
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
                        src={qrCode}
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
                      <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border font-mono text-sm">
                        {isShowSecret ? secret : "•".repeat(secret.length)}
                      </div>
                      <AppButton
                        variant="outline"
                        size="icon"
                        onClick={() => setIsShowSecret(!isShowSecret)}
                      >
                        {isShowSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </AppButton>
                      <AppButton
                        variant="outline"
                        size="icon"
                        onClick={copySecret}
                      >
                        {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
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

        {userIsEnable2FA && (
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <ShieldOff className="h-12 w-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <p className="text-yellow-800 dark:text-yellow-200">
              {tProfile("disableTwoFactorWarning")}
            </p>
          </div>
        )}

        {/* Verification Form */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(
              qrCode && secret && !userIsEnable2FA 
                ? onSubmitUpdate2FA 
                : (formValues) => onToggle2FA({ twoFactorCode: formValues.code })
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