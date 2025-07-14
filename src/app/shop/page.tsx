"use client";

import { ShopHomepage } from "@/components/shop/ShopHomepage";
import { usePathname } from "next/navigation";

export default function Shop() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return <ShopHomepage pathSegments={pathSegments} />;
}
