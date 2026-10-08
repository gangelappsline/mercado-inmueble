import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderToString } from 'react-dom/server'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from '@/router/routes'

/** Renderiza una ruta en memoria y devuelve su HTML. */
export function renderRoute(path: string): string {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })

  const router = createMemoryRouter(routes, { initialEntries: [path] })

  return renderToString(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
}
