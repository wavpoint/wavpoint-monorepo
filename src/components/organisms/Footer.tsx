import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className="font-dm-sans flex flex-col md:flex-row gap-6 items-center justify-between border-t p-6">
      <Image src="/logo_full.svg" alt="Logo" width={88} height={24} />
      <p className="font-sans text-sm text-[#888888]">
        &copy; Copyright {new Date().getFullYear()} Wavepoint, Inc.
      </p>
      <ul className="font-sans text-[#222222] text-sm flex gap-4">
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
