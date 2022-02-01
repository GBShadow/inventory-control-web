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
import schema from 'schema/user-update.schema'
import Close from 'assets/icons/Close'

type ModalEditUserProps = {
  reload: (data: boolean) => void
}

export type ModalEditUserHandles = {
  openModalEditUser: (id: number) => void
}

const ModalEditUser: ForwardRefRenderFunction<
  ModalEditUserHandles,
  ModalEditUserProps
> = ({ reload }, ref) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [userId, setUserId] = useState<number>()

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const openModalEditUser = useCallback(
    async (id: number) => {
      setVisible(true)

      const { data } = await api.get(`/users/${id}`)
      setUserId(data.id)

      setValue('name', data.name)
      setValue('surname', data.surname)
      setValue('username', data.username)
    },
    [setValue]
  )

  useImperativeHandle(ref, () => {
    return {
      openModalEditUser,
    }
  })

  const onSubmit = async data => {
    try {
      setSuccess(false)
      setError(false)
      setLoading(true)

      await api.put(`/users/${userId}`, {
        name: data.name,
        surname: data.surname,
        username: data.username,
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
        <h1 className='c-modal-edit__title'>Editar Usuário</h1>
        <form className='c-modal-edit__form' onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='name'
            label='Nome'
            placeholder='Nome'
            register={register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Input
            name='surname'
            label='Sobrenome'
            placeholder='Sobrenome'
            register={register('surname')}
            error={!!errors.surname}
            helperText={errors.surname?.message}
          />
          <Input
            name='username'
            label='Username'
            placeholder='Username'
            register={register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
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
          <p className='c-modal-edit__success'>Usuário editado com sucesso.</p>
        )}
        {error && (
          <p className='c-modal-edit__error'>
            Não foi possível editar o usuário.
          </p>
        )}
      </div>
    </div>
  )
}

export default forwardRef(ModalEditUser)
