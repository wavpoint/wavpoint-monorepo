// @ts-nocheck
'use client'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleSheet } from 'react-native'
import { SafeArea } from './safe-area'
import { PortalHost } from '../ui/primitives/portal'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from 'wagmi'
import { config } from '../lib/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    useServerInsertedHTML(() => {
        const sheet = StyleSheet.getSheet()
        return (
            <style
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{ __html: sheet.textContent }}
                id={sheet.id}
            />
        )
    })
    return <SafeArea>
        <PrivyProvider
            appId="clv3z3adf03lx113efeizkdpb"
            config={{
                embeddedWallets: {
                    createOnLogin: 'users-without-wallets',
                },
            }}
        >
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <PortalHost />
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </PrivyProvider>
    </SafeArea>
}