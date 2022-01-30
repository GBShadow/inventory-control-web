import { AuthProvider } from 'context/auth'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
