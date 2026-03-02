"use client";

import { useState } from "react";
import { vehicles } from "@/data/vehicles";
import ComparisonMatrix from "@/components/ComparisonMatrix";

export default function Home() {
  const [vehicleAId, setVehicleAId] = useState<string>("rav4");
  const [vehicleBId, setVehicleBId] = useState<string>("crv");

  const vehicleA = vehicles.find((v) => v.id === vehicleAId)!;
  const vehicleB = vehicles.find((v) => v.id === vehicleBId)!;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Us vs. Them Comparison Tool
      </h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <select
          value={vehicleAId}
          onChange={(e) => setVehicleAId(e.target.value)}
          className="p-3 rounded-xl border"
        >
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.year} {v.make} {v.model}
            </option>
          ))}
        </select>

        <select
          value={vehicleBId}
          onChange={(e) => setVehicleBId(e.target.value)}
          className="p-3 rounded-xl border"
        >
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.year} {v.make} {v.model}
            </option>
          ))}
        </select>
      </div>

      <ComparisonMatrix vehicleA={vehicleA} vehicleB={vehicleB} />
    </main>
  );
}
