
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AppAccordion } from "@/components/AppAccordion";
import { AppDialog } from "@/components/AppDialog";
import { AppTabs } from "@/components/AppTabs";
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
  Download,
  Share2,
  Eye,
  Clock,
  CheckCircle,
  LinkIcon,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

export default function HomePage() {
  const t = useTranslations("UrlShortener");
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expirationDate, setExpirationDate] = useState<Date>();
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [maxClicks, setMaxClicks] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedLinks, setShortenedLinks] = useState<ShortenedLink[]>([]);
  const [copiedId, setCopiedId] = useState<string>("");

  const handleShorten = async () => {
    if (!url || !isValidUrl(url)) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newLink: ShortenedLink = {
        id: Math.random().toString(36).substr(2, 9),
        originalUrl: url,
        shortUrl: `https://short.ly/${customAlias || Math.random().toString(36).substr(2, 6)}`,
        customAlias,
        clicks: Math.floor(Math.random() * 100),
        maxClicks,
        createdAt: new Date(),
        expiresAt: expirationDate,
        description,
        password,
        isPasswordProtected: !!password,
        status: "active"
      };
      
      setShortenedLinks(prev => [newLink, ...prev]);
      setUrl("");
      setCustomAlias("");
      setPassword("");
      setDescription("");
      setMaxClicks(undefined);
      setExpirationDate(undefined);
      setIsLoading(false);
    }, 1000);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      title: t("features.analytics.title"),
      description: t("features.analytics.description")
    },
    {
      icon: <Palette className="h-8 w-8 text-purple-500" />,
      title: t("features.customization.title"),
      description: t("features.customization.description")
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: t("features.security.title"),
      description: t("features.security.description")
    },
    {
      icon: <QrCode className="h-8 w-8 text-orange-500" />,
      title: t("features.qr.title"),
      description: t("features.qr.description")
    }
  ];

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
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder={t("inputPlaceholder")}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10 h-12 text-lg border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <AppAccordion
                  items={[
                    {
                      value: "advanced",
                      trigger: (
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          {t("advancedOptions")}
                        </div>
                      ),
                      content: (
                        <div className="space-y-4 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="alias">{t("customAlias")}</Label>
                              <Input
                                id="alias"
                                placeholder={t("aliasPlaceholder")}
                                value={customAlias}
                                onChange={(e) => setCustomAlias(e.target.value)}
                                className="mt-2"
                              />
                            </div>
                            
                            <div>
                              <Label>{t("expirationDate")}</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full mt-2 justify-start text-left font-normal",
                                      !expirationDate && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {expirationDate ? format(expirationDate, "PPP") : "Pick a date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={expirationDate}
                                    onSelect={setExpirationDate}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="password">{t("password")}</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder={t("passwordPlaceholder")}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="description">{t("description")}</Label>
                            <Textarea
                              id="description"
                              placeholder={t("descriptionPlaceholder")}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="maxClicks">{t("maxClicks")}</Label>
                            <Input
                              id="maxClicks"
                              type="number"
                              placeholder={t("maxClicksPlaceholder")}
                              value={maxClicks || ""}
                              onChange={(e) => setMaxClicks(e.target.value ? parseInt(e.target.value) : undefined)}
                              className="mt-2"
                              min="1"
                            />
                          </div>
                        </div>
                      )
                    }
                  ]}
                />

                <Button
                  onClick={handleShorten}
                  disabled={!url || isLoading}
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t("Common.loading")}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      {t("shortenButton")}
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
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
                <Card key={link.id} className="hover:shadow-lg transition-shadow border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <LinkIcon className="h-4 w-4 text-green-500" />
                          <code className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-sm font-medium">
                            {link.shortUrl}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(link.shortUrl, link.id)}
                            className="h-6 w-6 p-0"
                          >
                            {copiedId === link.id ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {link.originalUrl}
                        </p>
                        
                        {link.description && (
                          <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-3">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {link.clicks} {t("clicks")}
                          </Badge>
                          
                          <Badge variant="outline" className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {format(link.createdAt, "MMM dd, yyyy")}
                          </Badge>
                          
                          {link.expiresAt && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {format(link.expiresAt, "MMM dd, yyyy")}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <QrCode className="h-4 w-4" />
                        </Button>
                        
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
