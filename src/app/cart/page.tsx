"use client";

import { Cart } from "@/components/Cart";
import { usePathname } from "next/navigation";

export default function CartPage() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);


  return <Cart pathSegments={pathSegments}/>;
}
