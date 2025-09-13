"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { User, Shield, LogOut, ChevronDown } from "lucide-react";
import { AppDropdown } from "./AppDropDown";
import { useUser } from "@/context/userProvider";
import { useRouter } from "@/i18n/routing";
import { PATH } from "@/constants/path";

export function ProfileDropdown() {
  const t = useTranslations("Navigation");
  const { userData, logoutUser } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (fullname: string) => {
    return fullname
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const menuItems = [
    {
      label: t("profile"),
      icon: <User className="w-4 h-4" />,
      onClick: () => {
        router.push(PATH.PROFILE);
        setIsOpen(false);
      },
    },
    // {
    //   label: t("settings"),
    //   icon: <Settings className="w-4 h-4" />,
    //   onClick: () => {
    //     router.push(PATH.PROFILE);
    //     setIsOpen(false);
    //   },
    // },
    {
      label: t("security"),
      icon: <Shield className="w-4 h-4" />,
      onClick: () => {
        router.push(PATH.SECURITY);
        setIsOpen(false);
      },
    },
    {
      label: "",
      separator: true,
    },
    {
      label: t("logout"),
      icon: <LogOut className="w-4 h-4" />,
      onClick: () => {
        logoutUser();
        setIsOpen(false);
      },
      className: "text-red-600 dark:text-red-400",
    },
  ];

  if (!userData) return null;

  return (
    <AppDropdown
      trigger={
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
            {getInitials(userData.fullname || "User")}
          </div>

          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {userData.fullname}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userData.email}
            </p>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      }
      items={menuItems}
      align="end"
      contentClassName="w-56"
    />
  );
}
