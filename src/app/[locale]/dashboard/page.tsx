
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  Clock,
  Shield,
  MousePointer,
  Globe,
  Zap,
  AlertCircle,
  Settings,
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

interface LinkData {
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

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkData | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  // Form states
  const [formData, setFormData] = useState({
    url: "",
    customAlias: "",
    description: "",
    password: "",
    maxClicks: "",
    expiresAt: ""
  });
  
  // Mock data với thông tin mở rộng
  const [links, setLinks] = useState<LinkData[]>([
    {
      id: "1",
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      shortUrl: "https://short.ly/abc123",
      customAlias: "my-product",
      clicks: 1247,
      maxClicks: 2000,
      createdAt: new Date("2024-01-15"),
      description: "Product landing page",
      password: "secret123",
      isPasswordProtected: true,
      status: "active"
    },
    {
      id: "2",
      originalUrl: "https://github.com/myproject/repository",
      shortUrl: "https://short.ly/github-repo",
      clicks: 856,
      maxClicks: 1000,
      createdAt: new Date("2024-01-10"),
      expiresAt: new Date("2024-12-31"),
      isPasswordProtected: false,
      status: "active"
    },
    {
      id: "3",
      originalUrl: "https://docs.google.com/spreadsheets/d/long-id",
      shortUrl: "https://short.ly/spreadsheet",
      clicks: 500,
      maxClicks: 500,
      createdAt: new Date("2024-01-05"),
      description: "Q1 Budget Planning",
      isPasswordProtected: false,
      status: "limit_reached"
    },
    {
      id: "4",
      originalUrl: "https://expired-link.com/old-content",
      shortUrl: "https://short.ly/expired",
      clicks: 234,
      createdAt: new Date("2023-12-01"),
      expiresAt: new Date("2024-01-01"),
      isPasswordProtected: false,
      status: "expired"
    }
  ]);

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = links.filter(link => link.status === "active").length;
  const protectedLinks = links.filter(link => link.isPasswordProtected).length;
  const limitedLinks = links.filter(link => link.maxClicks).length;

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const getStatusBadge = (link: LinkData) => {
    const statusConfig = {
      active: { variant: "default" as const, label: t("active"), icon: <CheckCircle className="h-3 w-3" /> },
      expired: { variant: "destructive" as const, label: t("expired"), icon: <Clock className="h-3 w-3" /> },
      disabled: { variant: "secondary" as const, label: t("disabled"), icon: <AlertCircle className="h-3 w-3" /> },
      limit_reached: { variant: "outline" as const, label: t("limitReached"), icon: <MousePointer className="h-3 w-3" /> }
    };
    
    const config = statusConfig[link.status];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getProgressPercentage = (clicks: number, maxClicks?: number) => {
    if (!maxClicks) return 0;
    return Math.min((clicks / maxClicks) * 100, 100);
  };

  const filterLinks = (status: string) => {
    let filtered = links;
    
    if (status !== "all") {
      filtered = links.filter(link => link.status === status);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(link =>
        link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (link.description && link.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const handleCreateLink = () => {
    setIsCreateDialogOpen(false);
    setFormData({
      url: "",
      customAlias: "",
      description: "",
      password: "",
      maxClicks: "",
      expiresAt: ""
    });
  };

  const handleEditLink = (link: LinkData) => {
    setEditingLink(link);
    setFormData({
      url: link.originalUrl,
      customAlias: link.customAlias || "",
      description: link.description || "",
      password: link.password || "",
      maxClicks: link.maxClicks?.toString() || "",
      expiresAt: link.expiresAt ? format(link.expiresAt, "yyyy-MM-dd") : ""
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateLink = () => {
    if (!editingLink) return;
    
    setLinks(prev => prev.map(link => 
      link.id === editingLink.id 
        ? { 
            ...link, 
            description: formData.description,
            password: formData.password,
            isPasswordProtected: !!formData.password,
            maxClicks: formData.maxClicks ? parseInt(formData.maxClicks) : undefined
          }
        : link
    ));
    
    setIsEditDialogOpen(false);
    setEditingLink(null);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t("title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                {t("createNewLink")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t("createDialogTitle")}</DialogTitle>
                <DialogDescription>
                  {t("createDialogDescription")}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="url">{t("originalUrl")} *</Label>
                  <Input
                    id="url"
                    placeholder={t("urlPlaceholder")}
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="alias">{t("customAlias")}</Label>
                  <Input
                    id="alias"
                    placeholder={t("aliasPlaceholder")}
                    value={formData.customAlias}
                    onChange={(e) => setFormData(prev => ({ ...prev, customAlias: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">{t("description")}</Label>
                  <Textarea
                    id="description"
                    placeholder={t("descriptionPlaceholder")}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">{t("password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t("passwordPlaceholder")}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="maxClicks">{t("maxClicks")}</Label>
                  <Input
                    id="maxClicks"
                    type="number"
                    placeholder={t("maxClicksPlaceholder")}
                    value={formData.maxClicks}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxClicks: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="expiresAt">{t("expirationDate")}</Label>
                  <Input
                    id="expiresAt"
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  {t("cancel")}
                </Button>
                <Button onClick={handleCreateLink}>
                  {t("create")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards with softer colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("totalLinks")}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{links.length}</p>
                  <p className="text-xs text-gray-500 mt-1">{activeLinks} {t("active")}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <Link2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("totalClicks")}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalClicks.toLocaleString()}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12.5% {t("comparedToLastMonth")}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <MousePointer className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("protectedLinks")}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{protectedLinks}</p>
                  <p className="text-xs text-gray-500 mt-1">{((protectedLinks/links.length)*100).toFixed(1)}% {t("ofTotalLinks")}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("limitedLinks")}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{limitedLinks}</p>
                  <p className="text-xs text-gray-500 mt-1">{t("trackUsage")}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-gray-200 dark:border-gray-700">
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

        {/* Links Management */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              {t("linkManagement")}
            </CardTitle>
            <CardDescription>{t("subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">{t("allLinks")} ({links.length})</TabsTrigger>
                <TabsTrigger value="active">{t("activeLinks")} ({activeLinks})</TabsTrigger>
                <TabsTrigger value="expired">{t("expiredLinks")} ({links.filter(l => l.status === "expired").length})</TabsTrigger>
                <TabsTrigger value="limit_reached">{t("limitReachedLinks")} ({links.filter(l => l.status === "limit_reached").length})</TabsTrigger>
                <TabsTrigger value="disabled">{t("disabledLinks")} ({links.filter(l => l.status === "disabled").length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {filterLinks(activeTab).map((link) => (
                    <Card key={link.id} className="border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            {/* Header with Short URL and Status */}
                            <div className="flex items-center gap-3 mb-3">
                              <code className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                {link.shortUrl}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(link.shortUrl, link.id)}
                                className="h-8 w-8 p-0"
                              >
                                {copiedId === link.id ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              {getStatusBadge(link)}
                              {link.isPasswordProtected && (
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Shield className="h-3 w-3" />
                                  {t("protected")}
                                </Badge>
                              )}
                            </div>
                            
                            {/* Original URL */}
                            <div className="flex items-center gap-2 mb-3">
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {link.originalUrl}
                              </p>
                            </div>
                            
                            {/* Description */}
                            {link.description && (
                              <p className="text-sm text-gray-500 mb-3 italic">
                                "{link.description}"
                              </p>
                            )}
                            
                            {/* Click Progress Bar */}
                            {link.maxClicks && (
                              <div className="mb-3">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>{t("clicks")}: {link.clicks}/{link.maxClicks}</span>
                                  <span>{getProgressPercentage(link.clicks, link.maxClicks).toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      link.status === "limit_reached" 
                                        ? "bg-red-500" 
                                        : "bg-blue-500"
                                    }`}
                                    style={{ width: `${getProgressPercentage(link.clicks, link.maxClicks)}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            
                            {/* Stats Row */}
                            <div className="flex items-center gap-6 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <MousePointer className="h-3 w-3" />
                                {link.clicks} {t("clicks")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(link.createdAt, "dd/MM/yyyy")}
                              </span>
                              {link.expiresAt && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {t("expires")} {format(link.expiresAt, "dd/MM/yyyy")}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-4">
                            <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                              <QrCode className="h-4 w-4" />
                            </Button>
                            
                            <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-9 w-9 p-0"
                              onClick={() => handleEditLink(link)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleEditLink(link)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  {t("edit")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  {t("share")}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteLink(link.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {t("delete")}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Edit Link Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{t("editDialogTitle")}</DialogTitle>
              <DialogDescription>
                {t("editDialogDescription")}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-description">{t("description")}</Label>
                <Textarea
                  id="edit-description"
                  placeholder={t("descriptionPlaceholder")}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-password">{t("password")}</Label>
                <Input
                  id="edit-password"
                  type="password"
                  placeholder={t("passwordPlaceholderEdit")}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-maxClicks">{t("maxClicks")}</Label>
                <Input
                  id="edit-maxClicks"
                  type="number"
                  placeholder={t("maxClicksPlaceholder")}
                  value={formData.maxClicks}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxClicks: e.target.value }))}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                {t("cancel")}
              </Button>
              <Button onClick={handleUpdateLink}>
                {t("update")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
