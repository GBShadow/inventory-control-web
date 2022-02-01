import { AuthProvider } from 'context/auth'
import { MenuProvider } from 'context/sidebar'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MenuProvider>
        <Component {...pageProps} />
      </MenuProvider>
    </AuthProvider>
  )
}

export default MyApp
