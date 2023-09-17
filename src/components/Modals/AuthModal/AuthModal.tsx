import { FC, useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import { useAccount, useConnect } from 'wagmi'
import { AuthModalStepConnect } from './AuthModalStepConnect'
import { AuthModalStepEthConnect } from '@/components/Modals/AuthModal/AuthModalStepEthConnect'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const AuthModal: FC<Props> = ({ isOpen, onClose }) => {
  const { isConnected } = useAccount()

  return (
    <Modal size={'sm'} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isConnected ? 'Sign-in with Ethereum' : 'Connect'}
            </ModalHeader>
            <ModalBody className="pb-5">
              <>
                {!isConnected && <AuthModalStepConnect />}
                {isConnected && <AuthModalStepEthConnect onClose={onClose} />}
              </>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
