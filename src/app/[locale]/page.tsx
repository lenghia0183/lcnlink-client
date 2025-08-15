"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { AppAccordion } from "@/components/AppAccordion";

import {
  Link2,
  Copy,
  QrCode,
  Calendar as CalendarIcon,
  Shield,
  BarChart3,
  Palette,
  Zap,
  Globe,
  Share2,
  Eye,
  Clock,
  CheckCircle,
  LinkIcon,
  Target,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";

import { AppCard } from "@/components/AppCard";
import { TextField } from "@/components/FormFields/TextField";
import { urlSchema, UrlFormValues } from "./validation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerField } from "@/components/FormFields/DatePickerField";
import { TextAreaField } from "@/components/FormFields/TextAreaField";

import { AppButton } from "@/components/AppButton";
import { TEXTFIELD_ALLOW } from "@/constants/regexes";
import ShortLinkCard from "@/components/ShortLinkCard";

interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customAlias?: string;
  clicks: number;
  maxClicks?: number;
  createdAt: Date;
  expiresAt?: Date;
  description?: string;
  password?: string;
  isPasswordProtected: boolean;
  status: "active" | "expired" | "disabled" | "limit_reached";
}

const schema = urlSchema;
type FormValues = UrlFormValues;
export default function HomePage() {
  const t = useTranslations("UrlShortener");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shortenedLinks, setShortenedLinks] = useState<ShortenedLink[]>([]);
  const [copiedId, setCopiedId] = useState<string>("");

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

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
      maxClicks: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulated API call
      const newLink: ShortenedLink = {
        id: Math.random().toString(36).substr(2, 9),
        originalUrl: data.originUrl,
        shortUrl: `https://short.ly/${
          data.alias || Math.random().toString(36).substr(2, 6)
        }`,
        customAlias: data.alias || undefined,
        clicks: 0,
        maxClicks: data?.maxClicks || 0,
        createdAt: new Date(),
        expiresAt: data.expirationDate || undefined,
        description: data.description || undefined,
        password: data.password || undefined,
        isPasswordProtected: !!data.password,
        status: "active",
      };
      setShortenedLinks([newLink, ...shortenedLinks]);
      methods.reset();
    } catch (error) {
      console.error("Submission error:", error);
      methods.setError("root", {
        message: "Failed to shorten URL. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  loading={isSubmitting}
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                >
                  {t("shortenButton")}
                </AppButton>
              </form>
            </FormProvider>
          </AppCard>
        </div>

        {/* Recent Links */}
        {shortenedLinks.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-500" />
              {t("recentLinks")}
            </h2>

            <div className="space-y-4">
              {shortenedLinks.map((link) => (
                <AppCard
                  key={link.id}
                  className="hover:shadow-lg transition-shadow border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <LinkIcon className=" text-green-500" />
                        <code className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-sm font-medium">
                          {link.shortUrl}
                        </code>

                        <AppButton
                          variant="ghost"
                          size="icon"
                          iconLeft={
                            copiedId === link.id ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )
                          }
                          onClick={() =>
                            copyToClipboard(link.shortUrl, link.id)
                          }
                        ></AppButton>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {link.originalUrl}
                      </p>

                      {link.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {link.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4 mt-3">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          {link.clicks} {t("clicks")}
                        </Badge>

                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <CalendarIcon className="h-3 w-3" />
                          {format(link.createdAt, "MMM dd, yyyy")}
                        </Badge>

                        {link.expiresAt && (
                          <Badge
                            variant="destructive"
                            className="flex items-center gap-1"
                          >
                            <Clock className="h-3 w-3" />
                            {format(link.expiresAt, "MMM dd, yyyy")}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <AppButton
                        variant="outline"
                        size="icon"
                        iconLeft={<QrCode />}
                      />

                      <AppButton
                        variant="outline"
                        size="icon"
                        iconLeft={<BarChart3 className="h-4 w-4" />}
                      />

                      <AppButton
                        variant="outline"
                        size="icon"
                        iconLeft={<Share2 className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                </AppCard>
              ))}
            </div>
          </div>
        )}

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
