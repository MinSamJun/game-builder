"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";

export function useMhSelectRank(
  selectedRank: string | null,
  setSelectedRank: (rank: string | null) => void,
  options?: {
    showMasterRank?: boolean;
    isFinalOnly?: boolean;
    setIsFinalOnly?: (isFinalOnly: boolean) => void;
  }
) {
  const { getNamespaceData } = useI18n();
  const mhCommonNamespace = getNamespaceData("mh_common");

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() =>
            setSelectedRank(
              selectedRank === "mh_common_low_rank"
                ? null
                : "mh_common_low_rank"
            )
          }
          className={`px-3 py-1 rounded border ${
            selectedRank === "mh_common_low_rank"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {mhCommonNamespace?.mh_common_low_rank ?? "Low Rank"}
        </button>

        <button
          onClick={() =>
            setSelectedRank(
              selectedRank === "mh_common_high_rank"
                ? null
                : "mh_common_high_rank"
            )
          }
          className={`px-3 py-1 rounded border ${
            selectedRank === "mh_common_high_rank"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {mhCommonNamespace?.mh_common_high_rank ?? "High Rank"}
        </button>

        {options?.showMasterRank && (
          <button
            onClick={() =>
              setSelectedRank(
                selectedRank === "mh_common_master_rank"
                  ? null
                  : "mh_common_master_rank"
              )
            }
            className={`px-3 py-1 rounded border ${
              selectedRank === "mh_common_master_rank"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {mhCommonNamespace?.mh_common_master_rank ?? "Master Rank"}
          </button>
        )}
      </div>
      {options?.isFinalOnly !== undefined && options?.setIsFinalOnly && (
        <label
          htmlFor="finalOnlyCheckbox"
          className="flex items-center gap-2 ml-4 text-sm"
        >
          <input
            id="finalOnlyCheckbox"
            type="checkbox"
            checked={options.isFinalOnly}
            onChange={() => {
              if (options.setIsFinalOnly) {
                options.setIsFinalOnly(!options.isFinalOnly);
              }
            }}
          />
          {mhCommonNamespace?.mh_common_final_only ?? "final only"}
        </label>
      )}
    </div>
  );
}
