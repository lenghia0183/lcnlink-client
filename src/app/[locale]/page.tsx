"use client";

import { useTranslations } from "next-intl";

import { AppAccordion } from "@/components/AppAccordion";

import {
  Link2,
  QrCode,
  Shield,
  BarChart3,
  Palette,
  Zap,
  Globe,
  Eye,
  Target,
  TrendingUp,
} from "lucide-react";

import { AppCard } from "@/components/AppCard";
import { TextField } from "@/components/FormFields/TextField";
import { getUrlSchema, UrlFormValues } from "./validation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerField } from "@/components/FormFields/DatePickerField";
import { TextAreaField } from "@/components/FormFields/TextAreaField";

import { AppButton } from "@/components/AppButton";
import { TEXTFIELD_ALLOW } from "@/constants/regexes";
import ShortLinkCard from "@/components/ShortLinkCard";
import { useCreateLink } from "@/services/api/links";
import validateResponseCode from "@/utils/validateResponseCode";
import { toast } from "@/components/AppToast";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { useUser } from "@/context/userProvider";
import { LinkData } from "@/types/Link";
import { LINK_STATUS } from "@/constants/common";
import LoggedOutGuard from "@/components/Guard/LoggedOutGuard";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage";
import { LinkCard } from "./dashboard/LinkCard";

