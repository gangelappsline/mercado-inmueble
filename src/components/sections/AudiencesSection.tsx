import { Link } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { audiences } from '@/data/platform'
import { cn } from '@/lib/cn'

export function AudiencesSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {audiences.map((audience, index) => {
        const featured = Boolean(audience.featured)
        const href = audience.cta.hash ? `${audience.cta.to}#${audience.cta.hash}` : audience.cta.to

        return (
          <Reveal key={audience.id} delay={index * 0.08} className="h-full">
            <article
              className={cn(
                'flex h-full flex-col rounded-[2rem] border p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1',
                featured
                  ? 'border-navy-950/60 bg-navy-950 text-white shadow-soft'
                  : 'border-navy-950/8 bg-white shadow-card hover:shadow-soft',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    'inline-flex h-12 w-12 items-center justify-center rounded-2xl',
                    featured ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600',
                  )}
                >
                  <Icon
                    name={
                      audience.id === 'clientes' ? 'search' : audience.id === 'vendedores' ? 'publish' : 'team'
                    }
                    className="h-6 w-6"
                  />
                </span>
                {featured ? (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-bold tracking-[0.14em] text-brand-300 uppercase">
                    Más elegido
                  </span>
                ) : null}
              </div>

              <p
                className={cn(
                  'mt-6 text-xs font-bold tracking-[0.18em] uppercase',
                  featured ? 'text-brand-300' : 'text-brand-600',
                )}
              >
                {audience.eyebrow}
              </p>
              <h3
                className={cn(
                  'mt-2 text-xl font-extrabold leading-snug',
                  featured ? 'text-white' : 'text-navy-950',
                )}
              >
                {audience.title}
              </h3>
              <p
                className={cn(
                  'mt-3 text-sm leading-relaxed',
                  featured ? 'text-navy-100/80' : 'text-navy-900/70',
                )}
              >
                {audience.description}
              </p>

              <ul className="mt-6 space-y-3">
                {audience.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className={cn(
                      'flex items-start gap-2.5 text-sm',
                      featured ? 'text-navy-100/85' : 'text-navy-900/80',
                    )}
                  >
                    <Icon
                      name="checkCircle"
                      className={cn('mt-0.5 h-4.5 w-4.5 shrink-0', featured ? 'text-brand-400' : 'text-brand-500')}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <Link
                to={href}
                className={cn(
                  'mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200',
                  featured
                    ? 'bg-brand-500 text-white hover:bg-brand-600'
                    : 'bg-navy-900 text-white hover:bg-navy-800',
                )}
              >
                {audience.cta.label}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
