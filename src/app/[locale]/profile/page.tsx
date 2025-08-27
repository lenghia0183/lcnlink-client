"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  User,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  ShieldOff,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/FormFields/TextField";
import { AppButton } from "@/components/AppButton";
import { toast } from "@/components/AppToast";
import {
  getProfileFormSchema,
  getPasswordFormSchema,
  getTwoFAFormSchema,
} from "./validation";
import { DatePickerField } from "@/components/FormFields/DatePickerField";
import { RadioGroupField } from "@/components/FormFields/RadioGroupField";
import { USER_GENDER_ENUM } from "@/constants/common";
import { AppTabs } from "@/components/AppTabs";
import { AppDialog } from "@/components/AppDialog";
import Image from "@/components/Image";
import { useUser } from "@/context/userProvider";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const tCommon = useTranslations("Common");
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [showDisable2FADialog, setShowDisable2FADialog] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const { userData } = useUser();

  // Profile Form
  const profileMethods = useForm({
    resolver: zodResolver(getProfileFormSchema(t)),
    defaultValues: {
      fullname: userData?.fullname,
      email: userData?.email,
      phone: userData?.phone,
      gender: userData?.gender.toString(),
      dateOfBirth: new Date(userData?.createdAt || 0),
    },
  });

  // Password Form
  const passwordMethods = useForm({
    resolver: zodResolver(getPasswordFormSchema(t)),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 2FA Form
  const twoFAMethods = useForm({
    resolver: zodResolver(getTwoFAFormSchema(t)),
    defaultValues: {
      twoFactorCode: "",
    },
  });

  useEffect(() => {
    profileMethods.setValue("fullname", userData?.fullname || "");
    profileMethods.setValue("email", userData?.email || "");
    profileMethods.setValue("phone", userData?.phone || "");
    profileMethods.setValue("gender", userData?.gender.toString() || "");
    profileMethods.setValue("dateOfBirth", new Date(userData?.createdAt || 0));
  }, [userData, profileMethods]);

  const onSubmitProfile = async (data) => {
    setIsSubmittingProfile(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Profile update:", data);
      toast.success(tCommon("success"), t("profileUpdated"));
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(tCommon("error"), tCommon("tryAgainLater"));
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const onSubmitPassword = async (data) => {
    setIsSubmittingPassword(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Password change:", data);
      toast.success(tCommon("success"), t("passwordChanged"));
      passwordMethods.reset();
    } catch (error) {
      console.error("Password change error:", error);
      toast.error(tCommon("error"), tCommon("tryAgainLater"));
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const handleEnable2FA = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setQrCodeUrl("");
      setShow2FADialog(true);
    } catch (error) {
      toast.error(tCommon("error"), t("failedToGenerate2FA"));
    }
  };

  const handleConfirm2FA = async () => {
    const code = twoFAMethods.getValues("twoFactorCode");
    if (!code || code.length !== 6) {
      toast.error(tCommon("error"), t("invalidVerificationCode"));
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIs2FAEnabled(true);
      setShow2FADialog(false);
      twoFAMethods.setValue("twoFactorCode", "");
      toast.success(tCommon("success"), t("twoFactorEnabled"));
    } catch (error) {
      toast.error(tCommon("error"), t("failedToEnable2FA"));
    }
  };

  const handleDisable2FA = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIs2FAEnabled(false);
      setShowDisable2FADialog(false);
      toast.success(tCommon("success"), t("twoFactorDisabled"));
    } catch (error) {
      toast.error(tCommon("error"), t("failedToDisable2FA"));
    }
  };

  const profileTab = (
    <div className="space-y-6">
      <AppCard
        title={t("personalInfo")}
        description={t("updatePersonalInfo")}
        padded
      >
        <FormProvider {...profileMethods}>
          <form
            onSubmit={profileMethods.handleSubmit(onSubmitProfile)}
            className="space-y-4"
            noValidate
          >
            <TextField
              name="fullname"
              label={t("fullname")}
              placeholder={t("fullnamePlaceholder")}
              leftIcon={<User className="w-4 h-4" />}
            />
            <TextField
              name="email"
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              leftIcon={<Mail className="w-4 h-4" />}
            />
            <TextField
              name="phone"
              label={t("phone")}
              placeholder={t("phonePlaceholder")}
              leftIcon={<Phone className="w-4 h-4" />}
            />
            <RadioGroupField
              name="gender"
              label={t("gender")}
              options={[
                {
                  label: t("male"),
                  value: USER_GENDER_ENUM.MALE.toString(),
                },
                {
                  label: t("female"),
                  value: USER_GENDER_ENUM.FEMALE.toString(),
                },
                {
                  label: t("other"),
                  value: USER_GENDER_ENUM.OTHER.toString(),
                },
              ]}
            />
            <DatePickerField
              name="dateOfBirth"
              label={t("dateOfBirth")}
              placeholder={t("selectDate")}
            />
            <AppButton
              type="submit"
              iconLeft={<Save className="h-4 w-4" />}
              disabled={isSubmittingProfile}
              className="w-full"
            >
              {isSubmittingProfile ? tCommon("loading") : t("updateProfile")}
            </AppButton>
          </form>
        </FormProvider>
      </AppCard>
    </div>
  );

  const securityTab = (
    <div className="space-y-6">
      <AppCard
        title={t("changePassword")}
        description={t("updatePassword")}
        padded
      >
        <FormProvider {...passwordMethods}>
          <form
            onSubmit={passwordMethods.handleSubmit(onSubmitPassword)}
            className="space-y-4"
            noValidate
          >
            <TextField
              name="currentPassword"
              label={t("currentPassword")}
              type={isShowCurrentPassword ? "text" : "password"}
              placeholder={t("currentPasswordPlaceholder")}
              leftIcon={<Shield className="h-4 w-4" />}
              rightIcon={
                isShowCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )
              }
              rightIconOnClick={() =>
                setIsShowCurrentPassword(!isShowCurrentPassword)
              }
            />
            <TextField
              name="newPassword"
              label={t("newPassword")}
              type={isShowNewPassword ? "text" : "password"}
              placeholder={t("newPasswordPlaceholder")}
              leftIcon={<Shield className="h-4 w-4" />}
              rightIcon={
                isShowNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )
              }
              rightIconOnClick={() => setIsShowNewPassword(!isShowNewPassword)}
            />
            <TextField
              name="confirmPassword"
              label={t("confirmPassword")}
              type={isShowConfirmPassword ? "text" : "password"}
              placeholder={t("confirmPasswordPlaceholder")}
              leftIcon={<Shield className="h-4 w-4" />}
              rightIcon={
                isShowConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )
              }
              rightIconOnClick={() =>
                setIsShowConfirmPassword(!isShowConfirmPassword)
              }
            />
            <AppButton
              type="submit"
              iconLeft={<Save className="h-4 w-4" />}
              disabled={isSubmittingPassword}
              className="w-full"
            >
              {isSubmittingPassword ? tCommon("loading") : t("changePassword")}
            </AppButton>
          </form>
        </FormProvider>
      </AppCard>

      <AppCard
        title={t("twoFactorAuth")}
        description={t("twoFactorDescription")}
        padded
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {is2FAEnabled ? (
              <ShieldCheck className="h-8 w-8 text-green-500" />
            ) : (
              <ShieldOff className="h-8 w-8 text-gray-400" />
            )}
            <div>
              <h3 className="font-medium">
                {is2FAEnabled ? t("twoFactorEnabled") : t("twoFactorDisabled")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {is2FAEnabled
                  ? t("twoFactorEnabledDesc")
                  : t("twoFactorDisabledDesc")}
              </p>
            </div>
          </div>
          {is2FAEnabled ? (
            <AppButton
              variant="destructive"
              onClick={() => setShowDisable2FADialog(true)}
              iconLeft={<ShieldOff className="h-4 w-4" />}
            >
              {t("disable")}
            </AppButton>
          ) : (
            <AppButton
              onClick={handleEnable2FA}
              iconLeft={<ShieldCheck className="h-4 w-4" />}
            >
              {t("enable")}
            </AppButton>
          )}
        </div>
      </AppCard>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("subtitle")}
          </p>
        </div>

        <AppTabs
          defaultValue="profile"
          tabs={[
            {
              value: "profile",
              label: t("profile"),
              icon: <User className="w-4 h-4" />,
              content: profileTab,
            },
            {
              value: "security",
              label: t("security"),
              icon: <Shield className="w-4 h-4" />,
              content: securityTab,
            },
          ]}
        />
      </div>

      <AppDialog
        open={show2FADialog}
        onOpenChange={setShow2FADialog}
        title={t("setupTwoFactor")}
        description={t("setupTwoFactorDesc")}
        footerActions={[
          {
            label: tCommon("cancel"),
            onClick: () => setShow2FADialog(false),
            variant: "outline",
          },
          {
            label: t("verify"),
            onClick: handleConfirm2FA,
            variant: "default",
          },
        ]}
      >
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-medium mb-2">{t("scanQRCode")}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t("scanQRCodeDesc")}
            </p>
            {qrCodeUrl && (
              <div className="flex justify-center mb-4">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="border rounded"
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-center text-sm">
            JBSWY3DPEHPK3PXP
          </div>

          <FormProvider {...twoFAMethods}>
            <TextField
              name="twoFactorCode"
              label={t("verificationCode")}
              placeholder={t("verificationCodePlaceholder")}
              className="text-center"
              maxLength={6}
            />
          </FormProvider>
        </div>
      </AppDialog>

      <AppDialog
        open={showDisable2FADialog}
        onOpenChange={setShowDisable2FADialog}
        title={t("disableTwoFactor")}
        description={t("disableTwoFactorDesc")}
        footerActions={[
          {
            label: tCommon("cancel"),
            onClick: () => setShowDisable2FADialog(false),
            variant: "outline",
          },
          {
            label: t("disable"),
            onClick: handleDisable2FA,
            variant: "destructive",
          },
        ]}
      >
        <p className="text-center text-gray-600 dark:text-gray-400">
          {t("disableTwoFactorWarning")}
        </p>
      </AppDialog>
    </div>
  );
}
