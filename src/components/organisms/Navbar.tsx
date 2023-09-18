import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-6 sticky top-0 bg-white z-10">
      <Image src="/logo.png" alt="Logo" width={74} height={46} />
      <div>
        <Button
          variant="outline"
          className="rounded-full border border-[#FF6700]"
        >
          <span className="text-sm font-sans">Connect</span>
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="4" fill="#FF6700" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
