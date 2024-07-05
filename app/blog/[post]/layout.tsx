import { NavBar } from "@/components/NavBar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <div className="prose">
    {children}
  </div>
}