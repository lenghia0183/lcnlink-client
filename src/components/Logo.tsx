import * as React from "react";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 no-underline group transition-transform duration-200 hover:scale-105"
    >
      <div className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#6b7280] shadow-md group-hover:shadow-lg group-hover:from-[#1e40af] group-hover:to-[#9ca3af] transition-all duration-300">
        <LinkIcon className="h-4 w-4 text-white" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
      </div>
      <div className="hidden sm:flex flex-col leading-tight">
        <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
          Lcn Link
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-300">
          rút gọn link
        </span>
      </div>
    </Link>
  );
}
