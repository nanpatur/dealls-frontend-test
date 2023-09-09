import Sidebar from "@/components/molecules/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dealls Shop - Products",
  description: "Dealls Shop - Products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="p-10 h-full w-full overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
