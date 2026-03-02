"use client";

import { Vehicle } from "@/types/vehicle";
import { compareValues } from "@/lib/compare";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Props {
  vehicleA: Vehicle;
  vehicleB: Vehicle;
}

export default function ComparisonMatrix({
  vehicleA,
  vehicleB,
}: Props) {
  const pdfRef = useRef<HTMLDivElement>(null);

  const exportPDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(
      `${vehicleA.model}-vs-${vehicleB.model}.pdf`
    );
  };

  const rows = [
    {
      label: "MSRP",
      a: vehicleA.price,
      b: vehicleB.price,
      higherIsBetter: false,
      formatter: (val: number) =>
        `$${val.toLocaleString()}`
    },
    {
      label: "City MPG",
      a: vehicleA.cityMpg,
      b: vehicleB.cityMpg,
      higherIsBetter: true,
      formatter: (val: number) => `${val} mpg`
    },
    {
      label: "Highway MPG",
      a: vehicleA.highwayMpg,
      b: vehicleB.highwayMpg,
      higherIsBetter: true,
      formatter: (val: number) => `${val} mpg`
    },
    {
      label: "Horsepower",
      a: vehicleA.horsepower,
      b: vehicleB.horsepower,
      higherIsBetter: true,
      formatter: (val: number) => `${val} hp`
    },
    {
      label: "Cargo Space",
      a: vehicleA.cargo,
      b: vehicleB.cargo,
      higherIsBetter: true,
      formatter: (val: number) => `${val} cu ft`
    },
    {
      label: "Safety Rating",
      a: vehicleA.safetyRating,
      b: vehicleB.safetyRating,
      higherIsBetter: true,
      formatter: (val: number) => `${val}/5`
    }
  ];

  const getClass = (result: string) => {
    if (result === "win")
      return "bg-green-100 text-green-800 font-semibold";
    if (result === "lose")
      return "bg-red-50 text-red-600";
    return "";
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        ref={pdfRef}
        className="bg-white shadow-2xl rounded-2xl p-8 border"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {vehicleA.year} {vehicleA.make} {vehicleA.model} vs{" "}
          {vehicleB.year} {vehicleB.make} {vehicleB.model}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3"></th>
                <th className="text-left py-3 font-semibold">
                  {vehicleA.make} {vehicleA.model}
                </th>
                <th className="text-left py-3 font-semibold">
                  {vehicleB.make} {vehicleB.model}
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const result = compareValues(
                  row.a,
                  row.b,
                  row.higherIsBetter
                );

                return (
                  <tr
                    key={row.label}
                    className="border-t"
                  >
                    <td className="py-4 font-medium">
                      {row.label}
                    </td>

                    <td
                      className={`py-4 px-2 rounded-lg ${getClass(
                        result.aResult
                      )}`}
                    >
                      {row.formatter(row.a)}
                    </td>

                    <td
                      className={`py-4 px-2 rounded-lg ${getClass(
                        result.bResult
                      )}`}
                    >
                      {row.formatter(row.b)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={exportPDF}
          className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition duration-200"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}
