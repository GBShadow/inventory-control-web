import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import { useAuth } from 'hooks/useAuth'
import Loading from 'components/Loading'
import Logo from 'assets/icons/Logo'
import Link from 'next/link'
import Image from 'next/image'
// import schema from './schema'

type SignCredentials = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignCredentials>({
    // resolver: yupResolver(schema)
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { signIn } = useAuth()

  const onSubmit = async (data: SignCredentials) => {
    try {
      setLoading(true)
      setError(false)
      await signIn(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='c-login' onSubmit={handleSubmit(onSubmit)}>
      <div className='c-login__logo'>
        <Image
          src='/images/logo.png'
          width={300}
          height={72}
          alt='Logo'
          objectFit='contain'
        />
      </div>
      <Input
        name='email'
        label='Login'
        placeholder='Login'
        register={register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
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
      {loading ? (
        <Loading />
      ) : (
        <Button type='submit' disabled={loading}>
          Login
        </Button>
      )}
      <Link href='/usuario/criar'>
        <a className='c-login__link'>Criar usuário</a>
      </Link>
      {error && (
        <p className='l-login__error'>Não foi possível fazer o login.</p>
      )}
    </form>
  )
}
