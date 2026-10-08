import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { navItems, type NavItem } from '@/data/site'
import { cn } from '@/lib/cn'

const EASE = [0.22, 1, 0.36, 1] as const

/** Rutas que inician con un hero oscuro y necesitan header en tono claro. */
const darkHeroRoutes = ['/plataforma']

function isItemActive(item: NavItem, pathname: string, hash: string): boolean {
  if (item.to !== pathname) return false
  if (!item.hash) return !hash || pathname !== '/plataforma'
  return `#${item.hash}` === hash
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()
  const reduceMotion = useReducedMotion()

  /**
   * El menú móvil guarda la ruta en la que fue abierto, así se cierra solo
   * cuando cambia la ubicación, sin efectos ni renders en cascada.
   */
  const routeKey = `${pathname}${hash}`
  const [openRoute, setOpenRoute] = useState<string | null>(null)
  const open = openRoute === routeKey
  const setOpen = (value: boolean) => setOpenRoute(value ? routeKey : null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquea el scroll del body mientras el panel móvil está abierto.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenRoute(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const overDarkHero = darkHeroRoutes.includes(pathname) && !scrolled

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        overDarkHero
          ? 'border-b border-white/10 bg-navy-950/40 backdrop-blur-sm'
          : scrolled
            ? 'border-b border-navy-950/8 bg-white/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-white/60 backdrop-blur-sm',
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4 lg:h-20">
        <Logo to="/" tone={overDarkHero ? 'light' : 'dark'} showTagline className="shrink-0" />

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isItemActive(item, pathname, hash)
            return (
              <NavLink
                key={`${item.to}${item.hash ?? ''}`}
                to={item.hash ? `${item.to}#${item.hash}` : item.to}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200',
                  overDarkHero
                    ? active
                      ? 'text-brand-300'
                      : 'text-navy-100/80 hover:text-white'
                    : active
                      ? 'text-brand-600'
                      : 'text-navy-900/75 hover:text-navy-950',
                )}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </NavLink>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Link
            to="/login"
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              overDarkHero
                ? 'text-navy-100/90 hover:bg-white/10 hover:text-white'
                : 'text-navy-900 hover:bg-navy-900/5',
            )}
          >
            Iniciar sesión
          </Link>
          <ButtonLink to="/login" size="sm" icon="arrowRight">
            Publicar inmueble
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden',
            overDarkHero
              ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
              : 'border-navy-950/12 bg-white text-navy-900 hover:bg-navy-50',
          )}
        >
          <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="border-t border-navy-950/8 bg-white/97 backdrop-blur-xl lg:hidden"
          >
            <div className="container-page max-h-[calc(100vh-4.5rem)] space-y-1 overflow-y-auto py-5">
              {navItems.map((item) => (
                <Link
                  key={`m-${item.to}${item.hash ?? ''}`}
                  to={item.hash ? `${item.to}#${item.hash}` : item.to}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-navy-900 transition-colors hover:bg-navy-50"
                >
                  {item.label}
                  <Icon name="arrowUpRight" className="h-4 w-4 text-brand-500" />
                </Link>
              ))}

              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                <ButtonLink to="/login" variant="outline" size="md" icon="lock" className="w-full">
                  Iniciar sesión
                </ButtonLink>
                <ButtonLink to="/login" size="md" icon="arrowRight" className="w-full">
                  Publicar inmueble
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
