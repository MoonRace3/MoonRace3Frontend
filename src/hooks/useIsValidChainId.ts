import { useMemo } from 'react'
import { useNetwork } from 'wagmi'
import { useAppSelector } from '@/redux/hooks'
import { selectValidChainId } from '@/redux/features/authSlice'

export const useIsValidChainId = () => {
  const { chain } = useNetwork()
  const validChainId = useAppSelector(selectValidChainId)

  const isValidChainId = useMemo(() => {
    if (!validChainId) {
      return false
    }

    return chain?.id === validChainId
  }, [chain, validChainId])

  return [isValidChainId]
}
