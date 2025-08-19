// app/dashboard/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { LinkData } from "@/types/Link";
import { CreateLinkDialog } from "./CreateLinkDialog";
import { StatsCards } from "./StatsCard";
import { SearchAndFilters } from "./SearchAndFilters";
import { LinkManagementCard } from "./LinkManagementCard";
import { EditLinkDialog } from "./EditLinkDialog";
import { useQueryState } from "@/hooks/useQueryState";
import { DeleteLinkDialog } from "./DeleteLinkDialog";
import { AppButton } from "@/components/AppButton";
import { useGetLinks } from "@/services/api/links";
import { buildFilterFromObject } from "@/utils/buildFilterFromObject";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");

  const { tab, setTab, keyword, setKeyword, page, setPage } = useQueryState<{
    tab: string;
  }>({
    tab: "all",
  });

  const { data, mutate } = useGetLinks({
    page: page,
    limit: 10,
    keyword: keyword,
  });
  console.log("data", data);

  useEffect(() => {
    mutate();
  }, [page]);

  const [copiedId, setCopiedId] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkData | undefined>(
    undefined
  );

  // Mock data
  const [links, setLinks] = useState<LinkData[]>();

  useEffect(() => {
    if (data) {
      setLinks(data.items);
    }
  }, [data]);

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
    setIsDeleteDialogOpen(true);
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

          <AppButton
            className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700"
            iconLeft={<Plus className="h-4 w-4 mr-2" />}
            onClick={() => {
              setIsCreateDialogOpen(true);
            }}
          >
            {t("createNewLink")}
          </AppButton>
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
          page={page}
          setPage={setPage}
        />

        <EditLinkDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          selectedLink={selectedLink}
        />

        <CreateLinkDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />

        <DeleteLinkDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          selectedLink={selectedLink}
        />
      </div>
    </div>
  );
}
