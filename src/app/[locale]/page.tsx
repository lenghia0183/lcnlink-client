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

type FormValues = UrlFormValues;
export default function HomePage() {
  const t = useTranslations("UrlShortener");
  const schema = getUrlSchema(t);
  const { isLoggedIn } = useUser();
  const [localLinks, setLocalLinks] = useState<LinkData[]>([]);

  const { trigger: createLinkTrigger, isMutating: isCreateLinkMutating } =
    useCreateLink();

  // Load local links from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('guestLinks');
      if (stored) {
        try {
          const parsedLinks = JSON.parse(stored);
          setLocalLinks(parsedLinks);
        } catch (error) {
          console.error('Error parsing local links:', error);
          localStorage.removeItem('guestLinks');
        }
      }
    }
  }, []);

  // Save local links to localStorage whenever localLinks changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (localLinks.length > 0) {
          localStorage.setItem('guestLinks', JSON.stringify(localLinks));
        } else {
          localStorage.removeItem('guestLinks');
        }
      } catch (error) {
        console.error('Error saving local links:', error);
      }
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

  const allValues = methods.watch();

  useEffect(() => {
    console.log("Form values changed:", allValues);
    console.log(
      "allValues.expirationDate",
      allValues.expirationDate?.toISOString()
    );
  }, [allValues]);

  const onSubmit = async (formValue: FormValues) => {
    console.log("formValue", formValue);
    
    if (!isLoggedIn) {
      // Create mock shortened link for non-logged in users
      const mockLink: LinkData = {
        id: `guest-${Date.now()}`,
        originalUrl: formValue?.originUrl || "",
        shortedUrl: `${typeof window !== 'undefined' ? window.location.origin : 'https://example.com'}/s/${Math.random().toString(36).substring(2, 8)}`,
        alias: formValue.alias,
        clicksCount: 0,
        successfulAccessCount: 0,
        maxClicks: Number(formValue?.maxClicks) || undefined,
        isActive: true,
        expireAt: formValue.expirationDate?.toISOString(),
        createdAt: new Date().toISOString(),
        description: formValue.description,
        password: "", // Don't store password for security
        isUsePassword: Boolean(formValue.password),
        status: LINK_STATUS.ACTIVE,
      };
      
      // Add to local storage
      setLocalLinks(prev => [mockLink, ...prev]);
      
      // Reset form
      methods.reset();
      
      toast.success("Link đã được tạo và lưu vào bộ nhớ tạm thời. Đăng ký tài khoản để lưu vĩnh viễn!");
      return;
    }
    
    // For logged in users, use API
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

        {/* Display guest links for non-logged in users */}
        {!isLoggedIn && localLinks.length > 0 && (
          <div className="mt-12">
            <AppCard className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Link đã tạo của bạn
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Đăng ký tài khoản để lưu link vĩnh viễn và sử dụng nhiều tính năng khác!
                </p>
              </div>
              <div className="space-y-4">
                {localLinks.map((link) => (
                  <div key={link.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <a 
                            href={link.shortedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors underline"
                          >
                            {link.shortedUrl}
                          </a>
                          <AppButton
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (typeof navigator !== 'undefined' && navigator.clipboard) {
                                navigator.clipboard.writeText(link.shortedUrl);
                                toast.success("Đã sao chép link!");
                              } else {
                                toast.error("Không thể sao chép link!");
                              }
                            }}
                          >
                            Sao chép
                          </AppButton>
                          <AppButton
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setLocalLinks(prev => prev.filter(l => l.id !== link.id));
                              toast.success("Đã xóa link!");
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            Xóa
                          </AppButton>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          <strong>Gốc:</strong> {link.originalUrl}
                        </p>
                        {link.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            <strong>Mô tả:</strong> {link.description}
                          </p>
                        )}
                        {link.isUsePassword && (
                          <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                            🔒 Link có mật khẩu bảo vệ
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AppCard>
          </div>
        )}
      </div>
    </div>
  );
}
