"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SunIcon,
  MoonIcon,
  GlobeIcon,
  LogInIcon,
  UserPlusIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

// shadcn components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import LanguageSwitcher from "./LanguageSwitcher";
import { ModeToggle } from "./ModeToggle";
import Logo from "./Logo";

const NAV = [
  { title: "Home", href: "/" },
  {
    title: "Features",
    href: "/#features",
    subItems: [
      {
        title: "Tùy chỉnh Link",
        href: "/features/custom-links",
        description: "Tạo link ngắn với tên tùy chỉnh",
      },
      {
        title: "Mã QR",
        href: "/features/qr-code",
        description: "Tạo mã QR cho link ngắn",
      },
      {
        title: "Link Hết Hạn",
        href: "/features/expiring-links",
        description: "Đặt thời gian hết hạn cho link",
      },
    ],
  },
  {
    title: "Pricing",
    href: "/pricing",
    subItems: [
      {
        title: "Gói Miễn Phí",
        href: "/pricing/free",
        description: "Tính năng cơ bản miễn phí",
      },
      {
        title: "Gói Pro",
        href: "/pricing/pro",
        description: "Tính năng nâng cao cho cá nhân",
      },
      {
        title: "Gói Doanh Nghiệp",
        href: "/pricing/enterprise",
        description: "Giải pháp cho doanh nghiệp",
      },
    ],
  },
  { title: "My Links", href: "/my-links" },
  {
    title: "Support",
    href: "/support",
    subItems: [
      {
        title: "Liên Hệ",
        href: "/support/contact",
        description: "Gửi yêu cầu hỗ trợ",
      },
      {
        title: "Cộng Đồng",
        href: "/support/community",
        description: "Tham gia cộng đồng người dùng",
      },
      {
        title: "Trạng Thái Dịch Vụ",
        href: "/support/status",
        description: "Kiểm tra trạng thái dịch vụ",
      },
    ],
  },
];

export default function Header() {
  const pathname = usePathname?.() || "/";
  const [openMobile, setOpenMobile] = React.useState(false);

  const [session, setSession] = React.useState<{
    name: string;
    avatar?: string;
  } | null>(() => null);

  function handleSignIn() {
    setSession({ name: "Người Dùng", avatar: "" });
  }

  function handleSignOut() {
    setSession(null);
  }

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />

            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {NAV.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      {item.subItems ? (
                        <>
                          <NavigationMenuTrigger
                            className={`${
                              pathname.startsWith(item.href)
                                ? "text-primary"
                                : "text-foreground/80 hover:text-foreground"
                            }`}
                          >
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              {item.subItems.map((subItem) => (
                                <li key={subItem.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={subItem.href}
                                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                      <div className="text-sm font-medium leading-none">
                                        {subItem.title}
                                      </div>
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={`px-3 py-2 rounded-md text-sm font-medium no-underline ${
                              pathname === item.href
                                ? "text-primary"
                                : "text-foreground/80 hover:text-foreground"
                            }`}
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>

            {/* Auth actions */}
            {!session ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignIn}
                  className="hidden sm:inline-flex"
                >
                  <LogInIcon className="mr-2 h-4 w-4" /> Đăng nhập
                </Button>
                <Link href="/register">
                  <Button size="sm" className="hidden sm:inline-flex">
                    <UserPlusIcon className="mr-2 h-4 w-4" /> Đăng ký
                  </Button>
                </Link>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center gap-2 rounded-md p-0.5">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={session.avatar || undefined}
                        alt={session.name}
                      />
                      <AvatarFallback>
                        {session.name?.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu toggle */}
            <button
              className="inline-flex items-center justify-center rounded-md p-2 lg:hidden"
              onClick={() => setOpenMobile((s) => !s)}
              aria-label="Open menu"
            >
              {openMobile ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {openMobile && (
        <div className="lg:hidden border-t bg-background">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2">
              {NAV.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-foreground/80"
                    }`}
                  >
                    {item.title}
                  </Link>
                  {item.subItems && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`px-3 py-2 rounded-md text-sm ${
                            pathname === subItem.href
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <div className="flex justify-center gap-3">
                  <LanguageSwitcher />
                  <ModeToggle />
                </div>

                <div className="flex gap-2">
                  {!session ? (
                    <>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={handleSignIn}
                      >
                        <LogInIcon className="mr-2 h-4 w-4" /> Đăng nhập
                      </Button>
                      <Link href="/register" className="flex-1">
                        <Button size="sm" className="w-full">
                          <UserPlusIcon className="mr-2 h-4 w-4" /> Đăng ký
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/profile" className="flex-1">
                        <Button className="w-full">Profile</Button>
                      </Link>
                      <Button
                        className="flex-1"
                        onClick={handleSignOut}
                        variant="destructive"
                      >
                        Log out
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
