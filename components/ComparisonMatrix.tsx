"use client";

import { Vehicle } from "@/types/vehicle";
import { compareValues } from "@/lib/compare";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Props {
  vehicleA: Vehicle;
  vehicleB: Vehicle;
}

export default function ComparisonMatrix({ vehicleA, vehicleB }: Props) {
  const pdfRef = useRef<HTMLDivElement>(null);

  const exportPDF = async () => {
    if (!pdfRef.current) return;
    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${vehicleA.model}-vs-${vehicleB.model}.pdf`);
  };

  const rows = [
    { label: "MSRP", a: vehicleA.price, b: vehicleB.price, higherIsBetter: false, format: (v: number) => `$${v.toLocaleString()}` },
    { label: "City MPG", a: vehicleA.cityMpg, b: vehicleB.cityMpg, higherIsBetter: true, format: (v: number) => `${v} mpg` },
    { label: "Highway MPG", a: vehicleA.highwayMpg, b: vehicleB.highwayMpg, higherIsBetter: true, format: (v: number) => `${v} mpg` },
    { label: "Horsepower", a: vehicleA.horsepower, b: vehicleB.horsepower, higherIsBetter: true, format: (v: number) => `${v} hp` },
    { label: "Cargo Space", a: vehicleA.cargo, b: vehicleB.cargo, higherIsBetter: true, format: (v: number) => `${v} cu ft` },
    { label: "Safety Rating", a: vehicleA.safetyRating, b: vehicleB.safetyRating, higherIsBetter: true, format: (v: number) => `${v}/5` },
  ];

  const totalWinsA = rows.filter(row => compareValues(row.a, row.b, row.higherIsBetter).aResult === "win").length;
  const totalWinsB = rows.filter(row => compareValues(row.a, row.b, row.higherIsBetter).bResult === "win").length;
  let overallWinner: Vehicle | null = null;
  if (totalWinsA > totalWinsB) overallWinner = vehicleA;
  if (totalWinsB > totalWinsA) overallWinner = vehicleB;

  const getClass = (result: string) =>
    result === "win" ? "bg-green-50 text-green-700" :
    result === "lose" ? "text-neutral-400 dark:text-neutral-500" : "";

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence>
        {overallWinner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black dark:bg-white text-white dark:text-black p-4 rounded-2xl text-center mb-6 font-semibold text-lg"
          >
            Overall Advantage: {overallWinner.make} {overallWinner.model}
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={pdfRef} className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl p-10">
        <h2 className="text-2xl font-semibold mb-10 text-center tracking-tight dark:text-neutral-100">
          {vehicleA.make} {vehicleA.model} vs {vehicleB.make} {vehicleB.model}
        </h2>

        <div className="space-y-6">
          {rows.map(row => {
            const result = compareValues(row.a, row.b, row.higherIsBetter);
            return (
              <div key={row.label} className="grid grid-cols-3 items-center py-4 border-b border-neutral-100 dark:border-neutral-700">
                <div className="text-neutral-500 dark:text-neutral-400">{row.label}</div>

                <motion.div
                  className={`text-center text-lg font-medium rounded-xl py-2 ${getClass(result.aResult)}`}
                  key={`a-${row.label}-${row.a}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {row.format(row.a)}
                </motion.div>

                <motion.div
                  className={`text-center text-lg font-medium rounded-xl py-2 ${getClass(result.bResult)}`}
                  key={`b-${row.label}-${row.b}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {row.format(row.b)}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={exportPDF}
          className="px-10 py-4 rounded-2xl bg-black text-white text-lg font-medium hover:opacity-90 transition"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
