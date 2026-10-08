import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import type { Property } from '@/data/properties'
import { cn } from '@/lib/cn'
import { formatArea, formatPrice } from '@/lib/format'

type PropertyCardProps = {
  property: Property
  onContact: (property: Property) => void
  className?: string
}

function publishedLabel(days: number): string {
  if (days <= 0) return 'Publicado hoy'
  if (days === 1) return 'Publicado hace 1 día'
  return `Publicado hace ${days} días`
}

export function PropertyCard({ property, onContact, className }: PropertyCardProps) {
  const [saved, setSaved] = useState(false)
  const reduceMotion = useReducedMotion()

  const specs = [
    property.bedrooms > 0 ? { icon: 'bed' as const, label: `${property.bedrooms} hab.` } : null,
    { icon: 'bath' as const, label: `${property.bathrooms} baños` },
    property.parking > 0 ? { icon: 'car' as const, label: `${property.parking} parq.` } : null,
    { icon: 'area' as const, label: formatArea(property.area) },
  ].filter((spec): spec is { icon: 'bed' | 'bath' | 'car' | 'area'; label: string } => spec !== null)

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-950/8 bg-white shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-soft',
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={property.image}
          alt={`${property.title} en ${property.neighborhood}, ${property.city}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3.5">
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-bold tracking-wide text-white shadow-sm',
                property.operation === 'Venta' ? 'bg-brand-500' : 'bg-navy-900',
              )}
            >
              {property.operation}
            </span>
            <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-navy-900 backdrop-blur">
              {property.type}
            </span>
          </div>

          <motion.button
            type="button"
            onClick={() => setSaved((value) => !value)}
            aria-pressed={saved}
            aria-label={saved ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            whileTap={reduceMotion ? undefined : { scale: 0.88 }}
            className={cn(
              'grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-colors duration-200',
              saved ? 'bg-brand-500 text-white' : 'bg-white/92 text-navy-900 hover:bg-white',
            )}
          >
            <Icon name="heart" className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-navy-950/75 to-transparent p-3.5 pt-10">
          <p className="text-lg font-extrabold text-white sm:text-xl">{formatPrice(property.price)}</p>
          <p className="rounded-full bg-white/15 px-2.5 py-1 text-[0.7rem] font-medium text-white/90 backdrop-blur">
            {property.id}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-1.5">
          <h3 className="text-base font-bold leading-snug text-navy-950">{property.title}</h3>
          <p className="flex items-center gap-1.5 text-sm text-navy-900/65">
            <Icon name="mapPin" className="h-4 w-4 text-brand-500" />
            {property.neighborhood}, {property.city}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-navy-900/75">
          {specs.map((spec) => (
            <li key={spec.label} className="flex items-center gap-1.5">
              <Icon name={spec.icon} className="h-4 w-4 text-navy-500" />
              {spec.label}
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-1.5">
          {property.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-navy-50 px-2.5 py-1 text-[0.7rem] font-medium text-navy-800"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-3 border-t border-navy-950/8 pt-4">
          <div className="flex items-center justify-between gap-3 text-xs text-navy-900/60">
            <span className="flex items-center gap-1.5 font-semibold text-navy-900/80">
              <Icon name="building" className="h-3.5 w-3.5" />
              {property.publisher}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="clock" className="h-3.5 w-3.5" />
              {publishedLabel(property.publishedDaysAgo)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onContact(property)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-navy-800"
          >
            <Icon name="chat" className="h-4 w-4" />
            Contactar al publicante
          </button>
        </div>
      </div>
    </article>
  )
}

export function PropertyCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-navy-950/8 bg-white">
      <div className="aspect-4/3 animate-pulse bg-navy-100" />
      <div className="space-y-4 p-5">
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-navy-100" />
        <div className="h-3.5 w-1/2 animate-pulse rounded-full bg-navy-100" />
        <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-navy-100" />
        <div className="h-11 w-full animate-pulse rounded-full bg-navy-100" />
      </div>
    </div>
  )
}
