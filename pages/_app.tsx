import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthPovider } from '../context/auth'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return <AuthPovider>{getLayout(<Component {...pageProps} />)}</AuthPovider>
}

export default MyApp
