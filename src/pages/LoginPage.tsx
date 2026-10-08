import { Navigate } from 'react-router-dom'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthPanel } from '@/components/auth/AuthPanel'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { useAuth } from '@/context/auth'
import { homeForRole } from '@/lib/session'

export function LoginPage() {
  const { isAuthenticated, session } = useAuth()

  // Si ya hay una sesión activa, se envía al usuario al panel de su rol.
  if (isAuthenticated && session) {
    return <Navigate to={homeForRole(session.role)} replace />
  }

  return (
    <section className="relative overflow-hidden bg-navy-50/50 py-12 lg:py-16">
      <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-brand-500/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-navy-500/12 blur-3xl" />

      <div className="container-page relative">
        <Reveal y={12}>
          <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs font-semibold text-navy-900/55">
            <span>Inicio</span>
            <Icon name="arrowRight" className="h-3 w-3" />
            <span className="text-navy-900">Acceso a la plataforma</span>
          </nav>
        </Reveal>

        <div className="mt-7 grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <AuthPanel />
          <AuthCard />
        </div>
      </div>
    </section>
  )
}
