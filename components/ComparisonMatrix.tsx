"use client";

import { Vehicle } from "@/types/vehicle";
import { useRef } from "react";
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

    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${vehicleA.model}-vs-${vehicleB.model}.pdf`);
  };

  return (
    <div>
      <div
        ref={pdfRef}
        className="bg-white shadow-xl rounded-2xl p-6 border"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {vehicleA.year} {vehicleA.make} {vehicleA.model} vs {vehicleB.year} {vehicleB.make} {vehicleB.model}
        </h2>

        <table className="w-full text-left border-collapse">
          <tbody>
            {[
              { label: "MSRP", a: vehicleA.price, b: vehicleB.price },
              { label: "Fuel Economy", a: vehicleA.mpg, b: vehicleB.mpg },
              { label: "Horsepower", a: vehicleA.horsepower, b: vehicleB.horsepower },
              { label: "Cargo Space", a: vehicleA.cargo, b: vehicleB.cargo },
              { label: "Safety Rating", a: vehicleA.safety, b: vehicleB.safety },
            ].map((row) => (
              <tr key={row.label} className="border-t">
                <td className="py-3 font-semibold">{row.label}</td>
                <td className="py-3">{row.a}</td>
                <td className="py-3">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={exportPDF}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}
