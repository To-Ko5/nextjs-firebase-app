import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase/client'
import type { NextPage } from 'next'
import Button from '../components/common/button'

const LoginPage: NextPage = () => {
  const login = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((result) => {
      alert(`${result.user.displayName}さんこんにちは`)
    })
  }
  return (
    <>
      <h1>LOGIN</h1>
      <Button type="button" onClick={() => login()}>
        ログイン
      </Button>
    </>
  )
}

export default LoginPage
