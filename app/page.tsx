"use client";

import { useState } from "react";
import { vehicles } from "@/data/vehicles";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Home() {
  const [vehicleAId, setVehicleAId] = useState("rav4");
  const [vehicleBId, setVehicleBId] = useState("crv");

  const vehicleA = vehicles.find(v => v.id === vehicleAId)!;
  const vehicleB = vehicles.find(v => v.id === vehicleBId)!;

  return (
    <main className="min-h-screen px-6 py-16 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 transition-colors">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight mb-2">Us vs. Them</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">
              Clean, professional vehicle comparison experience.
            </p>
          </div>
          <DarkModeToggle />
        </div>

        {/* Selectors */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <select
            value={vehicleAId}
            onChange={e => setVehicleAId(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white dark:bg-neutral-700 shadow-soft border border-neutral-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          >
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>
                {v.year} {v.make} {v.model}
              </option>
            ))}
          </select>

          <select
            value={vehicleBId}
            onChange={e => setVehicleBId(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white dark:bg-neutral-700 shadow-soft border border-neutral-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          >
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>
                {v.year} {v.make} {v.model}
              </option>
            ))}
          </select>
        </div>

        <ComparisonMatrix vehicleA={vehicleA} vehicleB={vehicleB} />
      </div>
    </main>
  );
}
