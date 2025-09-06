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
import { useEffect, useState } from "react";

export default function Header() {
  const [isShowNavDrawer, setIsShowNavDrawer] = useState(false);
  const [navigation, setNavigation] = useState<
    { name: string; href: string }[]
  >([]);

  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const { isLoggedIn, logoutUser } = useUser();
  const baseNav = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("dashboard"), href: "/dashboard" },
    { name: t("analytics"), href: "/analytics" },
    { name: t("pricing"), href: "/pricing" },
  ];

  // Profile navigation for logged in users
  const profileNav = { name: t("profile"), href: "/profile" };

  useEffect(() => {
    const currentNav = [...baseNav];
    
    if (isLoggedIn) {
      // Add profile link for logged in users
      currentNav.push(profileNav);
    } else {
      currentNav.push({ name: t("login"), href: "/login" });
      currentNav.push({ name: t("register"), href: "/register" });
    }

    setNavigation(currentNav);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, t]);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
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
              {baseNav.map((item) => (
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
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {!isLoggedIn ? (
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
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <ProfileDropdown />
              </div>
            )}
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
              {navigation.map((item) => (
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
              {isLoggedIn && (
                <AppButton variant="outline" fullWidth onClick={logoutUser}>
                  {t("logout")}
                </AppButton>
              )}
            </>
          </AppDrawer>
        </div>
      </div>
    </header>
  );
}
