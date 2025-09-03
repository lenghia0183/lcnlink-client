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
import { USER_GENDER_ENUM } from "@/constants/common";
import { AppTabs } from "@/components/AppTabs";
import { AppDialog } from "@/components/AppDialog";
import Image from "@/components/Image";
import { useUser } from "@/context/userProvider";
import {
  useChangePassword,
  useToggle2FA,
  useUpdateMe,
} from "@/services/api/auth";
import validateResponseCode from "@/utils/validateResponseCode";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const tCommon = useTranslations("Common");

  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FADialog, setShow2FADialog] = useState(false);

  const { userData } = useUser();

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
      gender: userData?.gender.toString() || "",
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

  const onSubmitProfile = async (formValue: ProfileFormValues) => {
    triggerUpdateMe(
      {
        fullname: formValue.fullname,
        email: formValue.email,
        phone: formValue.phone,
        gender: Number(formValue.gender),
        dateOfBirth: formValue.dateOfBirth.toISOString().split("T")[0],
      },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
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
      },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
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
            const new2FAState = !is2FAEnabled;
            setIs2FAEnabled(new2FAState);
            setShow2FADialog(false);
            twoFAMethods.reset();
            toast.success(
              tCommon("success"),
              new2FAState ? t("twoFactorEnabled") : t("twoFactorDisabled")
            );
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
              disabled={isUpdateMeMutating}
              className="w-full"
            >
              {isUpdateMeMutating ? tCommon("loading") : t("updateProfile")}
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
              disabled={isChangePasswordMutating}
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
          <AppButton
            variant={is2FAEnabled ? "destructive" : "default"}
            onClick={handleToggle2FA}
            iconLeft={
              is2FAEnabled ? (
                <ShieldOff className="h-4 w-4" />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )
            }
          >
            {is2FAEnabled ? t("disable") : t("enable")}
          </AppButton>
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
        title={is2FAEnabled ? t("disableTwoFactor") : t("setupTwoFactor")}
        description={
          is2FAEnabled ? t("disableTwoFactorDesc") : t("setupTwoFactorDesc")
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
            label: is2FAEnabled ? t("disable") : t("verify"),
            onClick: twoFAMethods.handleSubmit(onSubmitToggle2FA),
            variant: is2FAEnabled ? "destructive" : "default",
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
            {!is2FAEnabled && (
              <div className="text-center">
                <h3 className="font-medium mb-2">{t("scanQRCode")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t("scanQRCodeDesc")}
                </p>
                <div className="flex justify-center mb-4">
                  <Image
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
            {is2FAEnabled && (
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
    </div>
  );
}
