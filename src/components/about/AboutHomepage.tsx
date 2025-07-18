import { NavDisplay } from "@/components/NavDisplay";
import Image from "next/image"

interface AboutHomepageProps {
  pathSegments: string[];
}

export function AboutHomepage({ pathSegments }: AboutHomepageProps) {
  return (
    <div className="w-full">
      <header
        className="w-full bg-cover bg-center bg-no-repeat h-[316px] hidden lg:block"
        style={{ backgroundImage: "url('/images/furniro_shop-hero-bg.svg')" }}
      >
        <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
          <Image
            src="/images/furniro_path-logo.svg"
            alt="Furniro Logo"
            height={77}
            width={77}
          />
          <h1 className="font-medium text-5xl capitalize">
            {pathSegments[pathSegments.length - 1] || "Shop"}
          </h1>
          <NavDisplay pathSegments={pathSegments} />
        </div>
      </header>
    </div>
  );
}
