"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { LoginResponse } from "@/types/auth";

import { useRouter } from "@/i18n/routing";
import { PATH } from "@/constants/path";

import { useTranslations } from "next-intl";
import eventEmitter from "@/utils/eventEmitter";
import { EVENT_EMITTER } from "@/constants/common";
import { useGetMe } from "@/services/api/auth.ts";
import { User } from "@/types/user";
import { nextApi } from "@/services/axios";
import { setLocalStorageItem } from "@/utils/localStorage";
import { toast } from "@/components/AppToast";

interface UserContextType {
  userData: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  loginUser: (loginData: LoginResponse | undefined) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  isLoading: true,
  isLoggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
});

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const {
    data,
    isLoading: isLoadingGetMe,
    isValidating: isValidatingGetMe,
    mutate: refreshGetMe,
  } = useGetMe();

  const tCommon = useTranslations("common");
  const router = useRouter();

  const [userData, setUserData] = useState<User | null>(
    initialUser ?? data ?? null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (data) {
      setUserData(data ?? null);
      setIsLoggedIn(true);
    } else {
      setUserData(initialUser ?? null);
      setIsLoggedIn(Boolean(initialUser));
    }
  }, [data, initialUser]);

  const loginUser = (loginData: LoginResponse | undefined) => {
    setLocalStorageItem("user", loginData?.userData);

    if (loginData) {
      setUserData(loginData.userData);
      setIsLoggedIn(true);
    }
    refreshGetMe();
  };

  const logoutUser = async () => {
    localStorage.removeItem("user");

    setUserData(null);
    setIsLoggedIn(false);
    await nextApi.post("/auth/set-cookie", {
      accessToken: "",
      refreshToken: "",
    });
    toast.success(tCommon("logoutSuccessful"));
    router.replace(PATH.LOGIN);
  };

  useEffect(() => {
    eventEmitter.once(EVENT_EMITTER.LOGOUT, () => {
      logoutUser();
    });
    return () => {
      eventEmitter.removeAllListeners(EVENT_EMITTER.LOGOUT);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoggedIn,
        isLoading: initialUser
          ? isValidatingGetMe
          : isLoadingGetMe || isValidatingGetMe,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
