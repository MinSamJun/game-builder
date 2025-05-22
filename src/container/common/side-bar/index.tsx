"use client";

import React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { SideBarContent } from "./content";

export const SideBar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const encodedSideBarSlug = searchParams.get("side-bar-slug");
  const sideBarSlug = encodedSideBarSlug
    ? decodeURIComponent(encodedSideBarSlug)
    : pathname.startsWith("/mh-wilds")
    ? "mh-wilds"
    : null;

  if (!sideBarSlug) return null;

  return (
    <div className="fixed left-0 top-0 h-full w-96 overflow-y-auto p-4 bg-gray-700 text-white">
      <SideBarContent slug={sideBarSlug} toggleSidebar={toggleSidebar} />
    </div>
  );
};
