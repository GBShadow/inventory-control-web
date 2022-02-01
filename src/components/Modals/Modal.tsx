import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import { useRouter } from 'next/dist/client/router'

import Button from 'components/Button'

interface ModalProps {
  message: string
  error: boolean
  path: string
}

export interface ModalHandles {
  openModal: () => void
}

const Modal: ForwardRefRenderFunction<ModalHandles, ModalProps> = (
  { message, error, path },
  ref
) => {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  const openModal = useCallback(() => {
    setVisible(true)
  }, [])

  useImperativeHandle(ref, () => {
    return {
      openModal,
    }
  })

  const closeModal = useCallback(() => {
    setVisible(false)
    if (!error) {
      router.replace(path)
    }
  }, [router, error, path])

  if (!visible) {
    return null
  }

  return (
    <div className='c-modal__overlay'>
      <div className='c-modal'>
        <p className='c-modal__message'>{message}</p>
        <Button onClick={closeModal}>{error ? 'Voltar' : 'OK'}</Button>
      </div>
    </div>
  )
}

export default forwardRef(Modal)
