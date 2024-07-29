export * from "./config";
export * from "./interfaces";
export * from "./schemas";
export * from "./supabase-types";

export function formatAddress(address?: string): string {
	if (address?.startsWith("0x")) {
		const start = address.slice(0, 2);
		const end = address.slice(-5);

		return `${start}...${end}`;
	}
	return address ?? "";
}

export function ipfsToUrl(ipfsAddress?: string | null): string {
	return (
		ipfsAddress?.replace(
			"ipfs://",
			"https://magic.decentralized-content.com/ipfs/",
		) ?? ""
	);
}

export function ethToSparks(eth: number): number {
	return eth * 1000000;
}

export function formatTime(ms?: number): string {
	return ms ? new Date(ms * 1000).toISOString().substring(14, 19) : "00:00";
}
