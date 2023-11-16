import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GeistSans } from "geist/font/sans";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
// import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
// import { publicProvider } from "wagmi/providers/public";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

// const { publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   [publicProvider()]
// );

// const config = createConfig({
//   publicClient,
//   webSocketPublicClient,
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <WagmiConfig config={config}>
      <DynamicContextProvider
        settings={{
          environmentId: "f0b977d0-b712-49f1-af89-2a24c47674da",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <DynamicWagmiConnector>
          <main className={GeistSans.className}>
            <Component {...pageProps} />
          </main>
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    // </WagmiConfig>
  );
}
