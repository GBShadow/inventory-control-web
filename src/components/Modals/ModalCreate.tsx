import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'components/Button'
import Input from 'components/Input'
import Loading from 'components/Loading'
import { api } from 'services/apiClient'
import schema from 'schema/create-product.schema'
import Close from 'assets/icons/Close'

interface ModalCreateProps {}

export interface ModalCreateHandles {
  openModalCreate: () => void
}

const ModalCreate: ForwardRefRenderFunction<
  ModalCreateHandles,
  ModalCreateProps
> = ({}, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const openModalCreate = useCallback(() => {
    setVisible(true)
  }, [])

  useImperativeHandle(ref, () => {
    return {
      openModalCreate,
    }
  })

  const onSubmit = async data => {
    try {
      setSuccess(false)
      setError(false)
      setLoading(true)

      await api.post('/products', {
        name: data.name,
        value: parseFloat(data.value),
        quantity: Number(data.quantity),
      })

      setLoading(false)

      setTimeout(() => {
        setVisible(false)
        setSuccess(false)
      }, 2000)
    } catch {
      setError(true)
    }
  }

  if (!visible) {
    return null
  }

  return (
    <div className='c-modal-create__overlay'>
      <div className='c-modal-create'>
        <button
          className='c-modal-create__close'
          onClick={() => setVisible(false)}
        >
          <Close />
        </button>
        <h1 className='c-modal-create__title'>Criar Produto</h1>
        <form
          className='c-modal-create__form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            name='name'
            placeholder='Nome'
            register={register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Input
            name='value'
            placeholder='Valor'
            register={register('value')}
            error={!!errors.value}
            helperText={errors.value?.message}
          />
          <Input
            name='quantity'
            placeholder='Quantidade'
            register={register('quantity')}
            typeNumber
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
          />
          {loading ? <Loading /> : <Button type='submit'>Criar</Button>}
        </form>
        {success && (
          <p className='c-modal-create__success'>Produto criado com sucesso.</p>
        )}
        {error && (
          <p className='c-modal-create__error'>
            Não foi possível criar o produto.
          </p>
        )}
      </div>
    </div>
  )
}

export default forwardRef(ModalCreate)
