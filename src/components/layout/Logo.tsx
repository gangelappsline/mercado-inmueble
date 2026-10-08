import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type LogoProps = {
  to?: string
  tone?: 'dark' | 'light'
  className?: string
  showTagline?: boolean
}

export function LogoMark({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn('h-9 w-9', className)}>
      <rect
        width="64"
        height="64"
        rx="15"
        className={cn(tone === 'dark' ? 'fill-navy-900' : 'fill-white/12')}
      />
      {tone === 'light' ? (
        <rect
          x="0.75"
          y="0.75"
          width="62.5"
          height="62.5"
          rx="14.25"
          fill="none"
          className="stroke-white/20"
          strokeWidth="1.5"
        />
      ) : null}
      <path d="M32 11.5 57 35.2h-8.4L32 20.1 15.4 35.2H7L32 11.5Z" className="fill-brand-500" />
      <path d="M15.8 35.2h32.4V52a1.8 1.8 0 0 1-1.8 1.8H17.6a1.8 1.8 0 0 1-1.8-1.8V35.2Z" className="fill-white" />
      <path d="M27.6 41.4h8.8v12.4h-8.8V41.4Z" className="fill-navy-900" />
      <circle cx="46" cy="18" r="4.6" className="fill-brand-500" />
    </svg>
  )
}

export function Logo({ to, tone = 'dark', className, showTagline = false }: LogoProps) {
  const reduceMotion = useReducedMotion()

  const content = (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark
        tone={tone}
        className="h-9 w-9 transition-transform duration-300 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[1.05rem] font-extrabold tracking-tight',
            tone === 'dark' ? 'text-navy-950' : 'text-white',
          )}
        >
          Mercado<span className="text-brand-500">Inmueble</span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              'mt-1 text-[0.68rem] font-medium tracking-[0.14em] uppercase',
              tone === 'dark' ? 'text-navy-900/55' : 'text-navy-100/70',
            )}
          >
            Plataforma inmobiliaria
          </span>
        ) : null}
      </span>
    </span>
  )

  if (!to) return content

  return (
    <motion.span
      className="group inline-flex"
      whileHover={reduceMotion ? undefined : { y: -1 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={to} aria-label="Mercado Inmueble — ir al inicio">
        {content}
      </Link>
    </motion.span>
  )
}
