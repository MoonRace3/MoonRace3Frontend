'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Avatar,
  Button,
} from '@nextui-org/react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectIsFullAuth, setIsFullAuth } from '@/redux/features/authSlice'
import { useRouter } from 'next/navigation'
import { useAccount, useDisconnect } from 'wagmi'
import { transformTextToWithDots } from '@/utils/transformTextToWithDots'

export const AvatarUser = () => {
  const isFullAuth = useAppSelector(selectIsFullAuth)

  const dispatch = useAppDispatch()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const router = useRouter()

  const onDisconnect = async () => {
    window.localStorage.removeItem('token')
    dispatch(setIsFullAuth(false))
    router.push('/')
    disconnect()
  }

  if (!isFullAuth) {
    return null
  }

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Avatar name={'User'} className={'cursor-pointer'} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">
            {transformTextToWithDots(address)}
          </div>
          <Button
            className={'mt-2'}
            onClick={onDisconnect}
            color={'danger'}
            variant={'ghost'}
          >
            Disconnect
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
