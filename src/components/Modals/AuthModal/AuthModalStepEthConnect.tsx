import { FC } from 'react'
import { useAccount, useSignMessage, useSwitchNetwork } from 'wagmi'
import { Button } from '@nextui-org/react'
import { useSnackbar } from 'notistack'
import { useMutation } from '@tanstack/react-query'
import { generateNonce, SiweMessage } from 'siwe'
import { getMe, login } from '@/services/api/user'
import { localStorageKeys } from '@/constants/localStorageKeys'
import { setAuthToken } from '@/services/api/api'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectValidChainId, setIsFullAuth } from '@/redux/features/authSlice'
import { useIsValidChainId } from '@/hooks/useIsValidChainId'
import { polygon } from 'wagmi/chains'

interface Props {
  onClose: () => void
}

export const AuthModalStepEthConnect: FC<Props> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar()

  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const [isValidChainId] = useIsValidChainId()

  const validChainId = useAppSelector(selectValidChainId)

  const {
    isLoading: isLoadingSwitchNetwork,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork()

  const dispatch = useAppDispatch()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      if (!address || !validChainId) return

      const nonce = generateNonce()

      const domain =
        'siwe-next-auth-example2.vercel.app' || window.location.host
      const uri =
        'https://siwe-next-auth-example2.vercel.app' || window.location.origin

      const message = new SiweMessage({
        domain,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri,
        version: '1',
        chainId: validChainId,
        nonce: nonce,
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      const { token } = await login({
        message,
        signature,
      })

      window.localStorage.setItem(localStorageKeys.token, token)
      await setAuthToken(token)

      return await getMe()
    },
    onSuccess: async () => {
      dispatch(setIsFullAuth(true))
      onClose()
    },
    onError: (e: any) => {
      let errorMessage = 'An error occurred'

      if (e?.response?.data?.desc) {
        errorMessage = e.response.data.desc
      }
      enqueueSnackbar(`Error, ${errorMessage}`, { variant: 'error' })
    },
  })

  if (!isValidChainId) {
    return (
      <Button
        color="primary"
        isLoading={isLoadingSwitchNetwork}
        onClick={() => switchNetwork && switchNetwork(validChainId)}
      >
        Switch to: {polygon.name}
        {isLoadingSwitchNetwork &&
          validChainId === pendingChainId &&
          ' (switching)'}
      </Button>
    )
  }

  return (
    <Button
      color="primary"
      isLoading={isLoading}
      onClick={async () => {
        await mutateAsync()
      }}
    >
      Sign-In
    </Button>
  )
}
