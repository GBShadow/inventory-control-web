import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import decode from 'jwt-decode'
import { destroyCookie, parseCookies } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'
import validateUserPermissions from './validateUserPermissions'

type withSSRAuthOptions = {
  roles: string[]
}

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: withSSRAuthOptions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['doesangue.nextauth.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    if (options) {
      const userRoles = decode<{ roles: string[] }>(token)
      const { roles } = options

      if (!userRoles) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }

      const userHasValidPermissions = validateUserPermissions({
        userRoles,
        roles
      })

      if (!userHasValidPermissions) {
        return {
          // notFound: true,
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'doesangue.nextauth.token')
        destroyCookie(ctx, 'doesangue.nextauth.refreshToken')
        destroyCookie(ctx, 'doesangue.nextauth.user')

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}
