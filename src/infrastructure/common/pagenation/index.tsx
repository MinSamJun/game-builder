"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPrev,
  onNext,
}: {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { getNamespaceData } = useI18n();
  const commonNamespace = getNamespaceData("common");

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4 gap-4">
      <button
        onClick={onPrev}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={currentPage === 1}
      >
        {commonNamespace?.common_prev_page}
      </button>
      <button
        onClick={onNext}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={currentPage === totalPages}
      >
        {commonNamespace?.common_next_page}
      </button>
    </div>
  );
}
