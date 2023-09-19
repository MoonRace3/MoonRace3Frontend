'use client'

import { Button, Chip } from '@nextui-org/react'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hooks'
import { selectIsFullAuth } from '@/redux/features/authSlice'
import Link from 'next/link'

export const TopBlock = () => {
  const isFullAuth = useAppSelector(selectIsFullAuth)

  return (
    <div className="container mx-unit-2xl flex justify-center items-center py-20 gap-10">
      {isFullAuth ? (
        <Link href={'/race'}>
          <Chip size="lg" radius={'sm'} color={'primary'}>
            Go to Race
          </Chip>
        </Link>
      ) : (
        <Chip size="lg" radius={'sm'} color={'primary'} isDisabled>
          Go to Race
        </Chip>
      )}
      <Image src={'/race-car.webp'} alt="race-car" width={800} height={534} />
    </div>
  )
}
