// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import { LinkData } from "@/types/Link";
import { CreateLinkDialog } from "./CreateLinkDialog";
import { StatsCards } from "./StatsCard";
import { SearchAndFilters } from "./SearchAndFilters";
import { LinkManagementCard } from "./LinkManagementCard";
import { EditLinkDialog } from "./EditLinkDialog";
import { useQueryState } from "@/hooks/useQueryState";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");

  const { tab, setTab, keyword, setKeyword } = useQueryState({
    tab: "all",
  });

  const [copiedId, setCopiedId] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkData | undefined>(
    undefined
  );

  // Mock data
  const [links, setLinks] = useState<LinkData[]>([
    {
      id: "1",
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      shortUrl: "https://short.ly/abc123",
      customAlias: "my-product",
      clicks: 1247,
      maxClicks: 2000,
      createdAt: new Date("2024-01-15"),
      expiresAt: new Date("2025-01-15"),
      description: "Product landing page - Summer Collection 2024",
      password: "secret123",
      isPasswordProtected: true,
      status: "active",
    },
    {
      id: "2",
      originalUrl: "https://github.com/myproject/repository",
      shortUrl: "https://short.ly/github-repo",
      clicks: 856,
      maxClicks: 1000,
      createdAt: new Date("2024-01-10"),
      expiresAt: new Date("2024-12-31"),
      description: "Open source project repository",
      isPasswordProtected: false,
      status: "active",
    },
    {
      id: "3",
      originalUrl: "https://docs.google.com/spreadsheets/d/long-id",
      shortUrl: "https://short.ly/spreadsheet",
      clicks: 500,
      maxClicks: 500,
      createdAt: new Date("2024-01-05"),
      description: "Q1 Budget Planning - Marketing Department",
      isPasswordProtected: false,
      status: "limit_reached",
    },
    {
      id: "4",
      originalUrl: "https://expired-link.com/old-content",
      shortUrl: "https://short.ly/expired",
      clicks: 234,
      createdAt: new Date("2023-12-01"),
      expiresAt: new Date("2024-01-01"),
      description: "Winter promotion campaign 2023",
      isPasswordProtected: false,
      status: "expired",
    },
    {
      id: "5",
      originalUrl: "https://company-portal.com/internal-dashboard",
      shortUrl: "https://short.ly/internal",
      clicks: 189,
      maxClicks: 500,
      createdAt: new Date("2024-02-20"),
      expiresAt: new Date("2024-06-30"),
      description: "Internal analytics dashboard for managers",
      password: "company123",
      isPasswordProtected: true,
      status: "active",
    },
    {
      id: "6",
      originalUrl: "https://event-registration.com/conference-2024",
      shortUrl: "https://short.ly/event-reg",
      clicks: 1500,
      maxClicks: 2000,
      createdAt: new Date("2024-01-25"),
      expiresAt: new Date("2024-03-15"),
      description: "Tech Conference 2024 Registration",
      isPasswordProtected: false,
      status: "active",
    },
    {
      id: "7",
      originalUrl: "https://survey.com/customer-feedback",
      shortUrl: "https://short.ly/feedback",
      clicks: 300,
      maxClicks: 300,
      createdAt: new Date("2024-02-10"),
      description: "Q1 Customer Satisfaction Survey",
      isPasswordProtected: false,
      status: "limit_reached",
    },
    {
      id: "8",
      originalUrl: "https://disabled-service.com/legacy-api",
      shortUrl: "https://short.ly/legacy",
      clicks: 42,
      createdAt: new Date("2023-11-15"),
      expiresAt: new Date("2024-02-01"),
      description: "Legacy API endpoint (deprecated)",
      isPasswordProtected: false,
      status: "disabled",
    },
    {
      id: "9",
      originalUrl: "https://promo.com/special-offer",
      shortUrl: "https://short.ly/special",
      clicks: 980,
      maxClicks: 1000,
      createdAt: new Date("2024-02-05"),
      expiresAt: new Date("2024-02-29"),
      description: "Valentine's Day Special Offer",
      isPasswordProtected: false,
      status: "active",
    },
    {
      id: "10",
      originalUrl: "https://download.com/software-update",
      shortUrl: "https://short.ly/update",
      clicks: 2500,
      maxClicks: 3000,
      createdAt: new Date("2024-01-20"),
      description: "Software v2.0 Update Package",
      password: "secureDL",
      isPasswordProtected: true,
      status: "active",
    },
  ]);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const handleEditLink = (link: LinkData) => {
    setSelectedLink(link);
    setIsEditDialogOpen(true);
  };

  const handleDeleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
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
            <p className="text-gray-600 dark:text-gray-300">{t("subtitle")}</p>
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                {t("createNewLink")}
              </Button>
            </DialogTrigger>
            <CreateLinkDialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            />
          </Dialog>
        </div>

        <StatsCards links={links} />

        <SearchAndFilters defaultSearch={keyword} onSearchChange={setKeyword} />

        <LinkManagementCard
          links={links}
          searchTerm={keyword}
          activeTab={tab}
          onTabChange={setTab}
          onEdit={handleEditLink}
          onDelete={handleDeleteLink}
          onCopy={copyToClipboard}
          copiedId={copiedId}
        />

        <EditLinkDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          selectedLink={selectedLink}
        />
      </div>
    </div>
  );
}
