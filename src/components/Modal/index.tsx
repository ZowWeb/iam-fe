import type React from 'react'
import { Modal as MantineModal } from '@mantine/core'

type ModalProps = {
  opened: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ opened, onClose, children }: ModalProps) {
  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      styles={{ body: { padding: '3rem' }, root: { width: '500px' } }}
      size="lg"
    >
      {children}
    </MantineModal>
  )
}
