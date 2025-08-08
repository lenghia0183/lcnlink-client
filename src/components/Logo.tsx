import * as React from "react";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 no-underline group transition-all duration-200 hover:scale-[1.02]"
      aria-label="Trang chủ Lcn Link"
    >
      <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md group-hover:shadow-lg transition-all duration-300">
        <LinkIcon className="h-4 w-4 text-white transform group-hover:rotate-[-15deg] transition-transform" />

        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-400 animate-ping opacity-80" />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
          Lcn Link
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          rút gọn link
        </span>
      </div>
    </Link>
  );
}
