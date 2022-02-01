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
import schema from 'schema/product.schema'
import Close from 'assets/icons/Close'

interface ModalShowProductProps {
  reload: (data: boolean) => void
}

export interface ModalShowProductHandles {
  openModalShowProduct: (id: number) => void
}

const ModalShowProduct: ForwardRefRenderFunction<
  ModalShowProductHandles,
  ModalShowProductProps
> = ({ reload }, ref) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [edit, setEdit] = useState(false)
  const [message, setMessage] = useState('')
  const [productId, setProductId] = useState<number>()

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const openModalShowProduct = useCallback(
    async (id: number) => {
      setVisible(true)

      const { data } = await api.get(`/products/${id}`)
      setProductId(data.id)

      setValue('name', data.name)
      setValue('value', data.value)
      setValue('quantity', data.quantity)
    },
    [setValue]
  )

  useImperativeHandle(ref, () => {
    return {
      openModalShowProduct,
    }
  })

  const handleClose = () => {
    setVisible(false)
    setEdit(false)
  }

  const handleDelete = async () => {
    try {
      setSuccess(false)
      setError(false)
      setLoading(true)

      await api.delete(`/products/${productId}`)

      setSuccess(true)
      setLoading(false)
      setMessage('Produto apagado com sucesso.')

      setTimeout(() => {
        reload(true)
        setEdit(false)
        setVisible(false)
        setSuccess(false)
      }, 2000)
    } catch {
      setMessage('Não foi possível apagar o produto.')
      setError(true)
    }
  }

  const onSubmit = async data => {
    try {
      setSuccess(false)
      setError(false)
      setLoading(true)

      await api.put(`/products/${productId}`, {
        name: data.name,
        value: parseFloat(data.value.replace(',', '.')),
        quantity: Number(data.quantity),
      })

      setSuccess(true)
      setLoading(false)
      setMessage('Produto editado com sucesso.')

      setTimeout(() => {
        reload(true)
        setEdit(false)
        setVisible(false)
        setSuccess(false)
      }, 2000)
    } catch {
      setMessage('Não foi possível editar o produto.')
      setError(true)
      setLoading(false)
    }
  }

  if (!visible) {
    return null
  }

  return (
    <div className='c-modal-show__overlay'>
      <div className='c-modal-show'>
        <button className='c-modal-show__close' onClick={handleClose}>
          <Close />
        </button>
        <h1 className='c-modal-show__title'>
          {!edit ? 'Detalhes do Produto' : 'Editar Produto'}
        </h1>
        <form className='c-modal-show__form' onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='name'
            placeholder='Nome'
            label={!edit && 'Nome'}
            register={register('name', {
              disabled: edit ? false : true,
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Input
            name='value'
            placeholder='Valor'
            label={!edit && 'Valor'}
            register={register('value', {
              disabled: edit ? false : true,
            })}
            error={!!errors.value}
            helperText={errors.value?.message}
          />
          <Input
            name='quantity'
            placeholder='Quantidade'
            label={!edit && 'Quantidade'}
            register={register('quantity', {
              disabled: edit ? false : true,
            })}
            typeNumber
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
          />

          {edit ? (
            loading ? (
              <Loading />
            ) : (
              <Button type='submit' disabled={success}>
                Salvar
              </Button>
            )
          ) : (
            <div className='c-modal-show__button-container'>
              <Button onClick={() => setEdit(true)}>Editar</Button>
              <Button onClick={handleDelete}>Excluir</Button>
            </div>
          )}
        </form>
        {success && <p className='c-modal-show__success'>{message}</p>}
        {error && <p className='c-modal-show__error'>{message}</p>}
      </div>
    </div>
  )
}

export default forwardRef(ModalShowProduct)
