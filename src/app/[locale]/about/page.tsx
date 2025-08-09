
"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Link2, 
  Users, 
  Globe, 
  Shield, 
  Zap, 
  BarChart3, 
  Heart,
  Award,
  Target,
  CheckCircle
} from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("About");

  const stats = [
    { icon: <Link2 className="h-6 w-6" />, value: "10M+", label: t("stats.linksShortened") },
    { icon: <Users className="h-6 w-6" />, value: "500K+", label: t("stats.activeUsers") },
    { icon: <Globe className="h-6 w-6" />, value: "150+", label: t("stats.countriesServed") },
    { icon: <BarChart3 className="h-6 w-6" />, value: "99.9%", label: t("stats.uptime") }
  ];

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: t("features.fast.title"),
      description: t("features.fast.description")
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: t("features.secure.title"),
      description: t("features.secure.description")
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
      title: t("features.analytics.title"),
      description: t("features.analytics.description")
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-500" />,
      title: t("features.global.title"),
      description: t("features.global.description")
    }
  ];

  const values = [
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: t("values.userFirst.title"),
      description: t("values.userFirst.description")
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: t("values.privacy.title"),
      description: t("values.privacy.description")
    },
    {
      icon: <Award className="h-6 w-6 text-yellow-500" />,
      title: t("values.excellence.title"),
      description: t("values.excellence.description")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg">
                <Target className="h-12 w-12 text-blue-500" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t("hero.title")}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t("hero.subtitle")}
          </p>

          <Badge variant="secondary" className="text-sm px-4 py-2">
            {t("hero.badge")}
          </Badge>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">{t("mission.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                {t("mission.description")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t("features.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t("values.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {value.icon}
                    <h3 className="font-semibold text-lg ml-3">{value.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">{t("cta.title")}</h2>
              <p className="text-blue-100 mb-6">{t("cta.description")}</p>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>{t("cta.feature1")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>{t("cta.feature2")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>{t("cta.feature3")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
