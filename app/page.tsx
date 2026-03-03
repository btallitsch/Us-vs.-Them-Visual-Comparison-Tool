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
    <main className="container">
      <div className="header">
        <h1>Us vs. Them</h1>
        <DarkModeToggle />
      </div>

      <div className="select-row">
        <select value={vehicleAId} onChange={e => setVehicleAId(e.target.value)}>
          {vehicles.map(v => <option key={v.id} value={v.id}>{v.year} {v.make} {v.model}</option>)}
        </select>

        <select value={vehicleBId} onChange={e => setVehicleBId(e.target.value)}>
          {vehicles.map(v => <option key={v.id} value={v.id}>{v.year} {v.make} {v.model}</option>)}
        </select>
      </div>

      <ComparisonMatrix vehicleA={vehicleA} vehicleB={vehicleB} />
    </main>
  );
}
