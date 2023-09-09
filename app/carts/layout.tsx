import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dealls Shop - Carts",
  description: "Dealls Shop - Carts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
