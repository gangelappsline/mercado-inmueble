import type { AccountType } from '@/lib/api'

/**
 * Utilidades de sesión: persistencia en localStorage y la ruta de inicio
 * que corresponde a cada rol de usuario.
 */

export type AuthSession = {
  token: string
  name: string
  email: string
  role: AccountType
}

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

type StoredUser = {
  name?: string
  email?: string
  role?: { value?: AccountType }
}

/** Lee la sesión guardada; devuelve null si no hay una sesión válida. */
export function readSession(): AuthSession | null {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const rawUser = localStorage.getItem(USER_KEY)
    if (!token || !rawUser) return null

    const user = JSON.parse(rawUser) as StoredUser
    const role = user.role?.value
    if (!user.email || !role) return null

    return {
      token,
      name: user.name?.trim() || user.email.split('@')[0],
      email: user.email,
      role,
    }
  } catch {
    return null
  }
}

/** Guarda la sesión (token + usuario) en localStorage. */
export function saveSession(session: AuthSession): void {
  localStorage.setItem(TOKEN_KEY, session.token)
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      name: session.name,
      email: session.email,
      role: { value: session.role },
    }),
  )
}

/** Elimina la sesión guardada. */
export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

/** Ruta del panel de cada rol. */
export const roleHome: Record<AccountType, string> = {
  cliente: '/cliente/panel',
  vendedor: '/vendedor/propiedades',
  inmobiliaria: '/inmobiliaria/propiedades',
  administrador: '/administrador/dashboard',
}

/** Ruta de inicio del panel según el rol del usuario. */
export function homeForRole(role: AccountType): string {
  return roleHome[role]
}
