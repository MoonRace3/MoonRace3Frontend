import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { polygon, mainnet, polygonMumbai, bsc } from 'wagmi/chains'

export const walletConnectProjectId = '3d3257880fc1fbcd27b63f90d22f8b14'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, mainnet, polygonMumbai, bsc],
  [w3mProvider({ projectId: walletConnectProjectId })]
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
  }),
  publicClient,
  webSocketPublicClient,
})

export { chains }
