import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/client'

type ContextType = {
  isLoggedIn: boolean
  isLoading: boolean
}

const AuthContext = createContext<ContextType>({
  isLoggedIn: false,
  isLoading: true
})

export const AuthPovider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user)
      setIsLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
