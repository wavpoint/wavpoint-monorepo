import { http, createConfig } from 'wagmi';
import { zora } from 'wagmi/chains';

export const config = createConfig({
	chains: [zora],
	transports: {
		[zora.id]: http(),
	},
});

declare module 'wagmi' {
	interface Register {
		config: typeof config;
	}
}
