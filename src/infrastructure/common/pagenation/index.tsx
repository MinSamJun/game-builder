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

  const buttonClass = (disabled: boolean) =>
    `px-4 py-2 rounded text-white ${
      disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600"
    }`;

  return (
    <div className="flex justify-center mt-4 gap-4">
      <button
        onClick={onPrev}
        className={buttonClass(currentPage === 1)}
        disabled={currentPage === 1}
      >
        {commonNamespace?.common_prev_page}
      </button>
      <button
        onClick={onNext}
        className={buttonClass(currentPage === totalPages)}
        disabled={currentPage === totalPages}
      >
        {commonNamespace?.common_next_page}
      </button>
    </div>
  );
}
