
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Copy, 
  QrCode, 
  BarChart3,
  Calendar,
  Link2,
  Filter,
  Download,
  Share2,
  CheckCircle,
  TrendingUp,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface LinkData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customAlias?: string;
  clicks: number;
  createdAt: Date;
  expiresAt?: Date;
  description?: string;
  status: "active" | "expired" | "disabled";
}

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string>("");
  
  // Mock data
  const [links, setLinks] = useState<LinkData[]>([
    {
      id: "1",
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      shortUrl: "https://short.ly/abc123",
      customAlias: "my-product",
      clicks: 1247,
      createdAt: new Date("2024-01-15"),
      description: "Product landing page",
      status: "active"
    },
    {
      id: "2",
      originalUrl: "https://github.com/myproject/repository",
      shortUrl: "https://short.ly/github-repo",
      clicks: 856,
      createdAt: new Date("2024-01-10"),
      expiresAt: new Date("2024-12-31"),
      status: "active"
    },
    {
      id: "3",
      originalUrl: "https://docs.google.com/spreadsheets/d/long-id",
      shortUrl: "https://short.ly/spreadsheet",
      clicks: 342,
      createdAt: new Date("2024-01-05"),
      description: "Q1 Budget Planning",
      status: "active"
    }
  ]);

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = links.filter(link => link.status === "active").length;

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const filteredLinks = links.filter(link =>
    link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (link.description && link.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          <Button className="mt-4 lg:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            {t("createNew")}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("stats.totalLinks")}</p>
                  <p className="text-2xl font-bold text-blue-600">{links.length}</p>
                </div>
                <Link2 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("stats.totalClicks")}</p>
                  <p className="text-2xl font-bold text-green-600">{totalClicks.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("stats.activeLinks")}</p>
                  <p className="text-2xl font-bold text-purple-600">{activeLinks}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("stats.avgClicks")}</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(totalClicks / links.length) || 0}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {t("filter")}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {t("export")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links Table */}
        <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              {t("links.title")}
            </CardTitle>
            <CardDescription>{t("links.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLinks.map((link) => (
                <div key={link.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
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
                        <Badge variant={link.status === "active" ? "default" : "secondary"}>
                          {t(`status.${link.status}`)}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-1">
                        {link.originalUrl}
                      </p>
                      
                      {link.description && (
                        <p className="text-sm text-gray-500 mb-2">{link.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {link.clicks} {t("clicks")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(link.createdAt, "MMM dd, yyyy")}
                        </span>
                        {link.expiresAt && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {t("expires")} {format(link.expiresAt, "MMM dd, yyyy")}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <QrCode className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            {t("actions.edit")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            {t("actions.share")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t("actions.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
