import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type DashboardPageHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  className?: string
}

/** Encabezado estándar de las páginas del panel privado. */
export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: DashboardPageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-navy-950 sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 text-base leading-relaxed text-navy-900/70">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}
