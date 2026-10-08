import { Icon } from '@/components/ui/Icon'
import type { Property } from '@/data/properties'
import { cn } from '@/lib/cn'
import { formatArea, formatPrice } from '@/lib/format'

type PropertyListItemProps = {
  property: Property
  badge?: string
  className?: string
}

/** Fila compacta de un inmueble dentro de los paneles privados. */
export function PropertyListItem({ property, badge, className }: PropertyListItemProps) {
  return (
    <article
      className={cn(
        'flex gap-4 rounded-3xl border border-navy-950/8 bg-white p-4 shadow-card sm:gap-5 sm:p-5',
        className,
      )}
    >
      <img
        src={property.image}
        alt={property.title}
        loading="lazy"
        decoding="async"
        className="h-24 w-32 shrink-0 rounded-2xl object-cover sm:h-28 sm:w-40"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-white',
              property.operation === 'Venta' ? 'bg-brand-500' : 'bg-navy-900',
            )}
          >
            {property.operation}
          </span>
          {badge ? (
            <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-[0.7rem] font-semibold text-navy-800">
              {badge}
            </span>
          ) : null}
          <span className="ml-auto text-base font-extrabold text-navy-950 sm:text-lg">
            {formatPrice(property.price)}
          </span>
        </div>

        <h3 className="mt-2 truncate text-sm font-bold text-navy-950 sm:text-base">
          {property.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-navy-900/60 sm:text-sm">
          <Icon name="mapPin" className="h-3.5 w-3.5 text-brand-500" />
          {property.neighborhood}, {property.city} · {formatArea(property.area)}
        </p>
        <p className="mt-1 text-xs text-navy-900/50">{property.id}</p>
      </div>
    </article>
  )
}

export function PropertyListItemSkeleton() {
  return (
    <div className="flex animate-pulse gap-4 rounded-3xl border border-navy-950/8 bg-white p-4 sm:gap-5 sm:p-5">
      <div className="h-24 w-32 shrink-0 rounded-2xl bg-navy-100 sm:h-28 sm:w-40" />
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 w-2/3 rounded-full bg-navy-100" />
        <div className="h-3.5 w-1/2 rounded-full bg-navy-100" />
        <div className="h-3.5 w-1/3 rounded-full bg-navy-100" />
      </div>
    </div>
  )
}
