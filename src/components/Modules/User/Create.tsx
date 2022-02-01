import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import Loading from 'components/Loading'
import Link from 'next/link'
import { api } from 'services/apiClient'
import Modal, { ModalHandles } from 'components/Modals/Modal'
import schema from 'schema/user-create.schema'

type IUserCreate = {
  name: string
  surname: string
  username: string
  password: string
  confirm_password: string
}

export default function UserCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreate>({
    resolver: yupResolver(schema),
  })

  const modalRef = useRef<ModalHandles>(null)

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const onSubmit = async (data: IUserCreate) => {
    try {
      setLoading(true)
      setError(false)

      await api.post('/users', {
        name: data.name,
        surname: data.surname,
        username: data.username,
        password: data.password,
        roles: ['USER'],
      })
      setMessage('Usuário criado com sucesso! Você já pode fazer o login.')
      setError(false)

      modalRef.current?.openModal()
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form className='c-create-user' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='c-create-user__title'>Criação de usuário</h1>
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
          <Button type='submit' disabled={loading}>
            Criar
          </Button>
        )}
        <Link href='/'>
          <a className='c-create-user__link'>Voltar</a>
        </Link>
        {error && (
          <p className='c-create-user__error'>
            Não foi possível criar o usuário.
          </p>
        )}
      </form>
      <Modal ref={modalRef} error={error} message={message} path='/' />
    </>
  )
}