type FormValues = UrlFormValues;
export default function HomePage() {
  const t = useTranslations("UrlShortener");
  const schema = getUrlSchema(t);
  const { isLoggedIn } = useUser();
  const [localLinks, setLocalLinks] = useState<LinkData[]>([]);
  const [copiedId, setCopiedId] = useState<string | undefined>();

  const { trigger: createLinkTrigger, isMutating: isCreateLinkMutating } =
    useCreateLink();

  // Load local links from localStorage on component mount
  useEffect(() => {
    const storedLinks = getLocalStorageItem<LinkData[]>("guestLinks");
    if (storedLinks) {
      setLocalLinks(storedLinks);
    }
  }, []);
  // Save local links to localStorage whenever localLinks changes
  useEffect(() => {
    if (localLinks.length > 0) {
      setLocalStorageItem("guestLinks", localLinks);
    } else {
      removeLocalStorageItem("guestLinks");
    }
  }, [localLinks]);

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      title: t("features.analytics.title"),
      description: t("features.analytics.description"),
    },
    {
      icon: <Palette className="h-8 w-8 text-purple-500" />,
      title: t("features.customization.title"),
      description: t("features.customization.description"),
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
    {
      icon: <QrCode className="h-8 w-8 text-orange-500" />,
      title: t("features.qr.title"),
      description: t("features.qr.description"),
    },
  ];

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      originUrl: "",
      alias: "",
      expirationDate: null,
      password: "",
      description: "",
      maxClicks: "",
    },
  });

  const onSubmit = async (formValue: FormValues) => {
    createLinkTrigger(
      {
        body: {
          originalUrl: formValue?.originUrl || "",
          alias: formValue.alias,
          maxClicks: Number(formValue?.maxClicks) || 0,
          expireAt: formValue.expirationDate?.toISOString(),
          description: formValue.description,
          password: formValue.password,
        },
      },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
            toast.success(response.message);
            if (!isLoggedIn) {
              setLocalLinks((prev) => [
                {
                  id: response?.data?.id || `new-${Date.now()}`,
                  originalUrl: response?.data?.originalUrl || "",
                  shortedUrl: response?.data?.shortedUrl || "",
                  alias: response?.data?.alias || "",
                  clicksCount: undefined,
                  successfulAccessCount:
                    response?.data?.successfulAccessCount || 0,
                  isActive: response?.data?.isActive || true,
                  expireAt: response?.data?.expireAt,
                  createdAt:
                    response?.data?.createdAt || new Date().toISOString(),
                  description: response?.data?.description,
                  isUsePassword: response?.data?.isUsePassword || false,
                  status: response?.data?.status ?? LINK_STATUS.ACTIVE,
                },
                ...prev,
              ]);
            }
            methods.reset();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg">
                <Link2 className="h-12 w-12 text-blue-500" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t("title")}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {t("subtitle")}
          </p>

          {/* Main URL Input */}
          <AppCard className="max-w-2xl mx-auto shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <TextField
                  name="originUrl"
                  placeholder={t("inputPlaceholder")}
                  leftIcon={<Globe className=" text-gray-400" />}
                />

                <AppAccordion
                  type="single"
                  defaultValue="advanced"
                  items={[
                    {
                      value: "advanced",
                      title: t("advancedOptions"),
                      content: (
                        <div className="space-y-4 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField
                              name="alias"
                              label={t("customAlias")}
                              placeholder={t("aliasPlaceholder")}
                            />

                            <DatePickerField
                              name="expirationDate"
                              label={t("expirationDate")}
                              placeholder="Pick a date"
                              disabled={{ before: addDays(new Date(), 1) }}
                            />
                          </div>

                          <TextField
                            name="password"
                            label={t("password")}
                            placeholder={t("passwordPlaceholder")}
                          />

                          <TextAreaField
                            name="description"
                            label={t("description")}
                            placeholder={t("descriptionPlaceholder")}
                          />

                          <TextField
                            name="maxClicks"
                            placeholder={t("maxClicksPlaceholder")}
                            label={t("maxClicks")}
                            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                          />
                        </div>
                      ),
                    },
                  ]}
                />

                <AppButton
                  type="submit"
                  iconLeft={<Zap className="h-5 w-5" />}
                  loading={isCreateLinkMutating}
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                >
                  {t("shortenButton")}
                </AppButton>
              </form>
            </FormProvider>
          </AppCard>
        </div>

        {/* Display guest links for non-logged in users */}
        <LoggedOutGuard>
          {!isLoggedIn && localLinks.length > 0 && (
            <div className="my-12">
              <AppCard className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Link đã tạo của bạn
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Đăng ký tài khoản để lưu link vĩnh viễn và sử dụng nhiều
                    tính năng khác!
                  </p>
                </div>
                <div className="space-y-4">
                  {/* Display guest links for non-logged in users */}
                  <LoggedOutGuard>
                    {!isLoggedIn && localLinks.length > 0 && (
                      <div className="space-y-4">
                        {localLinks.map((link) => (
                          <LinkCard
                            key={link.id}
                            link={link}
                            copiedId={copiedId}
                            onDelete={(l) => {
                              setLocalLinks((prev) =>
                                prev.filter((item) => item.id !== l.id)
                              );
                              toast.success("Đã xóa link!");
                            }}
                            onCopy={async (text, id) => {
                              try {
                                await navigator.clipboard.writeText(text);
                                setCopiedId(id);
                                toast.success("Đã sao chép link!");
                                setTimeout(() => setCopiedId(undefined), 2000);
                              } catch {
                                toast.error("Không thể sao chép link!");
                              }
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </LoggedOutGuard>
                </div>
              </AppCard>
            </div>
          )}
        </LoggedOutGuard>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Target className="h-8 w-8 text-blue-500" />
              {t("features.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AppCard
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group hover:scale-105"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </AppCard>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center p-16">
          <ShortLinkCard
            shortUrl="short.magic/xyz123"
            visits={1245}
            qrScans={568}
          />
        </div>
        {/* Stats Section */}
        <div className="max-w-4xl mx-auto">
          <AppCard className="border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center p-8">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 mr-2" />
                  <span className="text-3xl font-bold">10M+</span>
                </div>
                <p className="text-blue-100">Links Shortened</p>
              </div>

              <div>
                <div className="flex items-center justify-center mb-2">
                  <Eye className="h-8 w-8 mr-2" />
                  <span className="text-3xl font-bold">500M+</span>
                </div>
                <p className="text-blue-100">Total Clicks</p>
              </div>

              <div>
                <div className="flex items-center justify-center mb-2">
                  <Globe className="h-8 w-8 mr-2" />
                  <span className="text-3xl font-bold">150+</span>
                </div>
                <p className="text-blue-100">Countries Served</p>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}
