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
import schema from 'schema/user-create.schema'
import Close from 'assets/icons/Close'

type ModalCreateUserProps = {
  reload: (data: boolean) => void
}

export type ModalCreateUserHandles = {
  openModalCreateUser: () => void
}

const ModalCreateUser: ForwardRefRenderFunction<
  ModalCreateUserHandles,
  ModalCreateUserProps
> = ({ reload }, ref) => {
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

  const openModalCreateUser = useCallback(() => {
    setVisible(true)
  }, [])

  useImperativeHandle(ref, () => {
    return {
      openModalCreateUser,
    }
  })

  const onSubmit = async data => {
    try {
      setSuccess(false)
      setError(false)
      setLoading(true)

      await api.post('/users', {
        name: data.name,
        surname: data.surname,
        username: data.username,
        password: data.password,
        roles: ['USER'],
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
    <div className='c-modal-create__overlay'>
      <div className='c-modal-create'>
        <button
          className='c-modal-create__close'
          onClick={() => setVisible(false)}
        >
          <Close />
        </button>
        <h1 className='c-modal-create__title'>Criar Usuário</h1>
        <form
          className='c-modal-create__form'
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <Input
            name='password'
            label='Senha'
            placeholder='Senha'
            password
            register={register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Input
            name='confirm_password'
            label='Confirmação da senha'
            placeholder='Confirmação da senha'
            password
            register={register('confirm_password')}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
          />
          {loading ? (
            <Loading />
          ) : (
            <Button type='submit' disabled={success}>
              Criar
            </Button>
          )}
        </form>
        {success && (
          <p className='c-modal-create__success'>Usuário criado com sucesso.</p>
        )}
        {error && (
          <p className='c-modal-create__error'>
            Não foi possível criar o usuário.
          </p>
        )}
      </div>
    </div>
  )
}

export default forwardRef(ModalCreateUser)
