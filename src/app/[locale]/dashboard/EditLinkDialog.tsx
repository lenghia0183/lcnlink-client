import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

interface EditLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
  formData: any;
  onFormDataChange: (field: string, value: string) => void;
}

export const EditLinkDialog = ({
  open,
  onOpenChange,
  onUpdate,
  formData,
  onFormDataChange,
}: EditLinkDialogProps) => {
  const t = useTranslations("Dashboard");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("editDialogTitle")}</DialogTitle>
          <DialogDescription>{t("editDialogDescription")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-description">{t("description")}</Label>
            <Textarea
              id="edit-description"
              placeholder={t("descriptionPlaceholder")}
              value={formData.description}
              onChange={(e) => onFormDataChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="edit-password">{t("password")}</Label>
            <Input
              id="edit-password"
              type="password"
              placeholder={t("passwordPlaceholderEdit")}
              value={formData.password}
              onChange={(e) => onFormDataChange("password", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="edit-maxClicks">{t("maxClicks")}</Label>
            <Input
              id="edit-maxClicks"
              type="number"
              placeholder={t("maxClicksPlaceholder")}
              value={formData.maxClicks}
              onChange={(e) => onFormDataChange("maxClicks", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={onUpdate}>{t("update")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
