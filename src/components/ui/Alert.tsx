import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Icon, type IconName } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

type AlertProps = {
  tone?: 'success' | 'error' | 'info'
  title?: string
  children?: ReactNode
  icon?: IconName
  className?: string
}

const tones = {
  success: 'border-emerald-500/25 bg-emerald-50 text-emerald-900',
  error: 'border-brand-500/30 bg-brand-50 text-brand-800',
  info: 'border-navy-500/20 bg-navy-50 text-navy-900',
}

const defaultIcons: Record<NonNullable<AlertProps['tone']>, IconName> = {
  success: 'checkCircle',
  error: 'alert',
  info: 'sparkles',
}

export function Alert({ tone = 'info', title, children, icon, className }: AlertProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      role="status"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn('flex gap-3 rounded-2xl border px-4 py-3.5 text-sm', tones[tone], className)}
    >
      <Icon name={icon ?? defaultIcons[tone]} className="mt-0.5 h-4.5 w-4.5" />
      <div className="space-y-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children ? <div className="leading-relaxed opacity-90">{children}</div> : null}
      </div>
    </motion.div>
  )
}
