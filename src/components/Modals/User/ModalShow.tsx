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

type ModalShowUserProps = {
  reload: (data: boolean) => void
}

export type ModalShowUserHandles = {
  openModalShowUser: (id: number) => void
}

const ModalShowUser: ForwardRefRenderFunction<
  ModalShowUserHandles,
  ModalShowUserProps
> = ({ reload }, ref) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [edit, setEdit] = useState(false)
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState<number>()

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const openModalShowUser = useCallback(
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
      openModalShowUser,
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

      await api.delete(`/users/${userId}`)

      setSuccess(true)
      setLoading(false)
      setMessage('Usuário apagado com sucesso.')

      setTimeout(() => {
        reload(true)
        setEdit(false)
        setVisible(false)
        setSuccess(false)
      }, 2000)
    } catch {
      setMessage('Não foi possível apagar o usuário.')
      setError(true)
    }
  }

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
      setMessage('Produto editado com sucesso.')

      setTimeout(() => {
        reload(true)
        setEdit(false)
        setVisible(false)
        setSuccess(false)
      }, 2000)
    } catch {
      setMessage('Não foi possível editar o usuário.')
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
          {!edit ? 'Detalhes do Usuário' : 'Editar Usuário'}
        </h1>
        <form className='c-modal-show__form' onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='name'
            label='Nome'
            placeholder='Nome'
            register={register('name', {
              disabled: !edit ? true : false,
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Input
            name='surname'
            label='Sobrenome'
            placeholder='Sobrenome'
            register={register('surname', {
              disabled: !edit ? true : false,
            })}
            error={!!errors.surname}
            helperText={errors.surname?.message}
          />
          <Input
            name='username'
            label='Username'
            placeholder='Username'
            register={register('username', {
              disabled: !edit ? true : false,
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
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

export default forwardRef(ModalShowUser)
