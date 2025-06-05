"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the homepage
    router.push("/home");
  }, [router]);

  return null; // Render nothing since it's just a redirect
}