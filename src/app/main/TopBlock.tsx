'use client'

import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hooks'
import { selectIsFullAuth } from '@/redux/features/authSlice'

export const TopBlock = () => {
  const isFullAuth = useAppSelector(selectIsFullAuth)
  console.log('isFullAuth', isFullAuth)
  return (
    <div className="container mx-unit-2xl flex justify-center items-center py-20 gap-10">
      <Button
        color={'primary'}
        className="w-56"
        disabled={!isFullAuth}
        variant={'shadow'}
      >
        Go to Race
      </Button>
      <Image src={'/race-car.webp'} alt="race-car" width={800} height={534} />
    </div>
  )
}
