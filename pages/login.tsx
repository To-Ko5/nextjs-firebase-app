import { login, logout } from '../lib/auth'
import Button from '../components/common/button'
import { NextPageWithLayout } from './_app'
import { ReactElement } from 'react'
import Layout from '../components/common/layout'

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>LOGIN</h1>
      <Button type="button" onClick={login}>
        ログイン
      </Button>

      <Button type="button" onClick={logout}>
        ログアウト
      </Button>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default LoginPage
