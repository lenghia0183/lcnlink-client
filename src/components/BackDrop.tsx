"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface BackdropProps extends HTMLMotionProps<"div"> {
  isOpen: boolean;
  blur?: boolean;
  onClose?: () => void;
  showSpinner?: boolean;
  spinnerSize?: number;
}

export function Backdrop({
  isOpen,
  onClose,
  blur = true,
  showSpinner = true,
  spinnerSize = 50,
  className,
  ...props
}: BackdropProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black-100",
            blur && "backdrop-blur-sm",
            className
          )}
          {...props}
        >
          {showSpinner && (
            <Loader2
              className="animate-spin text-white dark:text-gray-200"
              size={spinnerSize}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
