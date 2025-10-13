"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { ReferrerData } from "@/types/Referrer";
import { CreateReferrerDialog } from "./CreateReferrerDialog";
import { ReferrerManagementCard } from "./ReferrerManagementCard";
import { EditReferrerDialog } from "./EditReferrerDialog";
import { DeleteReferrerDialog } from "./DeleteReferrerDialog";
import { AppButton } from "@/components/AppButton";
import {
  useCreateReferrer,
  useDeleteReferrer,
  useGetReferrers,
  useUpdateReferrer,
} from "@/services/api/referrers";
import { useQueryState } from "@/hooks/useQueryState";
import validateResponseCode from "@/utils/validateResponseCode";
import { toast } from "@/components/AppToast";
import { CreateReferrerFormValues, EditReferrerFormValues } from "./validation";

export default function ReferrersPage() {
  const t = useTranslations("Referrers");

  const { page, setPage } = useQueryState({
    page: 1,
  });

  const {
    data: dataReferrerList,
    mutate: mutateReferrerList,
    isValidating: isLoadingReferrers,
  } = useGetReferrers({
    page: page,
    limit: 10,
  });

  const { trigger: deleteReferrerTrigger } = useDeleteReferrer();
  const { trigger: createReferrerTrigger } = useCreateReferrer();
  const { trigger: updateReferrerTrigger } = useUpdateReferrer();

  useEffect(() => {
    mutateReferrerList();
  }, [page, mutateReferrerList]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReferrer, setSelectedReferrer] = useState<ReferrerData | undefined>(
    undefined
  );
  const [referrers, setReferrers] = useState<ReferrerData[]>();

  useEffect(() => {
    if (dataReferrerList) {
      setReferrers(dataReferrerList.items);
      setSelectedReferrer(undefined);
    }
  }, [dataReferrerList]);

  const handleEditReferrer = (referrer: ReferrerData) => {
    setSelectedReferrer(referrer);
    setIsEditDialogOpen(true);
  };

  const handleDeleteReferrer = (referrer: ReferrerData) => {
    setIsDeleteDialogOpen(true);
    setSelectedReferrer(referrer);
  };

  const handleConfirmCreateReferrer = (formValue: CreateReferrerFormValues) => {
    createReferrerTrigger(
      {
        body: {
          referrer: formValue.referrer,
          alias: formValue.alias,
        },
      },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
            toast.success(response.message);
            mutateReferrerList();
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
    if (selectedReferrer) {
      deleteReferrerTrigger(
        { id: selectedReferrer.id },
        {
          onSuccess: (response) => {
            if (validateResponseCode(response.statusCode)) {
              toast.success(response.message);
              mutateReferrerList();
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

  const handleConfirmEdit = (formValue: EditReferrerFormValues) => {
    if (selectedReferrer) {
      const body = {
        referrer: formValue.referrer,
        alias: formValue.alias,
      };
      
      updateReferrerTrigger(
        {
          id: selectedReferrer.id,
          body,
        },
        {
          onSuccess: (response) => {
            if (validateResponseCode(response.statusCode)) {
              toast.success(response.message);
              mutateReferrerList();
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
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t("title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              {t("subtitle")}
            </p>
          </div>

          <AppButton
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            iconLeft={<Plus className="h-4 w-4 mr-2" />}
            onClick={() => {
              setIsCreateDialogOpen(true);
            }}
          >
            {t("createNewReferrer")}
          </AppButton>
        </div>

        <ReferrerManagementCard
          referrers={referrers}
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(
            (dataReferrerList?.meta?.total ?? 1) / (dataReferrerList?.meta?.limit ?? 1)
          )}
          loading={isLoadingReferrers}
          onEdit={handleEditReferrer}
          onDelete={handleDeleteReferrer}
        />

        <EditReferrerDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          selectedReferrer={selectedReferrer}
          handleConfirmEdit={handleConfirmEdit}
        />

        <CreateReferrerDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          handleConfirmCreate={handleConfirmCreateReferrer}
        />

        <DeleteReferrerDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          selectedReferrer={selectedReferrer}
          handleConfirmDelete={handleConfirmDelete}
        />
      </div>
    </div>
  );
}