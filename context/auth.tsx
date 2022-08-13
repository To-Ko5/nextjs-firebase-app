import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase/client'

type ContextType = {
  firebaseUser: User | null | undefined
  isLoading: boolean
}

const AuthContext = createContext<ContextType>({
  firebaseUser: undefined,
  isLoading: true
})

export const AuthPovider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user)
      setIsLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
