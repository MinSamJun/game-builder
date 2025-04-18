"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SideBar } from "@container/common/side-bar";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const shouldShowSidebar = segments.length >= 2;

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex">
      {shouldShowSidebar && isSidebarOpen && (
        <div className="w-96 h-screen bg-white shadow-lg shrink-0 relative z-51">
          <SideBar toggleSidebar={toggleSidebar} />
        </div>
      )}

      <main className="flex-1 p-4 overflow-x-hidden relative">
        {shouldShowSidebar && !isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed top-2 left-2 z-50 px-2 py-1 text-sm text-white bg-gray-800 hover:bg-[var(--background)] rounded text-black"
          >
            ▶
          </button>
        )}
        {children}
      </main>
    </div>
  );
}
