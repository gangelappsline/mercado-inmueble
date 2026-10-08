import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { useAuth } from '@/context/auth'
import { accountTypeLabel, type AccountType } from '@/lib/api'
import { cn } from '@/lib/cn'
import { homeForRole } from '@/lib/session'

type RoleNavItem = { to: string; label: string; icon: IconName }

/** Enlace principal del panel según el rol del usuario. */
const roleNav: Record<AccountType, RoleNavItem> = {
  cliente: { to: '/cliente/panel', label: 'Mi panel', icon: 'user' },
  vendedor: { to: '/vendedor/propiedades', label: 'Mis propiedades', icon: 'publish' },
  inmobiliaria: { to: '/inmobiliaria/propiedades', label: 'Portafolio', icon: 'building' },
  administrador: { to: '/administrador/dashboard', label: 'Dashboard', icon: 'chart' },
}

/**
 * Envoltura de las rutas privadas: barra superior con la identidad del
 * usuario, su rol y la acción de cerrar sesión. El contenido del panel se
 * renderiza en su <Outlet />.
 */
export function DashboardLayout() {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  if (!session) return null

  const home = roleNav[session.role]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200',
      isActive ? 'bg-navy-900 text-white' : 'text-navy-900/70 hover:bg-navy-900/5 hover:text-navy-950',
    )

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy-50/60">
      <header className="sticky top-0 z-50 border-b border-navy-950/8 bg-white/85 backdrop-blur-xl">
        <div className="container-page flex h-18 items-center justify-between gap-4 lg:h-20">
          <Logo to={homeForRole(session.role)} showTagline className="shrink-0" />

          <nav aria-label="Navegación del panel" className="hidden items-center gap-1 md:flex">
            <NavLink to={home.to} end className={linkClass}>
              <Icon name={home.icon} className="h-4 w-4" />
              {home.label}
            </NavLink>
            <NavLink to="/plataforma#propiedades" className={linkClass}>
              <Icon name="search" className="h-4 w-4" />
              Explorar catálogo
            </NavLink>
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden text-right leading-tight sm:block">
              <p className="text-sm font-bold text-navy-950">{session.name}</p>
              <p className="text-xs text-navy-900/55">{session.email}</p>
            </div>
            <Badge tone="brand" icon={<Icon name="verified" className="h-3.5 w-3.5" />}>
              {accountTypeLabel(session.role)}
            </Badge>
            <Button variant="outline" size="sm" icon="logout" onClick={handleLogout}>
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
