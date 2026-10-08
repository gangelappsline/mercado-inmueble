import officeImage from '@/assets/oficina-inmobiliaria.jpg'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { benefits } from '@/data/platform'

export function BenefitsSection() {
  return (
    <section id="beneficios" className="scroll-mt-24 bg-navy-950 py-16 text-white lg:py-22">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2.25rem] bg-linear-to-tr from-brand-500/25 to-navy-500/20 blur-2xl" />
            <img
              src={officeImage}
              alt="Equipo de una inmobiliaria trabajando en su inventario de propiedades"
              loading="lazy"
              decoding="async"
              className="relative h-72 w-full rounded-[2rem] object-cover shadow-soft sm:h-96"
            />

            <div className="absolute -bottom-6 left-4 w-56 rounded-2xl border border-white/10 bg-navy-900/95 p-4 shadow-soft backdrop-blur sm:left-8">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-navy-100/70 uppercase">
                <Icon name="trending" className="h-4 w-4 text-brand-400" />
                Inventario activo
              </p>
              <p className="mt-2 text-2xl font-extrabold">+38 %</p>
              <p className="text-xs text-navy-100/70">más contactos por publicación</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            tone="light"
            eyebrow="Por qué elegirnos"
            title="Una plataforma pensada para el negocio real"
            description="Construimos Mercado Inmueble junto a inmobiliarias y vendedores independientes: cada función responde a un problema concreto del día a día."
          />

          <ul className="mt-9 space-y-6">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 0.06}>
                <li className="flex gap-4">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-brand-300">
                    <Icon name="check" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy-100/75">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/login" size="lg" icon="arrowRight" className="w-full sm:w-auto">
                Crear cuenta
              </ButtonLink>
              <ButtonLink
                to="/plataforma#contacto"
                size="lg"
                variant="white"
                icon="phone"
                className="w-full sm:w-auto"
              >
                Hablar con el equipo
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
