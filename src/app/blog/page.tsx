"use client";

import { Blog } from "@/components/Blog";
import { usePathname } from "next/navigation";

export default function Contact() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);


  return <Blog pathSegments={pathSegments}/>;
}
