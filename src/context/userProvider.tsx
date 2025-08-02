'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useGetMe } from '@/services/api/https/user';
import { UserData } from '@/types/user';
import { LoginResponse } from '@/types/auth';
import { setLocalStorageItem } from '@/utils';
import { useGetMyFavorite } from '@/services/api/https/favorite';
import { useGetMyCart } from '@/services/api/https/cart';
import { useRouter } from '@/i18n/routing';
import { PATH } from '@/constants/path';
import { nextApi } from '@/services/api/axios';
import { useToast } from './toastProvider';
import { useTranslations } from 'next-intl';
import eventEmitter from '@/utils/eventEmitter';
import { EVENT_EMITTER } from '@/constants/common';

interface UserContextType {
  userData: UserData | null;
  isLoading: boolean;
  userFavoritesCount: number;
  userCartTotalMoney: number;
  loginUser: (loginData: LoginResponse | undefined) => void;
  logoutUser: () => void;
  refreshUserFavorites: () => void;
  refreshUserCart: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  isLoading: true,
  userFavoritesCount: 0,
  userCartTotalMoney: 0,
  loginUser: () => {},
  logoutUser: () => {},
  refreshUserFavorites: () => {},
  refreshUserCart: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading: isLoadingGetMe, isValidating: isValidatingGetMe, mutate: refreshGetMe } = useGetMe();
  const { data: userFavoriteData, mutate: refreshUserFavorites } = useGetMyFavorite({ page: 1, limit: 50 });
  const { data: userCartData, mutate: refreshUserCart } = useGetMyCart();

  const { success } = useToast();
  const tCommon = useTranslations('common');

  const router = useRouter();

  const [userData, setUserData] = useState<UserData | null>(data ?? null);
  const [userFavoritesCount, setUserFavoritesCount] = useState<number>(0);
  const [userCartTotalMoney, setUserCartTotalMoney] = useState<number>(0);

  useEffect(() => {
    setUserData(data ?? null);
  }, [data]);

  useEffect(() => {
    if (userFavoriteData?.data) {
      setUserFavoritesCount(userFavoriteData.data.totalResult || 0);
    }
  }, [userFavoriteData]);

  useEffect(() => {
    if (userCartData?.data) {
      setUserCartTotalMoney(userCartData.data.cartTotalMoney || 0);
    }
  }, [userCartData]);

  const loginUser = (loginData: LoginResponse | undefined) => {
    setLocalStorageItem('user', loginData?.user);
    setLocalStorageItem('accessToken', loginData?.accessToken);
    setLocalStorageItem('refreshToken', loginData?.refreshToken);

    if (loginData?.user) {
      setUserData(loginData.user);
    }
    refreshUserFavorites();
    refreshGetMe();
  };

  const logoutUser = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setUserFavoritesCount(0);
    setUserCartTotalMoney(0);
    setUserData(null);
    nextApi.post('/auth/set-cookie', {
      accessToken: '',
      refreshToken: '',
    });
    success(tCommon('logoutSuccessful'));
    router.replace(PATH.LOGIN);
  };

  useEffect(() => {
    eventEmitter.once(EVENT_EMITTER.LOGOUT, () => {
      logoutUser();
    });
    return () => {
      eventEmitter.removeAllListeners(EVENT_EMITTER.LOGOUT);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading: isLoadingGetMe || isValidatingGetMe,
        userFavoritesCount,
        userCartTotalMoney,
        refreshUserFavorites,
        refreshUserCart,
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
