/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useCallback, useMemo, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface UseQueryStateOptions {
  prefix?: string;
}

export interface QueryState<TFilters, TQuickFilters> {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  order?: string;
  filters?: TFilters;
  quickFilters?: TQuickFilters;
  keyword?: string;
  tab?: string | undefined;
}

type UpdateQueryPayload<TFilters, TQuickFilters> = Partial<QueryState<TFilters, TQuickFilters>>;

export const useQueryState = <TFilters, TQuickFilters = Record<string, unknown>>(
  initialQuery: Partial<QueryState<TFilters, TQuickFilters>> = { order: 'asc', pageSize: 8 },
  { prefix = '' }: UseQueryStateOptions = {},
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const queryObjRef = useRef<Partial<QueryState<TFilters, TQuickFilters>>>({});

  // console.log('queryObjRef', queryObjRef);

  const initialQueryPrefix = useMemo(() => {
    return Object.fromEntries(
      Object.entries(initialQuery).map(([key, value]) => {
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        return [`${prefix}${key}`, value];
      }),
    );
  }, [initialQuery, prefix]);

  const pf = useMemo(() => prefix.trim(), [prefix]);

  const [$page, $pageSize, $orderBy, $order, $filters, $quickFilters, $keyword, $tab] = useMemo(
    () => [
      `${pf}page`,
      `${pf}limit`,
      `${pf}orderBy`,
      `${pf}order`,
      `${pf}filters`,
      `${pf}quickFilters`,
      `${pf}keyword`,
      `${pf}tab`,
    ],
    [pf],
  );

  const jsonParse = <T>(str: string | null, fallback: T): T => {
    try {
      return str ? JSON.parse(str) : fallback;
    } catch {
      return fallback;
    }
  };

  const queryObj = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());

    const result = { ...initialQueryPrefix, ...params };

    if (!queryObjRef.current || JSON.stringify(result) !== JSON.stringify(queryObjRef.current)) {
      queryObjRef.current = result as Partial<QueryState<TFilters, TQuickFilters>>;
    }

    return queryObjRef.current || {};
  }, [searchParams, initialQueryPrefix, pathname]) as Record<string, unknown>;

  const page = useMemo(() => {
    const pageNumber = Number(queryObj[$page]);
    return isNaN(pageNumber) ? 1 : pageNumber;
  }, [queryObj, $page]);

  const pageSize = useMemo(() => {
    const pageSizeNumber = Number(queryObj[$pageSize]);
    return isNaN(pageSizeNumber) ? 8 : pageSizeNumber;
  }, [queryObj, $pageSize]);

  const filters = useMemo(() => {
    return jsonParse<TFilters>(queryObj[$filters] as string | null, {} as TFilters);
  }, [queryObj, $filters]);

  const quickFilters = useMemo(
    () => jsonParse<Record<string, unknown>>(queryObj[$quickFilters] as string | null, {}),
    [queryObj, $quickFilters],
  );

  const keyword = useMemo(() => String(queryObj[$keyword] || ''), [queryObj, $keyword]);

  const order = useMemo(() => String(queryObj[$order] || ''), [queryObj, $keyword]);

  const orderBy = useMemo(() => String(queryObj[$orderBy] || ''), [queryObj, $keyword]);

  const tab = useMemo(() => String(queryObj[$tab] || initialQueryPrefix?.tab), [queryObj, $tab, initialQueryPrefix]);

  const updateUrl = useCallback(
    (obj: UpdateQueryPayload<TFilters, TQuickFilters> = {}) => {
      const updatedQuery = {
        ...initialQueryPrefix,
        ...queryObj,
        ...obj,
      };

      const searchParams = new URLSearchParams();

      Object.entries(updatedQuery).forEach(([key, value]) => {
        const cleanedValue = deepClean(value);

        if (cleanedValue !== undefined) {
          const valueToSet = typeof cleanedValue === 'object' ? JSON.stringify(cleanedValue) : String(cleanedValue);
          searchParams.set(key, valueToSet);
        } else {
          searchParams.delete(key);
        }
      });
      router.replace(`${pathname}?${searchParams.toString()}`);
    },
    [pathname, queryObj, initialQueryPrefix],
  );

  const deepClean = (data: unknown): unknown => {
    if (Array.isArray(data)) {
      // Lọc bỏ các phần tử rỗng và gọi đệ quy để xử lý phần tử lồng nhau
      const cleanedArray = data.map(deepClean).filter((v) => v !== undefined && v !== null && v !== '');
      return cleanedArray.length > 0 ? cleanedArray : undefined;
    }

    if (typeof data === 'object' && data !== null) {
      // Lọc object để loại bỏ các key có giá trị undefined, null, '', object/mảng rỗng
      const cleanedObject = Object.fromEntries(
        Object.entries(data)
          .map(([key, value]) => [key, deepClean(value)]) // Gọi đệ quy
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, v]) => v !== undefined), // Chỉ giữ lại các giá trị hợp lệ
      );
      return Object.keys(cleanedObject).length > 0 ? cleanedObject : undefined;
    }

    if (data === undefined || data === null || data === '') {
      return undefined;
    }

    return data;
  };

  const setMultiple = useCallback(
    (payload: UpdateQueryPayload<TFilters, TQuickFilters>) => {
      const updatedQuery = {
        ...queryObj,
        ...payload,
      };

      const searchParams = new URLSearchParams();

      Object.entries(updatedQuery).forEach(([key, value]) => {
        const cleanedValue = deepClean(value);

        if (cleanedValue !== undefined) {
          const valueToSet = typeof cleanedValue === 'object' ? JSON.stringify(cleanedValue) : String(cleanedValue);
          searchParams.set(key, valueToSet);
        } else {
          searchParams.delete(key);
        }
      });
      searchParams.set($page, '1');

      router.replace(`${pathname}?${searchParams.toString()}`);
    },
    [queryObj, pathname, router],
  );

  const setPage = useCallback((payload: number) => updateUrl({ [$page]: payload }), [updateUrl, $page]);

  const setPageSize = useCallback(
    (payload: number) => updateUrl({ [$pageSize]: payload, [$page]: 1 }),
    [updateUrl, $pageSize],
  );

  const setOrder = useCallback((payload: string) => updateUrl({ [$order]: payload, [$page]: 1 }), [updateUrl, $order]);

  const setOrderBy = useCallback(
    (payload: string) => updateUrl({ [$orderBy]: payload, [$page]: 1 }),
    [updateUrl, $orderBy],
  );

  const setFilters = useCallback(
    (payload: Partial<TFilters>) => updateUrl({ [$filters]: payload, [$page]: 1 }),
    [updateUrl, $filters],
  );

  const setQuickFilters = useCallback(
    (payload: Partial<TQuickFilters>) => updateUrl({ [$quickFilters]: payload, [$page]: 1 }),
    [updateUrl, $quickFilters],
  );

  const setKeyword = useCallback(
    (payload: string) => {
      updateUrl({ [$keyword]: payload, [$page]: 1 });
    },
    [updateUrl, $keyword],
  );

  const setTab = useCallback((payload: string) => updateUrl({ [$tab]: payload, [$page]: 1 }), [updateUrl, $tab]);

  return {
    page,
    pageSize,
    filters,
    quickFilters,
    keyword,
    tab,
    order,
    orderBy,
    setPage,
    setPageSize,
    setFilters,
    setQuickFilters,
    setKeyword,
    setTab,
    setOrder,
    setOrderBy,
    setMultiple,
  };
};
