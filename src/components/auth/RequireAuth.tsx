import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/auth'
import type { AccountType } from '@/lib/api'
import { homeForRole } from '@/lib/session'

type RequireAuthProps = {
  /** Roles autorizados; si se omite, basta con tener la sesión activa. */
  roles?: AccountType[]
  children?: ReactNode
}

/**
 * Guardia de las rutas privadas del panel: exige una sesión activa y, cuando
 * se indican roles, que el rol del usuario esté autorizado. Sin sesión
 * redirige a /login; con un rol no autorizado redirige al panel propio.
 */
export function RequireAuth({ roles, children }: RequireAuthProps) {
  const { isAuthenticated, session } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || !session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (roles && roles.length > 0 && !roles.includes(session.role)) {
    return <Navigate to={homeForRole(session.role)} replace />
  }

  return children ? <>{children}</> : <Outlet />
}
