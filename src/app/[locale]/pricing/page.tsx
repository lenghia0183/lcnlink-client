"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Sparkles, Gift, Star, Heart } from "lucide-react";

export default function PricingPage() {
  const t = useTranslations("Pricing");

  const freePlan = {
    name: t("plans.free.name"),
    description: t("plans.free.description"),
    icon: <Gift className="h-8 w-8" />,
    features: [
      { name: t("features.unlimitedLinks"), included: true },
      { name: t("features.advancedAnalytics"), included: true },
      { name: t("features.customDomain"), included: true },
      { name: t("features.passwordProtection"), included: true },
      { name: t("features.qrCodes"), included: true },
      { name: t("features.basicAnalytics"), included: true },
      { name: t("features.apiAccess"), included: true },
      { name: t("features.standardSupport"), included: true },
    ],
    buttonText: t("getStarted"),
  };

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg">
                <Sparkles className="h-12 w-12 text-blue-500" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t("title")}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            {t("subtitle")}
          </p>
          
          {/* Free announcement */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-900/30 dark:via-emerald-900/20 dark:to-green-900/30 border border-green-200 dark:border-green-700 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse"></div>
            <div className="relative text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
                🎉 Hoàn toàn MIỄN PHÍ mãi mãi!
              </h2>
              <p className="text-lg text-green-700 dark:text-green-300 max-w-2xl mx-auto mb-6">
                Chúng tôi tin rằng công cụ rút gọn URL tốt nên được mọi người sử dụng miễn phí. 
                Tất cả tính năng cao cấp đều có sẵn - không có chi phí ẩn, không có giới hạn thời gian.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-800 dark:text-green-200">Không giới hạn link</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-800 dark:text-green-200">Phân tích chi tiết</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-800 dark:text-green-200">Tất cả tính năng</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Free Plan Card */}
        <div className="flex justify-center mb-16">
          <Card className="relative w-full max-w-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105">
            {/* Featured badge */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-sm font-semibold shadow-lg">
                <Star className="h-4 w-4 mr-1" />
                Được khuyên dùng
              </Badge>
            </div>

            <CardHeader className="text-center pb-6 pt-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  {freePlan.icon}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>

              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {freePlan.name}
              </CardTitle>
              <CardDescription className="text-lg mt-3 text-gray-600 dark:text-gray-300">
                {freePlan.description}
              </CardDescription>

              <div className="mt-6">
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    $0
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2 text-lg">
                    /mãi mãi
                  </span>
                </div>
                <p className="text-green-600 font-semibold">
                  ✨ Miễn phí hoàn toàn, không có điều kiện
                </p>
              </div>
            </CardHeader>

            <CardContent className="px-8">
              <ul className="space-y-4 mb-8">
                {freePlan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="h-5 w-5 mr-2" />
                {freePlan.buttonText}
              </Button>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  💳 Không cần thẻ tín dụng • 🚀 Sử dụng ngay lập tức
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Free Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                🤔 Tại sao chúng tôi miễn phí?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full w-fit mx-auto mb-4">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Vì cộng đồng</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Chúng tôi tin rằng công nghệ tốt nên phục vụ mọi người, không phân biệt khả năng tài chính.</p>
                </div>
                <div className="p-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full w-fit mx-auto mb-4">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Đơn giản hóa</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Không có gói phức tạp, không có giới hạn khó hiểu. Chỉ có một dịch vụ tuyệt vời, hoàn toàn miễn phí.</p>
                </div>
                <div className="p-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full w-fit mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Niềm tin</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Chúng tôi xây dựng niềm tin qua chất lượng, không qua mô hình định giá phức tạp.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("faq.title")}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 dark:text-white">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
