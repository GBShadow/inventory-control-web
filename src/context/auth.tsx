import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/apiClient'

type User = {
  name: string
  email: string
}

type SignCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignCredentials): Promise<void>
  signOut(): void
  user: User | undefined
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOutServerSide() {
  destroyCookie(undefined, 'inventory-control.nextauth.token')
  // destroyCookie(undefined, 'inventory-control.nextauth.refreshToken')
  destroyCookie(undefined, 'inventory-control.nextauth.user')

  Router.replace('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'inventory-control.nextauth.user': userCookie } = parseCookies()

    if (userCookie) {
      const userParsed = JSON.parse(userCookie)

      setUser(userParsed)
    }
  }, [])

  function signOut() {
    destroyCookie(undefined, 'inventory-control.nextauth.user')
    destroyCookie(undefined, 'inventory-control.nextauth.token')
    // destroyCookie(undefined, 'inventory-control.nextauth.refreshToken')

    Router.replace('/')
  }

  async function signIn({ email, password }: SignCredentials) {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      })

      const { token, refresh_token, user } = data

      setCookie(undefined, 'inventory-control.nextauth.token', token, {
        maxAge: 60 * 60 * 24,
        path: '/',
      })

      // setCookie(
      //   undefined,
      //   'inventory-control.nextauth.refreshToken',
      //   refresh_token,
      //   {
      //     maxAge: 60 * 60 * 24,
      //     path: '/',
      //   }
      // )

      const userData = {
        name: user.name,
        email: user.email,
      }

      setCookie(
        undefined,
        'inventory-control.nextauth.user',
        JSON.stringify(userData),
        {
          maxAge: 60 * 60 * 24,
          path: '/',
        }
      )

      setUser(userData)

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
    } catch {
      throw new Error()
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}
