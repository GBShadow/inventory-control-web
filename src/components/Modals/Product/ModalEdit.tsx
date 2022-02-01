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

type ModalEditProductProps = {
  reload: (data: boolean) => void
}

export type ModalEditProductHandles = {
  openModalEditProduct: (id: number) => void
}

const ModalEditProduct: ForwardRefRenderFunction<
  ModalEditProductHandles,
  ModalEditProductProps
> = ({ reload }, ref) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [productId, setProductId] = useState<number>()

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const openModalEditProduct = useCallback(
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
      openModalEditProduct,
    }
  })

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
        setSuccess(false)
        setVisible(false)
      }, 2000)
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  if (!visible) {
    return null
  }

  return (
    <div className='c-modal-edit__overlay'>
      <div className='c-modal-edit'>
        <button
          className='c-modal-edit__close'
          onClick={() => setVisible(false)}
        >
          <Close />
        </button>
        <h1 className='c-modal-edit__title'>Editar Produto</h1>
        <form className='c-modal-edit__form' onSubmit={handleSubmit(onSubmit)}>
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
          {loading ? (
            <Loading />
          ) : (
            <Button type='submit' disabled={success}>
              Salvar
            </Button>
          )}
        </form>
        {success && (
          <p className='c-modal-edit__success'>Produto editado com sucesso.</p>
        )}
        {error && (
          <p className='c-modal-edit__error'>
            Não foi possível editar o produto.
          </p>
        )}
      </div>
    </div>
  )
}

export default forwardRef(ModalEditProduct)
