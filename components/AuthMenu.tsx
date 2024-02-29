'use client'

import { useCallback, useState } from 'react'
import { MdLogin } from 'react-icons/md'
import Modal from './Modal'

export default function AuthMenu() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleModal = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  return (
    <div>
      <span
        className="flex rounded-full mx-auto p-1 cursor-pointer hover:opacity-50 hover:shadow-md"
        onClick={handleModal}
      >
        <MdLogin size={24} />
      </span>
      <Modal
        open={openModal}
        onClose={handleModal}
        subtitle=""
      >
        breve isso estará disponível
      </Modal>
    </div>
  )
}
