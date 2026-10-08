import { motion, useReducedMotion } from 'motion/react'
import heroBuilding from '@/assets/hero-building.jpg'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

const EASE = [0.22, 1, 0.36, 1] as const

const trust = [
  'Explorar es gratis y sin registro',
  'Publicaciones verificadas por nuestro equipo',
  'Contacto directo con quien publica',
]

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-navy-50 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand-500/12 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-0 h-80 w-80 rounded-full bg-navy-500/12 blur-3xl" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <Reveal y={14}>
            <Badge tone="brand" icon={<Icon name="sparkles" className="h-3.5 w-3.5" />}>
              Plataforma inmobiliaria digital
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-navy-950 sm:text-5xl lg:text-[3.6rem]">
              Todo el mercado inmobiliario,
              <span className="text-gradient-brand"> en un solo lugar</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-900/70 sm:text-lg">
              Mercado Inmueble conecta a inmobiliarias, vendedores independientes y clientes. Publica
              tu propiedad en minutos, encuentra el inmueble que buscas y gestiona cada contacto sin
              salir de la plataforma.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink to="/login" size="lg" icon="arrowRight" className="w-full sm:w-auto">
                Crear cuenta gratis
              </ButtonLink>
              <ButtonLink
                to="/plataforma"
                size="lg"
                variant="outline"
                icon="chevronDown"
                className="w-full sm:w-auto"
              >
                Ver qué ofrecemos
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {trust.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy-900/75">
                  <Icon name="checkCircle" className="mt-0.5 h-4.5 w-4.5 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12} y={30} className="relative">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-tr from-brand-500/15 via-transparent to-navy-500/15 blur-2xl" />

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-soft"
            >
              <img
                src={heroBuilding}
                alt="Conjunto residencial moderno con zonas verdes al atardecer"
                width={1408}
                height={768}
                className="h-70 w-full object-cover sm:h-96 lg:h-[30rem]"
              />
            </motion.div>

            <div className="absolute top-6 -left-3 animate-float rounded-2xl border border-navy-950/6 bg-white/95 p-3.5 shadow-soft backdrop-blur sm:-left-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-white">
                  <Icon name="chat" className="h-5 w-5" />
                </span>
                <div className="pr-1">
                  <p className="text-xs font-bold text-navy-950">Nuevo contacto recibido</p>
                  <p className="text-[0.7rem] text-navy-900/60">Apartamento · El Poblado</p>
                </div>
              </div>
            </div>

            <div className="absolute right-3 -bottom-4 animate-float-slow rounded-2xl bg-navy-900 p-4 text-white shadow-soft sm:-right-5">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-navy-100/70 uppercase">
                Publicar tarda
              </p>
              <p className="mt-1 text-2xl font-extrabold leading-none">3 min</p>
              <p className="mt-1 text-[0.7rem] text-navy-100/75">con fotos y precio</p>
            </div>

            <div className="absolute bottom-6 left-4 hidden items-center gap-2 rounded-full bg-white/92 px-3.5 py-2 text-xs font-semibold text-navy-900 shadow-card backdrop-blur sm:flex">
              <Icon name="verified" className="h-4 w-4 text-brand-500" />
              Anuncios verificados
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
