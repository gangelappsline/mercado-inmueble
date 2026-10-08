import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeProps = {
  children: ReactNode
  tone?: 'brand' | 'navy' | 'neutral' | 'light'
  icon?: ReactNode
  className?: string
}

const tones = {
  brand: 'border-brand-500/25 bg-brand-50 text-brand-700',
  navy: 'border-navy-900/15 bg-navy-50 text-navy-900',
  neutral: 'border-navy-950/10 bg-white text-navy-800',
  light: 'border-white/25 bg-white/10 text-white backdrop-blur',
}

export function Badge({ children, tone = 'neutral', icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
