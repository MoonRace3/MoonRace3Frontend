'use client'

import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { generateNonce, SiweMessage } from 'siwe'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { Button } from '@nextui-org/react'
import { getMe, login } from '@/services/api/user'
import { setAuthToken } from '@/services/api/api'
import { localStorageKeys } from '@/constants/localStorageKeys'

export const SignInButton = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      const chainId = chain?.id
      if (!address || !chainId) return

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
        chainId,
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

      const data = await getMe()
    },
    onSuccess: async () => {
      enqueueSnackbar('Success', { variant: 'success' })
    },
    onError: (e: any) => {
      let errorMessage = 'An error occurred'

      if (e?.response?.data?.desc) {
        errorMessage = e.response.data.desc
      }
      enqueueSnackbar(`Error, ${errorMessage}`, { variant: 'error' })
    },
  })

  return (
    <Button
      color="primary"
      isLoading={isLoading}
      onClick={async () => {
        await mutateAsync()
      }}
    >
      Sign-In with Ethereum
    </Button>
  )
}
