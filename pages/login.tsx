import { ReactElement } from 'react'
import Button from '../components/common/button'
import Layout from '../components/common/layout'
import { login } from '../lib/auth'
import { NextPageWithLayout } from './_app'

const LoginPage: NextPageWithLayout = () => {
  return (
    <div className="container">
      <h1 className="mb-4 text-xl">LOGIN</h1>
      <Button type="button" onClick={login}>
        ログイン
      </Button>
    </div>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default LoginPage
