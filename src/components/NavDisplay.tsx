import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

interface NavDisplayProps {
  pathSegments: string[];
}

export function NavDisplay({ pathSegments }: NavDisplayProps) {
  const getRouteForSegment = (segment: string) => {
    const normalizedSegment = segment.toLowerCase();
    switch (normalizedSegment) {
      case "home":
        return "/";
      case "shop":
        return "/shop";
      case "about":
        return "/about";
      case "contact":
        return "/contact";
      case "blog":
        return "/blog";
      case "cart":
        return "/cart";
      case "checkout":
        return "/checkout";
      default:
        return null; 
    }
  };

  return (
    <p className="flex flex-row gap-4 text-base">
      <span className="flex items-center gap-2">
        <Link href="/">Home</Link>
        <MdOutlineKeyboardArrowRight size={20} />
      </span>
      {pathSegments.map((segment, index) => (
        <span key={index} className="flex items-center gap-2">
          {index === pathSegments.length - 1 || !getRouteForSegment(segment) ? (
            <span className="text-gray-600">
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </span>
          ) : (
            <Link href={getRouteForSegment(segment)!}>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Link>
          )}
          {index < pathSegments.length - 1 && (
            <MdOutlineKeyboardArrowRight size={20} />
          )}
        </span>
      ))}
    </p>
  );
}
