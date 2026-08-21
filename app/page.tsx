import type { Metadata } from "next";
import { FloatingCanvas } from "@/components/homepage/FloatingCanvas";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <FloatingCanvas />;
}
