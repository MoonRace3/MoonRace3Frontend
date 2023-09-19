'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ReactNode, useState } from 'react'
import { WagmiConfig } from 'wagmi'
import { chains, wagmiConfig, walletConnectProjectId } from '@/configs/wagmi'
import { EthereumClient } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/redux/store'
import { AuthProvider } from './AuthProvider'

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <NextUIProvider>
      <main className="light text-foreground bg-background">
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <>
                <WagmiConfig config={wagmiConfig}>
                  <AuthProvider>{children}</AuthProvider>
                </WagmiConfig>
                <Web3Modal
                  projectId={walletConnectProjectId}
                  ethereumClient={ethereumClient}
                />
              </>
            </SnackbarProvider>
          </QueryClientProvider>
        </ReduxProvider>
      </main>
    </NextUIProvider>
  )
}
