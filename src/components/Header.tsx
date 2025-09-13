"use client";

import Link from "next/link";
import { MenuIcon, XIcon, Link2 } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import LanguageSwitcher from "./LanguageSwitcher";
import { ModeToggle } from "./ModeToggle";
import { useTranslations } from "next-intl";
import { AppButton } from "./AppButton";
import { AppDrawer } from "./AppDrawer";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/userProvider";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { useState } from "react";

import { PATH } from "@/constants/path";
import LoggedInGuard from "./Guard/LoggedinGuard";

export default function Header() {
  const [isShowNavDrawer, setIsShowNavDrawer] = useState(false);

  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const { logoutUser } = useUser();

  // Các link public
  const publicNav = [
    { name: t("home"), href: PATH.HOME },
    { name: t("about"), href: PATH.ABOUT },
    { name: t("pricing"), href: PATH.PRICING },
  ];

  // Các link cần login mới thấy
  const protectedNav = [
    { name: t("dashboard"), href: PATH.DASHBOARD },
    { name: t("analytics"), href: PATH.ANALYTICS },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Link2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LcnLink
              </span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {/* Public nav */}
                {publicNav.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
                          pathname === item.href
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Protected nav */}
                <LoggedInGuard>
                  <>
                    {protectedNav.map((item) => (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
                              pathname === item.href
                                ? "text-foreground"
                                : "text-foreground/60"
                            )}
                          >
                            {item.name}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </>
                </LoggedInGuard>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <LoggedInGuard
              fallback={
                <div className="hidden md:flex items-center space-x-2">
                  <AppButton variant="ghost" href="/login" asChild>
                    {t("login")}
                  </AppButton>
                  <AppButton
                    asChild
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                    href="/register"
                  >
                    {t("register")}
                  </AppButton>
                </div>
              }
            >
              <div className="hidden md:flex items-center space-x-2">
                <ProfileDropdown />
              </div>
            </LoggedInGuard>

            <LanguageSwitcher />
            <ModeToggle />

            {/* Mobile menu button */}
            <AppButton
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsShowNavDrawer(!isShowNavDrawer)}
            >
              {isShowNavDrawer ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </AppButton>
          </div>
        </div>

        {/* Drawer for mobile */}
        <div suppressHydrationWarning>
          <AppDrawer
            open={isShowNavDrawer}
            onOpenChange={setIsShowNavDrawer}
            title="Menu"
          >
            <>
              {/* Public */}
              {publicNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm font-medium",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground/60"
                  )}
                  onClick={() => setIsShowNavDrawer(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Protected */}
              <LoggedInGuard>
                <>
                  {[
                    ...protectedNav,
                    { name: t("profile"), href: PATH.PROFILE },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm font-medium",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground/60"
                      )}
                      onClick={() => setIsShowNavDrawer(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <AppButton variant="outline" fullWidth onClick={logoutUser}>
                    {t("logout")}
                  </AppButton>
                </>
              </LoggedInGuard>
            </>
          </AppDrawer>
        </div>
      </div>
    </header>
  );
}
