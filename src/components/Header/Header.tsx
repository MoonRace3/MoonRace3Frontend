'use client'

import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import Image from 'next/image'
import { FC } from 'react'
import { selectIsFullAuth } from '@/redux/features/authSlice'
import { useAppSelector } from '@/redux/hooks'
import { AuthButton } from '@/components/Buttons/AuthButton'
import { AvatarUser } from '@/components/Avatars/AvatarUser'

const Header: FC = () => {
  const isFullAuth = useAppSelector(selectIsFullAuth)

  return (
    <>
      <Navbar shouldHideOnScroll className="shadow" maxWidth={'2xl'}>
        <NavbarBrand>
          <div className="flex items-center space-x-4">
            <Image
              className="relative"
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              priority
            />
            <h1 className="text-2xl font-bold">MoonRace3</h1>
          </div>
        </NavbarBrand>
        <NavbarContent justify="end">
          <div className={`flex space-x-4 items-center`}>
            {isFullAuth ? <AvatarUser /> : <AuthButton />}
          </div>
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default Header
