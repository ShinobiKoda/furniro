"use client"
import { AboutHomepage } from "@/components/about/AboutHomepage";
import { usePathname } from "next/navigation";


export default function About(){
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);


  return <AboutHomepage pathSegments={pathSegments} />;
}