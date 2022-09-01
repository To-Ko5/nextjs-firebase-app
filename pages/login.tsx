import { ReactElement } from 'react'
import Button from '../components/common/button'
import Layout from '../components/common/layout'
import { login, logout } from '../lib/auth'
import { NextPageWithLayout } from './_app'

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
