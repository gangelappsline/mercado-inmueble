import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'navy' | 'outline' | 'ghost' | 'white'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 text-white shadow-brand hover:bg-brand-600 active:bg-brand-700 focus-visible:outline-brand-500',
  navy: 'bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950 focus-visible:outline-navy-700',
  outline:
    'border border-navy-900/15 bg-white/70 text-navy-900 backdrop-blur hover:border-navy-900/30 hover:bg-white',
  ghost: 'text-navy-900 hover:bg-navy-900/5',
  white: 'bg-white text-navy-900 shadow-soft hover:bg-navy-50',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 gap-1.5 px-4 text-sm',
  md: 'h-12 gap-2 px-5 text-[0.95rem]',
  lg: 'h-14 gap-2.5 px-7 text-base',
}

const base =
  'inline-flex select-none items-center justify-center rounded-full font-semibold tracking-tight transition-[background-color,color,box-shadow,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60'

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  icon?: IconName
  iconPosition?: 'left' | 'right'
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>

function content({ children, icon, iconPosition = 'right' }: CommonProps) {
  return (
    <>
      {icon && iconPosition === 'left' ? <Icon name={icon} className="h-4.5 w-4.5" /> : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? <Icon name={icon} className="h-4.5 w-4.5" /> : null}
    </>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  iconPosition,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {content({ children, icon, iconPosition })}
    </button>
  )
}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  iconPosition,
}: CommonProps & { to: string }) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
      {content({ children, icon, iconPosition })}
    </Link>
  )
}
