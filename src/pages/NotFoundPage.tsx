import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function NotFoundPage() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-brand-500/12 blur-3xl" />
      <div className="container-page relative flex flex-col items-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-3xl bg-navy-900 text-white">
          <Icon name="building" className="h-8 w-8" />
        </span>
        <p className="mt-6 text-sm font-bold tracking-[0.22em] text-brand-600 uppercase">Error 404</p>
        <h1 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
          No encontramos esta página
        </h1>
        <p className="mt-4 max-w-lg text-base text-navy-900/70">
          Puede que el enlace esté roto o que la página ya no exista. Vuelve al inicio o revisa todo lo
          que ofrece la plataforma.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/" size="lg" icon="arrowRight">
            Ir al inicio
          </ButtonLink>
          <ButtonLink to="/plataforma" size="lg" variant="outline" icon="list">
            Ver qué ofrecemos
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
