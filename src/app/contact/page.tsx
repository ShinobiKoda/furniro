"use client";

import { ContactPage } from "@/components/contact/contact-page";
import { usePathname } from "next/navigation";

export default function Contact() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);


  return <ContactPage pathSegments={pathSegments}/>;
}
