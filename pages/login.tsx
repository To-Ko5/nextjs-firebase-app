import type { NextPage } from 'next'
import { login, logout } from '../lib/auth'
import Button from '../components/common/button'

const LoginPage: NextPage = () => {
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

export default LoginPage
