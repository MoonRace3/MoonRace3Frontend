'use client'

import { Button } from '@nextui-org/react'
import React, { FC, useState } from 'react'
import {
  selectIsFullAuth,
  selectIsLoadingAuth,
} from '@/redux/features/authSlice'
import { useAppSelector } from '@/redux/hooks'
import { Skeleton } from '@nextui-org/skeleton'
import { AuthModal } from '@/components/Modals/AuthModal'
import { useAccount } from 'wagmi'

export const AuthButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isLoadingAuth = useAppSelector(selectIsLoadingAuth)
  const isFullAuth = useAppSelector(selectIsFullAuth)

  const { isConnected } = useAccount()

  if (isLoadingAuth) {
    return <Skeleton className="flex rounded-medium w-44 h-10" />
  }

  if (isFullAuth) {
    return null
  }

  return (
    <>
      <Button
        className="hidden md:block"
        color="primary"
        variant={isConnected ? 'flat' : 'ghost'}
        onClick={() => setIsOpen(true)}
      >
        {isConnected ? 'Continue Login' : 'Login'}
      </Button>
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
