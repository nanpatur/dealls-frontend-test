"use client";
import Button from "@/components/atom/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button type="primary" text="Primary" onClick={() => alert("Primary")} />
    </main>
  );
}