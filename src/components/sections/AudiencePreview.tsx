import { Link } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { audiences, type Audience } from '@/data/platform'

const shortTitles: Record<Audience['id'], string> = {
  clientes: 'Busca y compara inmuebles',
  vendedores: 'Publica tu propiedad',
  inmobiliarias: 'Administra tu inventario',
}

export function AudiencePreview() {
  return (
    <section className="py-16 lg:py-22">
      <div className="container-page">
        <SectionHeading
          eyebrow="Para quién es"
          title="Tres perfiles, una misma plataforma"
          description="Cada perfil tiene su propio flujo de trabajo y sus propias herramientas. Elige el tuyo al crear la cuenta."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {audiences.map((audience, index) => (
            <Reveal key={audience.id} delay={index * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-navy-950/8 bg-white p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-soft sm:p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-900 text-white">
                  <Icon
                    name={audience.id === 'clientes' ? 'search' : audience.id === 'vendedores' ? 'publish' : 'team'}
                    className="h-5 w-5"
                  />
                </span>

                <p className="mt-5 text-xs font-bold tracking-[0.18em] text-brand-600 uppercase">
                  {audience.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-bold text-navy-950">{shortTitles[audience.id]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-900/70">{audience.description}</p>

                <ul className="mt-5 space-y-2.5">
                  {audience.bullets.slice(0, 2).map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-navy-900/80">
                      <Icon name="check" className="mt-0.5 h-4 w-4 text-brand-500" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/plataforma#audiencias`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700"
                >
                  Ver detalles
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
