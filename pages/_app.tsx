import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthPovider } from '../context/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthPovider>
      <Component {...pageProps} />
    </AuthPovider>
  )
}

export default MyApp
