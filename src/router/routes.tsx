import type { RouteObject } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PlatformPage } from '@/pages/PlatformPage'

/**
 * Rutas públicas de la plataforma. El layout expone el header y el footer,
 * y cada página se renderiza dentro de su <Outlet />.
 */
export const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'plataforma', element: <PlatformPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
