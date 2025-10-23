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
  ProfileFormValues,
  ChangePasswordFormValues,
  TwoFAFormValues,
} from "./validation";
import { DatePickerField } from "@/components/FormFields/DatePickerField";
import { RadioGroupField } from "@/components/FormFields/RadioGroupField";
import { IS_2FA_ENUM, USER_GENDER_ENUM } from "@/constants/common";
import { AppTabs } from "@/components/AppTabs";
import { AppDialog } from "@/components/AppDialog";
import TwoFAManagementModal from "@/components/TwoFAManagementModal";
import Image from "@/components/Image";
import { useUser } from "@/context/userProvider";
import {
  useChangePassword,
  useToggle2FA,
  useUpdateMe,
} from "@/services/api/auth";
import validateResponseCode from "@/utils/validateResponseCode";
import { useQueryState } from "@/hooks/useQueryState";
import { SkeletonProfileTabs } from "@/components/skeleton/SkeletonProfileTabs";
import { SkeletonSecurityTab } from "@/components/skeleton/SkeletonSecurityTab";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const tCommon = useTranslations("Common");

  const { tab, setTab } = useQueryState({ tab: "" });

  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [show2FADialog, setShow2FADialog] = useState(false);
  const [show2FAManagementModal, setShow2FAManagementModal] = useState(false);

  const { userData, refreshGetMe, isLoading } = useUser();

  const isEnableChangePassword =
    userData?.oauthProvider && userData?.oauthProviderId ? false : true;

  const { trigger: triggerUpdateMe, isMutating: isUpdateMeMutating } =
    useUpdateMe();

  const {
    trigger: triggerChangePassword,
    isMutating: isChangePasswordMutating,
  } = useChangePassword();

  const { trigger: triggerToggle2FA, isMutating: isToggle2FAMutating } =
    useToggle2FA();

  // Profile Form
  const profileMethods = useForm({
    resolver: zodResolver(getProfileFormSchema(t)),
    defaultValues: {
      fullname: userData?.fullname || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      gender: userData?.gender || USER_GENDER_ENUM.MALE,
      dateOfBirth: userData?.dateOfBirth
        ? new Date(userData.dateOfBirth)
        : null,
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
    if (userData) {
      profileMethods.setValue("fullname", userData?.fullname || "");
      profileMethods.setValue("email", userData?.email || "");
      profileMethods.setValue("phone", userData?.phone || "");
      profileMethods.setValue(
        "gender",
        userData?.gender || USER_GENDER_ENUM.MALE
      );
      if (userData?.dateOfBirth) {
        profileMethods.setValue("dateOfBirth", new Date(userData.dateOfBirth));
      } else {
        profileMethods.setValue("dateOfBirth", null);
      }
    }
  }, [userData, profileMethods]);

  const onSubmitProfile = async (formValue: ProfileFormValues) => {
    triggerUpdateMe(
      {
        fullname: formValue.fullname,
        email: formValue.email,
        phone: formValue.phone,
        gender: formValue.gender,
        dateOfBirth: formValue.dateOfBirth
          ? formValue.dateOfBirth.toISOString()
          : undefined,
      },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
            refreshGetMe();
            toast.success(response.message);
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

  const onSubmitPassword = async (formValue: ChangePasswordFormValues) => {
    triggerChangePassword(
      {
        newPassword: formValue?.newPassword || "",
        currentPassword: formValue?.currentPassword || "",
      },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
            refreshGetMe();
            toast.success(response.message);
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

  const onSubmitToggle2FA = async (formValue: TwoFAFormValues) => {
    triggerToggle2FA(
      { otp: formValue.twoFactorCode },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
            setShow2FADialog(false);
            twoFAMethods.reset();
            refreshGetMe();
            toast.success(tCommon("success"), response.message);
          } else {
            toast.error(tCommon("error"), response.message);
          }
        },
        onError: (response) => {
          toast.error(tCommon("error"), response.message);
        },
      }
    );
  };

  const handleToggle2FA = async () => {
    setShow2FADialog(true);
  };

  const handleManage2FA = async () => {
    setShow2FAManagementModal(true);
  };

  const profileTab = (
    <div className="space-y-6">
      {isLoading ? (
        <SkeletonProfileTabs />
      ) : (
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
                    value: USER_GENDER_ENUM.MALE,
                  },
                  {
                    label: t("female"),
                    value: USER_GENDER_ENUM.FEMALE,
                  },
                  {
                    label: t("other"),
                    value: USER_GENDER_ENUM.OTHER,
                  },
                ]}
              />
              <DatePickerField
                name="dateOfBirth"
                label={t("dateOfBirth")}
                placeholder={t("selectDate")}
                hideNavigation
                captionLayout="dropdown"
              />
              <AppButton
                type="submit"
                iconLeft={<Save className="h-4 w-4" />}
                disabled={isUpdateMeMutating}
                className="w-full"
              >
                {isUpdateMeMutating ? tCommon("loading") : t("updateProfile")}
              </AppButton>
            </form>
          </FormProvider>
        </AppCard>
      )}
    </div>
  );

  const securityTab = (
    <div className="space-y-6">
      {isLoading ? (
        <SkeletonSecurityTab />
      ) : (
        <>
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
                  disabled={isEnableChangePassword}
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
                  rightIconOnClick={() =>
                    setIsShowNewPassword(!isShowNewPassword)
                  }
                  disabled={isEnableChangePassword}
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
                  disabled={isEnableChangePassword}
                />
                <AppButton
                  type="submit"
                  iconLeft={<Save className="h-4 w-4" />}
                  disabled={isChangePasswordMutating || isEnableChangePassword}
                  className="w-full"
                >
                  {isChangePasswordMutating
                    ? tCommon("loading")
                    : t("changePassword")}
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
                {userData?.isEnable2FA ? (
                  <ShieldCheck className="h-8 w-8 text-green-500" />
                ) : (
                  <ShieldOff className="h-8 w-8 text-gray-400" />
                )}
                <div>
                  <h3 className="font-medium">
                    {userData?.isEnable2FA
                      ? t("twoFactorEnabled")
                      : t("twoFactorDisabled")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {userData?.isEnable2FA
                      ? t("twoFactorEnabledDesc")
                      : t("twoFactorDisabledDesc")}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <AppButton
                  onClick={handleManage2FA}
                  iconLeft={<Shield className="h-4 w-4" />}
                  className="flex-1"
                >
                  {t("manage2FA")}
                </AppButton>
                <AppButton
                  variant={userData?.isEnable2FA ? "destructive" : "outline"}
                  onClick={handleToggle2FA}
                  iconLeft={
                    userData?.isEnable2FA ? (
                      <ShieldOff className="h-4 w-4" />
                    ) : (
                      <ShieldCheck className="h-4 w-4" />
                    )
                  }
                  size="sm"
                >
                  {userData?.isEnable2FA ? t("disable") : t("enable")}
                </AppButton>
              </div>
            </div>
          </AppCard>
        </>
      )}
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
          defaultValue={tab}
          onValueChange={(value) => setTab(value)}
          tabs={[
            {
              value: "me",
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
        title={
          userData?.isEnable2FA ? t("disableTwoFactor") : t("setupTwoFactor")
        }
        description={
          userData?.isEnable2FA
            ? t("disableTwoFactorDesc")
            : t("setupTwoFactorDesc")
        }
        footerActions={[
          {
            label: tCommon("cancel"),
            onClick: () => {
              setShow2FADialog(false);
              twoFAMethods.reset();
            },
            variant: "outline",
          },
          {
            label: userData?.isEnable2FA ? t("disable") : t("verify"),
            onClick: twoFAMethods.handleSubmit(onSubmitToggle2FA),
            variant: userData?.isEnable2FA ? "destructive" : "default",
            disabled: isToggle2FAMutating,
          },
        ]}
      >
        <FormProvider {...twoFAMethods}>
          <form
            onSubmit={twoFAMethods.handleSubmit(onSubmitToggle2FA)}
            className="space-y-6"
            noValidate
          >
            {!userData?.isEnable2FA && (
              <div className="text-center">
                <h3 className="font-medium mb-2">{t("scanQRCode")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t("scanQRCodeDesc")}
                </p>
                <div className="flex justify-center mb-4">
                  <Image
                    src={userData?.twoFactorQr || ""}
                    alt="QR Code"
                    className="border rounded"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-center text-sm">
                  {userData?.twoFactorSecret}
                </div>
              </div>
            )}
            {Boolean(userData?.isEnable2FA) && (
              <p className="text-center text-gray-600 dark:text-gray-400">
                {t("disableTwoFactorWarning")}
              </p>
            )}
            <TextField
              name="twoFactorCode"
              label={t("verificationCode")}
              placeholder={t("verificationCodePlaceholder")}
              className="text-center"
              maxLength={6}
            />
          </form>
        </FormProvider>
      </AppDialog>

      <TwoFAManagementModal
        open={show2FAManagementModal}
        onOpenChange={setShow2FAManagementModal}
        userIsEnable2FA={userData?.isEnable2FA || IS_2FA_ENUM.DISABLED}
        onToggle2FA={onSubmitToggle2FA}
        isToggling={isToggle2FAMutating}
      />
    </div>
  );
}
