"use client";

import React from "react";
import { useSimulator } from "@/hook/use-simulator";
import { WeaponCardList } from "@/components/mh-wilds/simulator/weapon-card-list";

export function SimulatorContainer() {
  return (
    <div className="p-4 space-y-6">
      <WeaponCardList />
    </div>
  );
}
