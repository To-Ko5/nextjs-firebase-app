import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../firebase/client'

export const login = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      alert(`${result.user.displayName}さんこんにちは`)
    })
    .catch((e) => console.log(e))
}

export const logout = () => {
  return signOut(auth).then(() => {
    alert('ログアウト')
  })
}
