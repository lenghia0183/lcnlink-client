import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/utils";

type AppDialogProps = {
  trigger?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  classNameContent?: string;
  footerActions?: {
    label: string;
    onClick: () => void;
    variant?: ComponentProps<typeof Button>["variant"];
    disabled: boolean;
  }[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnOverlayClick?: boolean;
};

export const AppDialog = ({
  trigger,
  title,
  description,
  children,
  footerActions,
  open,
  classNameContent,
  onOpenChange,
  closeOnOverlayClick = true,
}: AppDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        className={cn(classNameContent)}
        onInteractOutside={(e) => {
          if (!closeOnOverlayClick) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">{children}</div>

        <DialogFooter>
          {footerActions ? (
            footerActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant || "default"}
                type="button"
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))
          ) : (
            <DialogClose asChild>
              <Button variant="outline">Đóng</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
