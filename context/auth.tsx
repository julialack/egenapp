import React, { useEffect, useState, createContext, useContext } from 'react'
import { useSegments, useRouter } from 'expo-router'
const AuthContext = createContext<AuthContextValue | null>(null)

//is exported!
export default function AuthProvider({ children }: React.PropsWithChildren) {
  const rootSegment = useSegments()[0] //want the app
  const router = useRouter()
  const [user, setUser] = useState<string | undefined>(undefined)

  useEffect(() => {
    // if (user === undefined) return

    if (!user && rootSegment !== '(auth)/Login') {
      router.replace('/(auth)/Login')
    } else if (user && rootSegment !== '(tabs)/(home)') {
      router.replace('/(tabs)/(home)')
    }
  }, [user, rootSegment])

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signIn: () => {
          setUser('me')
        },
        signOut: () => {
          setUser(undefined)
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

interface AuthContextValue {
  user: string | undefined
  signIn: () => void
  signOut: () => void
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
