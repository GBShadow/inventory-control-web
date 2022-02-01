import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import Loading from 'components/Loading'
import Link from 'next/link'
import Image from 'next/image'
import { api } from 'services/apiClient'
import Modal, { ModalHandles } from 'components/Modals/Modal'
// import schema from './schema'

type IUserCreate = {
  name: string
  email: string
  phone: string
  password: string
  password_confirm: string
}

export default function UserCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreate>({
    // resolver: yupResolver(schema)
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
        email: data.email,
        phone: data.phone,
        password: data.password,
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
          name='email'
          label='E-mail'
          placeholder='E-mail'
          register={register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Input
          name='phone'
          label='Telefone / Celular'
          placeholder='Telefone / Celular'
          register={register('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
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
          name='password_confirm'
          label='Confirmar senha'
          placeholder='Confirmar senha'
          password
          register={register('password_confirm')}
          error={!!errors.password_confirm}
          helperText={errors.password_confirm?.message}
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
