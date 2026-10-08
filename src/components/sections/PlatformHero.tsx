import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { stats } from '@/data/platform'

const quickLinks = [
  { label: 'Perfiles', hash: 'audiencias' },
  { label: 'Capacidades', hash: 'capacidades' },
  { label: 'Cómo funciona', hash: 'como-funciona' },
  { label: 'Propiedades', hash: 'propiedades' },
  { label: 'Beneficios', hash: 'beneficios' },
  { label: 'Contacto', hash: 'contacto' },
]

export function PlatformHero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-14 pb-16 text-white lg:pt-18 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-dots text-white/8" />
      <div className="pointer-events-none absolute -top-28 -right-16 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-navy-500/30 blur-3xl" />

      <div className="container-page relative">
        <Reveal y={14}>
          <Badge tone="light" icon={<Icon name="sparkles" className="h-3.5 w-3.5" />}>
            Qué ofrecemos
          </Badge>
        </Reveal>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <Reveal delay={0.05}>
              <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
                Todo lo que necesitas para
                <span className="text-brand-400"> comprar, vender y arrendar</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-100/80 sm:text-lg">
                Esta página reúne las herramientas, los perfiles y los servicios que Mercado Inmueble
                pone a disposición de inmobiliarias, vendedores independientes y clientes. Explora las
                capacidades de la plataforma y elige por dónde empezar.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/login" size="lg" icon="arrowRight" className="w-full sm:w-auto">
                  Crear cuenta gratis
                </ButtonLink>
                <ButtonLink
                  to="/plataforma#contacto"
                  size="lg"
                  variant="white"
                  icon="chat"
                  className="w-full sm:w-auto"
                >
                  Hablar con el equipo
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <nav aria-label="Secciones de esta página" className="rounded-3xl border border-white/12 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-xs font-bold tracking-[0.2em] text-navy-100/60 uppercase">
                En esta página
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {quickLinks.map((link) => (
                  <li key={link.hash}>
                    <Link
                      to={`/plataforma#${link.hash}`}
                      className="flex items-center justify-between gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-navy-100/85 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                      <Icon name="arrowRight" className="h-4 w-4 text-brand-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/12 pt-8 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div>
                <p className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium tracking-wide text-navy-100/65 uppercase">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
