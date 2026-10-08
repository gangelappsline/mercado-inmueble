import { createContext, useContext } from 'react'
import type { AuthSession } from '@/lib/session'

export type AuthContextValue = {
  session: AuthSession | null
  isAuthenticated: boolean
  login: (session: AuthSession) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

/** Estado de autenticación compartido por toda la aplicación. */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>.')
  }
  return context
}
