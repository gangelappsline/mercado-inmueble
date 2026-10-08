import type { ReactNode } from 'react'
import { Icon, type IconName } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

type DashboardStatProps = {
  icon: IconName
  label: string
  value: ReactNode
  hint?: string
  className?: string
}

/** Tarjeta de métrica para los paneles. */
export function DashboardStat({ icon, label, value, hint, className }: DashboardStatProps) {
  return (
    <div className={cn('rounded-3xl border border-navy-950/8 bg-white p-5 shadow-card', className)}>
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-50 text-navy-800">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <p className="mt-4 text-2xl font-extrabold text-navy-950">{value}</p>
      <p className="mt-1 text-sm font-semibold text-navy-900/70">{label}</p>
      {hint ? <p className="mt-0.5 text-xs text-navy-900/50">{hint}</p> : null}
    </div>
  )
}
