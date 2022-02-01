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

interface ModalShowProps {
  reload: (data: boolean) => void
}

export interface ModalShowHandles {
  openModalShow: (id: number) => void
}

const ModalShow: ForwardRefRenderFunction<ModalShowHandles, ModalShowProps> = (
  { reload },
  ref
) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [edit, setEdit] = useState(false)
  const [productId, setProductId] = useState<number>()

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const openModalShow = useCallback(
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
      openModalShow,
    }
  })

  const handleClose = () => {
    setVisible(false)
    setEdit(false)
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

      setTimeout(() => {
        reload(true)
        setEdit(false)
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
              <Button type='submit' onClick={() => setEdit(true)}>
                Editar
              </Button>
              <Button type='submit' onClick={() => {}}>
                Excluir
              </Button>
            </div>
          )}
        </form>
        {success && (
          <p className='c-modal-show__success'>Produto editado com sucesso.</p>
        )}
        {error && (
          <p className='c-modal-show__error'>
            Não foi possível editar o produto.
          </p>
        )}
      </div>
    </div>
  )
}

export default forwardRef(ModalShow)
