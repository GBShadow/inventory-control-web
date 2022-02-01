import axios from 'axios'
import { parseCookies } from 'nookies'

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies['inventory-control.nextauth.token']}`,
    },
  })

  return api
}
