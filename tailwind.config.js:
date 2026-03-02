import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Us vs. Them — Vehicle Comparison",
  description: "Premium vehicle comparison tool built with Next.js + TypeScript",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50`}>
        {children}
      </body>
    </html>
  );
}
