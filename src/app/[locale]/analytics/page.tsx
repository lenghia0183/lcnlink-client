
"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Clock, 
  Globe, 
  Smartphone, 
  Monitor, 
  MapPin,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";

export default function AnalyticsPage() {
  const t = useTranslations("Analytics");

  const stats = [
    { icon: <Eye className="h-5 w-5" />, label: t("totalClicks"), value: "12,547", change: "+15.3%" },
    { icon: <Globe className="h-5 w-5" />, label: t("uniqueVisitors"), value: "8,432", change: "+12.1%" },
    { icon: <Clock className="h-5 w-5" />, label: t("avgSessionDuration"), value: "2m 34s", change: "+5.7%" },
    { icon: <TrendingUp className="h-5 w-5" />, label: t("clickThroughRate"), value: "3.2%", change: "+8.9%" }
  ];

  const topCountries = [
    { country: "United States", clicks: 4521, percentage: 36.1 },
    { country: "United Kingdom", clicks: 2134, percentage: 17.0 },
    { country: "Germany", clicks: 1876, percentage: 15.0 },
    { country: "Canada", clicks: 1234, percentage: 9.8 },
    { country: "France", clicks: 987, percentage: 7.9 }
  ];

  const devices = [
    { type: "Desktop", clicks: 6234, percentage: 49.7 },
    { type: "Mobile", clicks: 4987, percentage: 39.7 },
    { type: "Tablet", clicks: 1326, percentage: 10.6 }
  ];

  const browsers = [
    { name: "Chrome", clicks: 7234, percentage: 57.7 },
    { name: "Safari", clicks: 2345, percentage: 18.7 },
    { name: "Firefox", clicks: 1567, percentage: 12.5 },
    { name: "Edge", clicks: 987, percentage: 7.9 },
    { name: "Other", clicks: 414, percentage: 3.2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {t("title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
          </div>
          <div className="flex gap-2 mt-4 lg:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              {t("refresh")}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {t("export")}
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    {stat.icon}
                  </div>
                  <Badge variant="secondary" className="text-green-600">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Click Trends */}
          <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {t("clickTrends.title")}
              </CardTitle>
              <CardDescription>{t("clickTrends.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-center bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                <p className="text-gray-500">{t("chartPlaceholder")}</p>
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t("geographic.title")}
              </CardTitle>
              <CardDescription>{t("geographic.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCountries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-4 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
                      <span className="font-medium">{country.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {country.clicks.toLocaleString()}
                      </span>
                      <Badge variant="outline">{country.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device & Browser Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Device Types */}
          <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                {t("devices.title")}
              </CardTitle>
              <CardDescription>{t("devices.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {device.type === "Desktop" && <Monitor className="h-4 w-4" />}
                        {device.type === "Mobile" && <Smartphone className="h-4 w-4" />}
                        {device.type === "Tablet" && <Monitor className="h-4 w-4" />}
                        <span className="font-medium">{device.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {device.clicks.toLocaleString()}
                        </span>
                        <Badge variant="outline">{device.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Browsers */}
          <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t("browsers.title")}
              </CardTitle>
              <CardDescription>{t("browsers.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {browsers.map((browser, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{browser.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {browser.clicks.toLocaleString()}
                      </span>
                      <Badge variant="outline">{browser.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
