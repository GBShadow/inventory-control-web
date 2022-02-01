import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'
import validateUserPermissions from './validateUserPermissions'

type withSSRAuthOptions = {
  roles: string[]
}

type User = {
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
    const token = cookies['inventory-control.nextauth.token']
    const userCookie = cookies['inventory-control.nextauth.user']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    if (options) {
      const user: User = JSON.parse(userCookie)
      const { roles } = options

      if (!user.roles) {
        return {
          redirect: {
            destination: '/produtos',
            permanent: false,
          },
        }
      }

      const userHasValidPermissions = validateUserPermissions({
        userRoles: user,
        roles,
      })

      if (!userHasValidPermissions) {
        return {
          // notFound: true,
          redirect: {
            destination: '/produtos',
            permanent: false,
          },
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'inventory-control.nextauth.token')
        destroyCookie(ctx, 'inventory-control.nextauth.refreshToken')
        destroyCookie(ctx, 'inventory-control.nextauth.user')

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }
  }
}
