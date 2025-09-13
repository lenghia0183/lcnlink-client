"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Link2,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
} from "lucide-react";
import { PATH } from "@/constants/path";
import LoggedInGuard from "./Guard/LoggedinGuard";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Link2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">LcnLink</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">{t("description")}</p>
            <div className="flex space-x-4">
              <Link
                target="_blank"
                href="https://github.com/lenghia0183"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                target="_blank"
                href="https://www.facebook.com/nghia.cong.le.2024"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/nghia-le-366628384/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={PATH.HOME}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href={PATH.ABOUT}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <LoggedInGuard>
                <li>
                  <Link
                    href={PATH.DASHBOARD}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t("dashboard")}
                  </Link>
                </li>
              </LoggedInGuard>
              <li>
                <Link
                  href={PATH.PRICING}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href={PATH.CONTACT}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>lenghia0183@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+84 369067607</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Liên Phương, Thường Tín, Hà Nội</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ShortLink. {t("allRightsReserved")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("termsOfService")}
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("cookiePolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
