
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Shield, RefreshCw, Eye, EyeOff, Copy, Check, QrCode } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { AppButton } from "@/components/AppButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/FormFields/TextField";
import { toast } from "@/components/AppToast";
import { getManage2FASchema, Manage2FAFormValues } from "./validation";
import Image from "next/image";

type FormValues = Manage2FAFormValues;

export default function Manage2FAPage() {
  const t = useTranslations("Manage2FA");
  const tCommon = useTranslations("Common");
  const schema = getManage2FASchema(t);

  const [qrCode, setQrCode] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [isShowSecret, setIsShowSecret] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const generateNew2FA = async () => {
    setIsGenerating(true);
    try {
      // Call your existing API to generate new 2FA
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/2fa/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setQrCode(data.qrCode);
        setSecret(data.secret);
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

  const onSubmit = async (formValues: FormValues) => {
    setIsUpdating(true);
    try {
      // Call your existing API to update 2FA with the new secret
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/2fa/update`, {
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
        // Reset form and generated data
        methods.reset();
        setQrCode("");
        setSecret("");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("subtitle")}
          </p>
        </div>

        {/* Generate New 2FA Section */}
        <AppCard
          className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-6"
          title={t("generateNew")}
          description={t("generateDescription")}
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
            className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-6"
            title={t("newCode")}
            description={t("newCodeDescription")}
          >
            <div className="space-y-6">
              {/* QR Code */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <QrCode className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <Image
                    src={qrCode}
                    alt="QR Code"
                    width={200}
                    height={200}
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
                  <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border font-mono text-sm">
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

              {/* Verification Form */}
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-4"
                >
                  <TextField
                    name="code"
                    label={t("verificationCode")}
                    placeholder={t("codePlaceholder")}
                    className="text-center text-xl tracking-widest"
                    maxLength={6}
                    autoComplete="one-time-code"
                  />

                  <AppButton
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    disabled={isUpdating}
                    iconLeft={<Shield className="h-4 w-4" />}
                  >
                    {isUpdating ? tCommon("loading") : t("updateButton")}
                  </AppButton>
                </form>
              </FormProvider>
            </div>
          </AppCard>
        )}

        {/* Instructions */}
        <AppCard
          className="shadow-xl border-0 bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm"
          title={t("instructions")}
        >
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <p>{t("step1")}</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <p>{t("step2")}</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <p>{t("step3")}</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <p>{t("step4")}</p>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
