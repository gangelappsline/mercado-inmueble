import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-dots text-white/8" />
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />

      <div className="container-page relative">
        <Reveal>
          <div className="flex flex-col items-start gap-8 rounded-[2rem] border border-white/12 bg-white/5 p-8 backdrop-blur-sm sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-brand-300 uppercase">
                <Icon name="sparkles" className="h-4 w-4" />
                Empieza hoy
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Crea tu cuenta y publica tu primer inmueble esta semana
              </h2>
              <p className="mt-3 text-base text-navy-100/80">
                Registrarte es gratis. Publica tu primer inmueble y empieza a recibir contactos de
                personas interesadas.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <ButtonLink to="/login" size="lg" icon="arrowRight" className="w-full sm:w-auto">
                Crear cuenta
              </ButtonLink>
              <ButtonLink
                to="/plataforma#contacto"
                size="lg"
                variant="white"
                icon="chat"
                className="w-full sm:w-auto"
              >
                Pedir demostración
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
