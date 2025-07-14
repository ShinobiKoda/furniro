import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface NavDisplayProps {
  pathSegments: string[];
}

export function NavDisplay({ pathSegments }: NavDisplayProps) {
  const fullPathSegments = ["home", ...pathSegments];

  return (
    <p className="flex flex-row gap-4 text-base">
      {fullPathSegments.map((segment, index) => (
        <span key={index} className="flex items-center gap-2">
          <Link href={`/${fullPathSegments.slice(0, index + 1).join("/")}`}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </Link>
          {index < fullPathSegments.length - 1 && <ArrowRight size={19} />}
        </span>
      ))}
    </p>
  );
}
