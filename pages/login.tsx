import type { NextPage } from 'next'
import Button from '../components/common/Button'

const LoginPage: NextPage = () => {
  return (
    <>
      <h1>LOGIN</h1>
      <Button
        type="button"
        onClick={() => {
          alert()
        }}
      >
        ログイン
      </Button>
    </>
  )
}

export default LoginPage
