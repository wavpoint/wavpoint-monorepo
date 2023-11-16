import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { useAccount } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { isConnected } = useAccount();
  const { setShowAuthFlow, handleLogOut } = useDynamicContext();

  return (
    <div className="flex items-center justify-between p-6 sticky top-0 bg-transparent z-10">
      <Image src="/logo.png" alt="Logo" width={74} height={46} />
      {!isConnected ? (
        <div>
          <Button
            variant="outline"
            className="rounded-full border border-[#FF6700]"
          >
            <span className="text-sm" onClick={() => setShowAuthFlow(true)}>
              Connect
            </span>
            <svg height="20" width="20">
              <circle cx="10" cy="10" r="4" fill="#FF6700" />
            </svg>
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-5 mt-2 w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleLogOut()}
              className="cursor-pointer text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
