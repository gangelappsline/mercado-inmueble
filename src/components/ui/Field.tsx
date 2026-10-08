import type { ComponentProps, ReactNode } from 'react'
import { useId } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

const control =
  'w-full rounded-2xl border bg-white px-4 py-3 text-[0.95rem] text-navy-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] transition-colors duration-200 placeholder:text-navy-900/40 focus:outline-none focus:ring-4'

function stateClasses(error?: string) {
  return error
    ? 'border-brand-500/60 focus:border-brand-500 focus:ring-brand-500/15'
    : 'border-navy-950/12 focus:border-navy-500 focus:ring-navy-500/12'
}

type FieldShellProps = {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
  className?: string
}

export function FieldShell({ id, label, error, hint, children, className }: FieldShellProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-navy-900">
        {label}
      </label>
      {children}
      {error ? (
        <p className="flex items-center gap-1.5 text-xs font-medium text-brand-600">
          <Icon name="alert" className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-navy-900/55">{hint}</p>
      ) : null}
    </div>
  )
}

type TextInputProps = Omit<ComponentProps<'input'>, 'id'> & {
  label: string
  error?: string
  hint?: string
  icon?: ReactNode
  /** Elemento interactivo al final del campo (por ejemplo, ver contraseña). */
  trailing?: ReactNode
  containerClassName?: string
}

export function TextInput({
  label,
  error,
  hint,
  icon,
  trailing,
  containerClassName,
  className,
  ...rest
}: TextInputProps) {
  const generatedId = useId()
  const id = rest.name ? `field-${rest.name}` : generatedId

  return (
    <FieldShell id={id} label={label} error={error} hint={hint} className={containerClassName}>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-navy-900/40">
            {icon}
          </span>
        ) : null}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          className={cn(control, stateClasses(error), icon ? 'pl-11' : undefined, trailing ? 'pr-12' : undefined, className)}
          {...rest}
        />
        {trailing ? <span className="absolute top-1/2 right-2 -translate-y-1/2">{trailing}</span> : null}
      </div>
    </FieldShell>
  )
}

type SelectFieldProps = Omit<ComponentProps<'select'>, 'id'> & {
  label: string
  options: readonly string[] | Array<{ value: string; label: string }>
  error?: string
  hint?: string
  containerClassName?: string
}

export function SelectField({
  label,
  options,
  error,
  hint,
  containerClassName,
  className,
  ...rest
}: SelectFieldProps) {
  const generatedId = useId()
  const id = rest.name ? `field-${rest.name}` : generatedId

  return (
    <FieldShell id={id} label={label} error={error} hint={hint} className={containerClassName}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          className={cn(control, stateClasses(error), 'appearance-none pr-11', className)}
          {...rest}
        >
          {options.map((option) => {
            const value = typeof option === 'string' ? option : option.value
            const text = typeof option === 'string' ? option : option.label
            return (
              <option key={value} value={value}>
                {text}
              </option>
            )
          })}
        </select>
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-navy-900/45"
        />
      </div>
    </FieldShell>
  )
}

type TextAreaFieldProps = Omit<ComponentProps<'textarea'>, 'id'> & {
  label: string
  error?: string
  hint?: string
  containerClassName?: string
}

export function TextAreaField({
  label,
  error,
  hint,
  containerClassName,
  className,
  ...rest
}: TextAreaFieldProps) {
  const generatedId = useId()
  const id = rest.name ? `field-${rest.name}` : generatedId

  return (
    <FieldShell id={id} label={label} error={error} hint={hint} className={containerClassName}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(control, stateClasses(error), 'min-h-32 resize-y', className)}
        {...rest}
      />
    </FieldShell>
  )
}
