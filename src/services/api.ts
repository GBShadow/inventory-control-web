import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOutServerSide } from '../context/auth'
import { AuthTokenError } from './errors/AuthTokenError'

let isRefreshing = false
let failedRequestQueue = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies['inventory-control.nextauth.token']}`,
    },
  })

  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx)

          const { 'inventory-control.nextauth.refreshToken': refreshToken } =
            cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true
            api
              .post('/refresh-token', {
                refresh_token: refreshToken,
              })
              .then(response => {
                const { refresh_token, token } = response.data

                console.log({ refresh_token, token })

                setCookie(ctx, 'inventory-control.nextauth.token', token, {
                  maxAge: 60 * 60 * 24,
                  path: '/',
                })

                setCookie(
                  ctx,
                  'inventory-control.nextauth.refreshToken',
                  refresh_token,
                  {
                    maxAge: 60 * 60 * 24,
                    path: '/',
                  }
                )

                api.defaults.headers['Authorization'] = `Bearer ${token}`

                failedRequestQueue.forEach(request => request.onSuccess(token))
                failedRequestQueue = []
              })
              .catch(err => {
                failedRequestQueue.forEach(request => request.onFailure(err))
                failedRequestQueue = []

                if (process.browser) {
                  signOutServerSide()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          if (process.browser) {
            signOutServerSide()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    }
  )
  return api
}
