"use client";

import React from "react";
import { WeaponCardList } from "@/container/mh-wilds/simulator/weapon-card-list";

export function SimulatorContainer() {
  return (
    <div className="p-4 space-y-6">
      <WeaponCardList />
    </div>
  );
}
