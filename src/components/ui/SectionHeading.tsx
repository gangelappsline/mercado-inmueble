import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 text-xs font-bold uppercase tracking-[0.22em]',
            tone === 'dark' ? 'text-brand-600' : 'text-brand-300',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.6rem]',
          tone === 'dark' ? 'text-navy-950' : 'text-white',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed sm:text-lg',
            tone === 'dark' ? 'text-navy-900/70' : 'text-navy-100/80',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
