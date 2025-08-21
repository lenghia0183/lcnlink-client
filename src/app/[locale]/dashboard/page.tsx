"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { LinkData } from "@/types/Link";
import { CreateLinkDialog } from "./CreateLinkDialog";
import { StatsCards } from "./StatsCard";
import { SearchAndFilters } from "./SearchAndFilters";
import { LinkManagementCard } from "./LinkManagementCard";
import { EditFormValues, EditLinkDialog } from "./EditLinkDialog";
import { useQueryState } from "@/hooks/useQueryState";
import { DeleteLinkDialog } from "./DeleteLinkDialog";
import { AppButton } from "@/components/AppButton";
import {
  useCreateLink,
  useDeleteLink,
  useGetLinks,
  useGetTotalLinkPerStatus,
  useUpdateLink,
} from "@/services/api/links";
import { buildFilterFromObject } from "@/utils/buildFilterFromObject";
import { LinkStatus } from "@/constants/common";
import validateResponseCode from "@/utils/validateResponseCode";
import { toast } from "@/components/AppToast";
import { CreateLinkFormValues } from "./validation";
import { format } from "date-fns";

export type TotalLinksPerStatus = {
  status: LinkStatus | "all";
  count: number;
};

export default function DashboardPage() {
  const t = useTranslations("Dashboard");

  const { tab, setTab, keyword, setKeyword, page, setPage } = useQueryState<{
    tab: string;
  }>({
    tab: "",
  });

  const { data: dataLinkList, mutate: mutateLinkList } = useGetLinks({
    page: page,
    limit: 10,
    keyword: keyword,
    filter: buildFilterFromObject({ status: tab }),
  });

  const { data: dataTotalLinkPerStatus, mutate: mutateTotalLinkPerStatus } =
    useGetTotalLinkPerStatus();

  const { trigger: deleteLinkTrigger } = useDeleteLink();
  const { trigger: createLinkTrigger } = useCreateLink();
  const { trigger: updateLinkTrigger } = useUpdateLink();

  useEffect(() => {
    mutateLinkList();
    mutateTotalLinkPerStatus();
  }, [page, keyword, tab]);

  const [copiedId, setCopiedId] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkData | undefined>(
    undefined
  );
  const [links, setLinks] = useState<LinkData[]>();

  useEffect(() => {
    if (dataLinkList) {
      setLinks(dataLinkList.items);
      setSelectedLink(undefined);
    }
  }, [dataLinkList]);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const handleEditLink = (link: LinkData) => {
    setSelectedLink(link);
    setIsEditDialogOpen(true);
  };

  const handleDeleteLink = (link: LinkData) => {
    setIsDeleteDialogOpen(true);
    setSelectedLink(link);
  };

  const handleConfirmCreateLink = (formValue: CreateLinkFormValues) => {
    createLinkTrigger(
      {
        body: {
          originalUrl: formValue?.originUrl || "",
          alias: formValue.alias,
          maxClicks: Number(formValue?.maxClicks) || 0,
          expireAt: formValue.expirationDate?.toISOString(),
          description: formValue.description,
          password: formValue.password,
        },
      },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
            toast.success(response.message);
            mutateLinkList();
          } else {
            toast.error(response.message);
          }
        },
        onError: (response) => {
          toast.error(response.message);
        },
      }
    );
  };

  const handleConfirmDelete = () => {
    if (selectedLink) {
      deleteLinkTrigger(
        { id: selectedLink?.id || "" },
        {
          onSuccess: (response) => {
            if (validateResponseCode(response.statusCode)) {
              toast.success(response.message);
              mutateLinkList();
            } else {
              toast.error(response.message);
            }
          },
          onError: (response) => {
            toast.error(response.message);
          },
        }
      );
      setIsDeleteDialogOpen(false);
    }
  };

  const handleConfirmEdit = (formValue: EditFormValues) => {
    console.log("formValue", formValue);
    if (selectedLink) {
      const body = {
        alias: formValue.alias,
        maxClicks: Number(formValue?.maxClicks) || 0,
        expireAt: formValue.expirationDate
          ? format(new Date(formValue.expirationDate), "yyyy-MM-dd HH:mm")
          : "",

        description: formValue.description,
        password: formValue.password ?? undefined,
      };
      console.log("body", body);
      updateLinkTrigger(
        {
          id: selectedLink?.id || "",
          body,
        },
        {
          onSuccess: (response) => {
            if (validateResponseCode(response.statusCode)) {
              toast.success(response.message);
              mutateLinkList();
            } else {
              toast.error(response.message);
            }
          },
          onError: (response) => {
            toast.error(response.message);
          },
        }
      );
      setIsEditDialogOpen(false);
    }
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

        <StatsCards links={links} total={dataLinkList?.meta?.total} />

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
          totalLinksPerStatus={dataTotalLinkPerStatus || []}
          totalPages={Math.ceil(
            (dataLinkList?.meta?.total ?? 1) / (dataLinkList?.meta?.limit ?? 1)
          )}
        />

        <EditLinkDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          selectedLink={selectedLink}
          handleConfirmEdit={handleConfirmEdit}
        />

        <CreateLinkDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          handleConfirmCreate={handleConfirmCreateLink}
        />

        <DeleteLinkDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          selectedLink={selectedLink}
          handleConfirmDelete={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
