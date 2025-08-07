"use client";

import { use } from "react";
import { FurnitureDetails } from "@/components/FurnitureDetails";

interface FurniturePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function FurniturePage({ params }: FurniturePageProps) {
  const resolvedParams = use(params);
  return <FurnitureDetails furnitureId={resolvedParams.id} />;
}
