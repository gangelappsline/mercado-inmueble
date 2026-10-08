import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderToString } from 'react-dom/server'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthProvider'
import type { AccountType } from '@/lib/api'
import { routes } from '@/router/routes'

/**
 * Node no incluye localStorage: se instala un stub en memoria para poder
 * sembrar sesiones y verificar las rutas protegidas del panel.
 */
const storage = new Map<string, string>()

if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => {
      storage.set(key, String(value))
    },
    removeItem: (key: string) => {
      storage.delete(key)
    },
    clear: () => {
      storage.clear()
    },
    key: (index: number) => Array.from(storage.keys())[index] ?? null,
    get length() {
      return storage.size
    },
  } as Storage
}

/** Renderiza una ruta en memoria y devuelve su HTML. */
function render(path: string): string {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })

  const router = createMemoryRouter(routes, { initialEntries: [path] })

  return renderToString(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>,
  )
}

/** Renderiza una ruta sin sesión (contenido público o redirección a /login). */
export function renderRoute(path: string): string {
  storage.clear()
  return render(path)
}

/** Renderiza una ruta simulando la sesión de un usuario con el rol indicado. */
export function renderRouteAs(
  path: string,
  role: AccountType,
  name = 'Usuario Demo',
  email = 'demo@correo.com',
): string {
  storage.clear()
  storage.set('token', `smoke-token-${role}`)
  storage.set('user', JSON.stringify({ name, email, role: { value: role } }))
  return render(path)
}
