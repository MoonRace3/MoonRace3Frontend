import { FC } from 'react'
import { useWeb3Modal } from '@web3modal/react'
import { useConnect } from 'wagmi'
import { Button } from '@nextui-org/react'

interface Props {}

export const AuthModalStepConnect: FC<Props> = ({}) => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { open } = useWeb3Modal()

  const injectConnector = connectors.find((c) => c.id === 'injected')

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          color={'primary'}
          disabled={!injectConnector?.ready}
          onClick={() => connect({ connector: injectConnector })}
        >
          {injectConnector?.name}
          {isLoading &&
            pendingConnector?.id === injectConnector?.id &&
            ' (connecting)'}
        </Button>
        <Button color={'primary'} onClick={() => open()}>
          Wallet Connect
        </Button>
      </div>
    </>
  )
}
