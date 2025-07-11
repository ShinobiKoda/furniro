"use client";
import Image from "next/image";
import { FurnitureDetails } from "@/types/type";

export function FurnitureCard({ furniture }: { furniture: FurnitureDetails }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Image
          src={furniture.image_url}
          alt={furniture.name}
          width={300}
          height={200}
        />
        {furniture.discount_percent && (
          <span>{furniture.discount_percent}</span>
        )}
        <p>
          <span>{furniture.name}</span>
          <span>{furniture.description}</span>
        </p>
        <p>
          <span>{furniture.price}</span>
          {furniture.discount_price && <span>{furniture.discount_price}</span>}
        </p>
      </div>
    </div>
  );
}
