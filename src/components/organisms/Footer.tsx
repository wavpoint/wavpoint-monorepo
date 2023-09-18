import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className="font-dm-sans flex flex-col md:flex-row gap-6 items-center justify-between border-t p-6">
      <div className="flex-1">
        <Image src="/logo_full.png" alt="Logo" width={88} height={24} />
      </div>
      <p className="font-sans text-sm text-[#888888] flex-1 text-center">
        &copy; Copyright {new Date().getFullYear()} Wavpoint, Inc.
      </p>
      <ul className="font-sans text-[#222222] text-sm flex gap-4 flex-1 justify-end">
        <li>Twitter</li>
        <li>
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="4" fill="#E5E5E5" />
          </svg>
        </li>
        <li>FAQ</li>
        <li>
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="4" fill="#E5E5E5" />
          </svg>
        </li>
        <li>Deploy Drop</li>
      </ul>
    </div>
  );
}
