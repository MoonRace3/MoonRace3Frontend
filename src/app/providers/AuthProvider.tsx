'use client'

import { ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { cacheKeys } from '@/constants/cacheKeys'
import { localStorageKeys } from '@/constants/localStorageKeys'
import { setAuthToken } from '@/services/api/api'
import { getMe } from '@/services/api/user'
import { useAppDispatch } from '@/redux/hooks'
import { setIsFullAuth, setIsLoading } from '@/redux/features/authSlice'

export function AuthProvider({ children }: { children: ReactNode }) {
  const { address, isConnecting, isConnected } = useAccount()
  const dispatch = useAppDispatch()

  const { data, isError } = useQuery({
    queryKey: [cacheKeys.auth, isConnecting, isConnected, address],
    queryFn: async () => {
      const lsToken = window.localStorage.getItem(localStorageKeys.token)

      if (isConnecting || !isConnected || !lsToken) {
        dispatch(setIsLoading(false))
        window.localStorage.removeItem(localStorageKeys.token)
        throw new Error('Not connected')
      }

      try {
        await setAuthToken(lsToken)
        const data = await getMe()

        dispatch(setIsLoading(false))
        dispatch(setIsFullAuth(true))

        return data
      } catch (e) {
        dispatch(setIsFullAuth(false))
        dispatch(setIsLoading(false))
        throw new Error('Not connected')
      }
    },
    enabled: !isConnecting,
  })

  return children
}
