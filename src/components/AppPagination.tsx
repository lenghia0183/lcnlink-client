"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { usePathname, useSearchParams } from "next/navigation";

interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

export function AppPagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: AppPaginationProps) {
  const DOTS = "...";

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const generatePages = () => {
    // Tổng số item tối đa có thể hiển thị trong pagination:
    // = số trang anh em bên trái và phải (siblingCount * 2)
    // + trang hiện tại (1)
    // + trang đầu tiên (1) và cuối cùng (1)
    // + 2 dấu "..." bên trái/phải nếu cần
    const totalPageNumbers = siblingCount * 2 + 5;

    // Nếu tổng số trang ít hơn hoặc bằng tổng số item được hiển thị
    // → hiển thị toàn bộ các trang (không cần dấu "...")
    if (totalPageNumbers >= totalPages) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }

    // Tính chỉ số sibling bên trái: không nhỏ hơn 1
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);

    // Tính chỉ số sibling bên phải: không lớn hơn tổng số trang
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Nếu leftSibling > 2 → có khoảng cách giữa trang 1 và leftSibling → cần dấu "..."
    const showLeftDots = leftSiblingIndex > 2;

    // Nếu rightSibling < totalPages - 1 → có khoảng cách giữa rightSibling và trang cuối → cần dấu "..."
    const showRightDots = rightSiblingIndex < totalPages - 1;

    // Mảng chứa các trang hoặc dấu "..."
    const pages: (number | string)[] = [];

    //  Trường hợp 1: Không cần dấu "..." bên trái, nhưng cần bên phải
    // => Trang hiện tại gần đầu danh sách (VD: currentPage = 2)
    if (!showLeftDots && showRightDots) {
      // Hiển thị các trang từ 1 đến (3 + 2 * siblingCount)
      // 3 = currentPage (1) + 2 trang kế bên (2)
      for (let i = 1; i <= 3 + 2 * siblingCount; i++) {
        pages.push(i);
      }
      pages.push(DOTS); // dấu "..." bên phải
      pages.push(totalPages); // trang cuối cùng
    }

    //  Trường hợp 2: Cần dấu "..." bên trái, nhưng không cần bên phải
    // => Trang hiện tại gần cuối danh sách (VD: currentPage = 9/10)
    else if (showLeftDots && !showRightDots) {
      pages.push(1); // trang đầu tiên
      pages.push(DOTS); // dấu "..." bên trái

      // Hiển thị các trang gần cuối: từ (totalPages - (2 * siblingCount + 2)) đến totalPages
      // 2 là để chừa chỗ cho trang đầu và dấu "..."
      for (let i = totalPages - (2 * siblingCount + 2); i <= totalPages; i++) {
        pages.push(i);
      }
    }

    //  Trường hợp 3: Cần dấu "..." cả 2 bên
    else {
      pages.push(1); // trang đầu tiên
      pages.push(DOTS); // dấu "..." bên trái

      // Hiển thị các trang anh em quanh currentPage
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }

      pages.push(DOTS); // dấu "..." bên phải
      pages.push(totalPages); // trang cuối cùng
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageHref(currentPage - 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {pages.map((page, index) =>
          page === DOTS ? (
            <PaginationItem key={`dots-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageHref(Number(page))}
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(Number(page));
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href={createPageHref(currentPage + 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
