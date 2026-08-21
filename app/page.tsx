import type { Metadata } from "next";
import { Workbench } from "@/components/workbench/Workbench";
import "@/components/workbench/workbench.css";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <Workbench />;
}
