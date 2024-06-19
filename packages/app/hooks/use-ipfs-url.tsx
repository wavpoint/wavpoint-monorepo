import { ipfsToUrl } from "@wavpoint/utils";
import { useMemo } from "react";

export function useIpfsUrl(ipfsUrl?: string | null) {
	return useMemo(() => ipfsToUrl(ipfsUrl), [ipfsUrl]);
}
