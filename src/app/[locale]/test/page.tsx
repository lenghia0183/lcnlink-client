"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryState } from "@/hooks/useQueryState";

interface Filters {
  name?: string;
  category?: string;
}

interface QuickFilters {
  status?: "active" | "inactive";
}

export default function TestPage() {
  // ===== Form A Input State =====
  const [inputNameA, setInputNameA] = useState("");
  const [inputCategoryA, setInputCategoryA] = useState("");
  const [inputKeywordA, setInputKeywordA] = useState("");
  const [inputOrderA, setInputOrderA] = useState<"asc" | "desc">("asc");

  const {
    page: pageA,
    pageSize: pageSizeA,
    filters: filtersA,
    keyword: keywordA,
    order: orderA,
    setPage: setPageA,
    setPageSize: setPageSizeA,
    setFilters: setFiltersA,
    setKeyword: setKeywordA,
    setOrder: setOrderA,
  } = useQueryState<Filters, QuickFilters>(
    {
      pageSize: 5,
      order: "asc",
    },
    { prefix: "a_" }
  );

  // ===== Form B Input State =====
  const [inputNameB, setInputNameB] = useState("");
  const [inputCategoryB, setInputCategoryB] = useState("");
  const [inputKeywordB, setInputKeywordB] = useState("");
  const [inputOrderB, setInputOrderB] = useState<"asc" | "desc">("asc");

  const {
    page: pageB,
    pageSize: pageSizeB,
    filters: filtersB,
    keyword: keywordB,
    order: orderB,
    setPage: setPageB,
    setPageSize: setPageSizeB,
    setFilters: setFiltersB,
    setKeyword: setKeywordB,
    setOrder: setOrderB,
  } = useQueryState<Filters, QuickFilters>(
    {
      pageSize: 3,
      order: "desc",
    },
    { prefix: "b_" }
  );

  // ===== Handlers for A =====
  const handleApplyA = () => {
    setFiltersA({ name: inputNameA, category: inputCategoryA });
    setKeywordA(inputKeywordA);
    setOrderA(inputOrderA);
    setPageA(1);
  };

  const handleResetA = () => {
    setFiltersA({});
    setKeywordA("");
    setOrderA("asc");
    setPageA(1);
    setInputNameA("");
    setInputCategoryA("");
    setInputKeywordA("");
    setInputOrderA("asc");
  };

  // ===== Handlers for B =====
  const handleApplyB = () => {
    setFiltersB({ name: inputNameB, category: inputCategoryB });
    setKeywordB(inputKeywordB);
    setOrderB(inputOrderB);
    setPageB(1);
  };

  const handleResetB = () => {
    setFiltersB({});
    setKeywordB("");
    setOrderB("desc");
    setPageB(1);
    setInputNameB("");
    setInputCategoryB("");
    setInputKeywordB("");
    setInputOrderB("desc");
  };

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-2xl font-bold">Test Page with Two Query States</h1>

      {/* ----------- Form A ------------ */}
      <div className="space-y-4 border p-6 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold">Form A (prefix: a_)</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Input
            placeholder="Filter by Name"
            value={inputNameA}
            onChange={(e) => setInputNameA(e.target.value)}
          />
          <Input
            placeholder="Filter by Category"
            value={inputCategoryA}
            onChange={(e) => setInputCategoryA(e.target.value)}
          />
          <Input
            placeholder="Keyword"
            value={inputKeywordA}
            onChange={(e) => setInputKeywordA(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={inputOrderA}
            onChange={(e) => setInputOrderA(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Sort Asc</option>
            <option value="desc">Sort Desc</option>
          </select>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleApplyA}>Apply A</Button>
          <Button variant="outline" onClick={handleResetA}>
            Reset A
          </Button>
        </div>

        <div className="text-sm bg-white p-4 rounded border">
          <strong>Query A:</strong>
          <pre>
            {JSON.stringify(
              { pageA, pageSizeA, filtersA, keywordA, orderA },
              null,
              2
            )}
          </pre>
        </div>
      </div>

      {/* ----------- Form B ------------ */}
      <div className="space-y-4 border p-6 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold">Form B (prefix: b_)</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Input
            placeholder="Filter by Name"
            value={inputNameB}
            onChange={(e) => setInputNameB(e.target.value)}
          />
          <Input
            placeholder="Filter by Category"
            value={inputCategoryB}
            onChange={(e) => setInputCategoryB(e.target.value)}
          />
          <Input
            placeholder="Keyword"
            value={inputKeywordB}
            onChange={(e) => setInputKeywordB(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={inputOrderB}
            onChange={(e) => setInputOrderB(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Sort Asc</option>
            <option value="desc">Sort Desc</option>
          </select>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleApplyB}>Apply B</Button>
          <Button variant="outline" onClick={handleResetB}>
            Reset B
          </Button>
        </div>

        <div className="text-sm bg-white p-4 rounded border">
          <strong>Query B:</strong>
          <pre>
            {JSON.stringify(
              { pageB, pageSizeB, filtersB, keywordB, orderB },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
