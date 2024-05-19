import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatAddress(address?: string): string {
	if (address?.startsWith("0x")) {
		const start = address.slice(0, 2);
		const end = address.slice(-4);

		return `${start}...${end}`;
	}
	return address ?? "";
}

export function ipfsToUrl(ipfsAddress?: string | null): string {
	return ipfsAddress?.replace("ipfs://", "https://ipfs.io/ipfs/") ?? "";
}
