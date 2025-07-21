"use client";
import { IoBagAddOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

export function CartModal() {
  return (
    <div className="bg-white top-0 right-0 absolute w-[417px] h-[746px] py-4 px-2">
      <h2 className="flex items-center justify-between w-full">
        <span className="font-semibold text-2xl border-b pb-8">
          Shopping Cart
        </span>
        <IoBagAddOutline />
      </h2>

      <div className="flex items-center w-full justify-between">
        <div className="w-[108px] h-[105px] rounded-lg">
          <Image
            src="/images/furniro_furniture-setup-3.webp"
            alt="Furniture Image"
            width={100}
            height={100}
            className="w-full h-full overflow-hidden"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="space-y-4">
            <p>Asgaard Sofa</p>
            <p className="flex items-center gap-2">
              <span>1x</span>
              <span>₦40,000</span>
            </p>
          </div>
        </div>

        <MdCancel className="bg-[#9F9F9F]" />
      </div>
    </div>
  );
}
