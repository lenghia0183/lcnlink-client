
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Shield, 
  BarChart3, 
  Crown,
  Sparkles
} from "lucide-react";

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: t("plans.free.name"),
      description: t("plans.free.description"),
      price: { monthly: 0, yearly: 0 },
      icon: <Zap className="h-6 w-6" />,
      features: [
        { name: t("features.linksPerMonth", { count: 100 }), included: true },
        { name: t("features.basicAnalytics"), included: true },
        { name: t("features.standardSupport"), included: true },
        { name: t("features.customDomain"), included: false },
        { name: t("features.advancedAnalytics"), included: false },
        { name: t("features.teamCollaboration"), included: false },
        { name: t("features.apiAccess"), included: false }
      ],
      recommended: false,
      buttonText: t("getStarted")
    },
    {
      name: t("plans.pro.name"),
      description: t("plans.pro.description"),
      price: { monthly: 9, yearly: 90 },
      icon: <Star className="h-6 w-6" />,
      features: [
        { name: t("features.linksPerMonth", { count: 5000 }), included: true },
        { name: t("features.advancedAnalytics"), included: true },
        { name: t("features.customDomain"), included: true },
        { name: t("features.passwordProtection"), included: true },
        { name: t("features.qrCodes"), included: true },
        { name: t("features.prioritySupport"), included: true },
        { name: t("features.apiAccess"), included: false }
      ],
      recommended: true,
      buttonText: t("startFreeTrial")
    },
    {
      name: t("plans.business.name"),
      description: t("plans.business.description"),
      price: { monthly: 29, yearly: 290 },
      icon: <Crown className="h-6 w-6" />,
      features: [
        { name: t("features.unlimitedLinks"), included: true },
        { name: t("features.teamCollaboration"), included: true },
        { name: t("features.whiteLabel"), included: true },
        { name: t("features.apiAccess"), included: true },
        { name: t("features.advancedSecurity"), included: true },
        { name: t("features.dedicatedSupport"), included: true },
        { name: t("features.customIntegrations"), included: true }
      ],
      recommended: false,
      buttonText: t("contactSales")
    }
  ];

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1")
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2")
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3")
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4")
    }
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
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {t("subtitle")}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`font-medium ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
              {t("monthly")}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium ${isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
              {t("yearly")}
            </span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                {t("save20")}
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                plan.recommended ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1">
                    {t("mostPopular")}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    plan.recommended 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {plan.icon}
                  </div>
                </div>
                
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        /{isYearly ? t("year") : t("month")}
                      </span>
                    )}
                  </div>
                  {isYearly && plan.price.yearly > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      ${(plan.price.yearly / 12).toFixed(0)}/month {t("billedYearly")}
                    </p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-gray-400 line-through'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full ${
                    plan.recommended
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                      : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700'
                  }`}
                  variant={plan.recommended ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Section */}
        <Card className="border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-16">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("enterprise.title")}</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t("enterprise.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>{t("enterprise.feature1")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>{t("enterprise.feature2")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>{t("enterprise.feature3")}</span>
                </div>
              </div>
              <Button variant="secondary" className="text-blue-600">
                {t("enterprise.contactUs")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("faq.title")}</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
