import type { RouteObject } from 'react-router-dom'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdministradorDashboardPage } from '@/pages/dashboard/AdministradorDashboardPage'
import { ClientePanelPage } from '@/pages/dashboard/ClientePanelPage'
import { InmobiliariaPropiedadesPage } from '@/pages/dashboard/InmobiliariaPropiedadesPage'
import { VendedorPropiedadesPage } from '@/pages/dashboard/VendedorPropiedadesPage'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PlatformPage } from '@/pages/PlatformPage'

/**
 * Rutas públicas de la plataforma. El layout expone el header y el footer,
 * y cada página se renderiza dentro de su <Outlet />. El comodín `*` muestra
 * la pantalla 404 para cualquier ruta que no exista.
 */
const publicRoutes: RouteObject[] = [
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

/**
 * Rutas privadas del panel. Exigen sesión activa y, cada una, el rol que le
 * corresponde: sin sesión se redirige a /login y con un rol distinto se
 * redirige al panel propio del usuario.
 */
const dashboardRoutes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: 'cliente/panel',
            element: (
              <RequireAuth roles={['cliente']}>
                <ClientePanelPage />
              </RequireAuth>
            ),
          },
          {
            path: 'vendedor/propiedades',
            element: (
              <RequireAuth roles={['vendedor']}>
                <VendedorPropiedadesPage />
              </RequireAuth>
            ),
          },
          {
            path: 'inmobiliaria/propiedades',
            element: (
              <RequireAuth roles={['inmobiliaria']}>
                <InmobiliariaPropiedadesPage />
              </RequireAuth>
            ),
          },
          {
            path: 'administrador/dashboard',
            element: (
              <RequireAuth roles={['administrador']}>
                <AdministradorDashboardPage />
              </RequireAuth>
            ),
          },
        ],
      },
    ],
  },
]

export const routes: RouteObject[] = [...publicRoutes, ...dashboardRoutes]
