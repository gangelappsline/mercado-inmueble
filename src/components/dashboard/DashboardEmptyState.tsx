import type { ReactNode } from 'react'
import { Icon, type IconName } from '@/components/ui/Icon'

type DashboardEmptyStateProps = {
  icon: IconName
  title: string
  description?: ReactNode
}

/** Estado vacío para las listas del panel. */
export function DashboardEmptyState({ icon, title, description }: DashboardEmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-navy-950/15 bg-white px-6 py-12 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-3xl bg-navy-50 text-navy-800">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <p className="mt-4 text-base font-bold text-navy-950">{title}</p>
      {description ? (
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-navy-900/65">{description}</p>
      ) : null}
    </div>
  )
}
