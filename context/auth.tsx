import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  onAuthStateChanged,
  Unsubscribe,
  User as FirebaseUser
} from 'firebase/auth'
import { auth, db } from '../firebase/client'
import { User } from '../types/user'
import { doc, onSnapshot } from 'firebase/firestore'

type ContextType = {
  firebaseUser: FirebaseUser | null | undefined
  isLoading: boolean
  user: User | null | undefined
}

const AuthContext = createContext<ContextType>({
  firebaseUser: undefined,
  isLoading: true,
  user: undefined
})

export const AuthPovider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>()
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    let unSubscribe: Unsubscribe

    onAuthStateChanged(auth, (result) => {
      unSubscribe?.()
      setFirebaseUser(result)

      // ユーザー情報を監視して取得
      if (result) {
        setIsLoading(true)
        const ref = doc(db, `users/${result.uid}`)
        unSubscribe = onSnapshot(ref, (snap) => {
          console.log(snap.data())
          setUser(snap.data() as User)
          setIsLoading(false)
        })
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        isLoading,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
