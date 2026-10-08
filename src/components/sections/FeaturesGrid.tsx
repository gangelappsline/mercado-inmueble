import { Icon } from '@/components/ui/Icon'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { features } from '@/data/platform'
import { cn } from '@/lib/cn'

type FeaturesGridProps = {
  limit?: number
  className?: string
}

export function FeaturesGrid({ limit, className }: FeaturesGridProps) {
  const items = typeof limit === 'number' ? features.slice(0, limit) : features

  return (
    <Stagger className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {items.map((feature) => (
        <StaggerItem key={feature.id} className="h-full">
          <article className="group flex h-full flex-col rounded-3xl border border-navy-950/8 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-500/25 hover:shadow-card">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
              <Icon name={feature.icon} className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-navy-950">{feature.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-navy-900/70">{feature.description}</p>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
