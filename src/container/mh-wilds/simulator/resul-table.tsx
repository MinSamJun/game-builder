import React from "react";
import { ArmorSet } from "@/types/mh-wilds/armor-set";

export function ResultTable({ results }: { results: ArmorSet[] }) {
  return (
    <table className="table-auto w-full border">
      <thead>
        <tr>
          <th>Head</th>
          <th>Chest</th>
          <th>Arms</th>
          <th>Waist</th>
          <th>Legs</th>
          <th>Charm</th>
        </tr>
      </thead>
      <tbody>
        {results.map((set, idx) => (
          <tr key={idx}>
            <td>{set.head.name}</td>
            <td>{set.chest.name}</td>
            <td>{set.arms.name}</td>
            <td>{set.waist.name}</td>
            <td>{set.legs.name}</td>
            <td>{set.charm?.name ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
