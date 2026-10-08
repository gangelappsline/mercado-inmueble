import { useState } from 'react'
import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from '@/components/ui/Alert'
import { Button, ButtonLink } from '@/components/ui/Button'
import { SelectField, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { useAuth } from '@/context/auth'
import { useAuthenticate } from '@/hooks/queries'
import type { AccountType } from '@/lib/api'
import { cn } from '@/lib/cn'
import { homeForRole } from '@/lib/session'

type Mode = 'login' | 'register'

type FormErrors = Partial<Record<'name' | 'email' | 'password' | 'terms', string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const accountTypes: Array<{ value: AccountType; label: string; hint: string }> = [
  { value: 'cliente', label: 'Cliente', hint: 'Busco comprar o arrendar' },
  { value: 'inmobiliaria', label: 'Inmobiliaria', hint: 'Gestiono un portafolio' },
  { value: 'vendedor', label: 'Vendedor', hint: 'Publico mi inmueble' },
]

export function AuthCard() {
  const [mode, setMode] = useState<Mode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [showRecovery, setShowRecovery] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const auth = useAuthenticate()
  const { login } = useAuth()
  const navigate = useNavigate()

  function switchMode(next: Mode) {
    if (next === mode) return
    setMode(next)
    setErrors({})
    auth.reset()
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')
    const accountType = String(form.get('accountType') ?? 'cliente') as AccountType
    const terms = form.get('terms')

    const nextErrors: FormErrors = {}
    if (mode === 'register' && name.length < 3) nextErrors.name = 'Escribe tu nombre completo.'
    if (!emailPattern.test(email)) nextErrors.email = 'Revisa el correo electrónico.'
    if (password.length < 8) nextErrors.password = 'La contraseña debe tener al menos 8 caracteres.'
    if (mode === 'register' && !terms) nextErrors.terms = 'Debes aceptar las condiciones para continuar.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    auth.mutate(
      { email, password, accountType, name: mode === 'register' ? name : undefined },
      {
        onSuccess: (session) => {
          // Se guarda la sesión y se envía al usuario al panel de su rol.
          login({
            token: session.token,
            name: session.name,
            email: session.email,
            role: session.accountType,
          })
          navigate(homeForRole(session.accountType), { replace: true })
        },
      },
    )
  }

  return (
    <div className="order-1 rounded-[2rem] border border-navy-950/8 bg-white p-6 shadow-soft sm:p-9 lg:order-2">
      <div
        role="tablist"
        aria-label="Tipo de acceso"
        className="flex rounded-full bg-navy-50 p-1"
      >
        {(
          [
            { value: 'login', label: 'Iniciar sesión' },
            { value: 'register', label: 'Crear cuenta' },
          ] as const
        ).map((tab) => {
          const selected = tab.value === mode
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => switchMode(tab.value)}
              className={cn(
                'relative flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200',
                selected ? 'text-white' : 'text-navy-900/70 hover:text-navy-900',
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="auth-tab"
                  className="absolute inset-0 rounded-full bg-navy-900"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <h1 className="mt-7 text-2xl font-extrabold text-navy-950">
        {mode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta gratis'}
      </h1>
      <p className="mt-2 text-sm text-navy-900/65">
        {mode === 'login'
          ? 'Ingresa con tu correo y contraseña para gestionar tus inmuebles.'
          : 'Un solo registro para publicar inmuebles, recibir contactos y hacer seguimiento.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
        {mode === 'register' ? (
          <TextInput
            name="name"
            label="Nombre completo"
            placeholder="Ana Martínez"
            autoComplete="name"
            error={errors.name}
            required
          />
        ) : null}

        <TextInput
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="tu@correo.com"
          autoComplete="email"
          icon={<Icon name="mail" className="h-4.5 w-4.5" />}
          error={errors.email}
          required
        />

        <TextInput
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Contraseña"
          placeholder="Mínimo 8 caracteres"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          icon={<Icon name="lock" className="h-4.5 w-4.5" />}
          error={errors.password}
          hint={mode === 'register' ? 'Usa al menos 8 caracteres, con números y letras.' : undefined}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="grid h-9 w-9 place-items-center rounded-full text-navy-900/50 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              <Icon name={showPassword ? 'eyeOff' : 'eye'} className="h-4.5 w-4.5" />
            </button>
          }
          required
        />

        {mode === 'register' ? (
          <SelectField
            name="accountType"
            label="¿Cómo usarás la plataforma?"
            options={accountTypes.map((type) => ({
              value: type.value,
              label: `${type.label} — ${type.hint}`,
            }))}
          />
        ) : null}

        {mode === 'login' ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-navy-900/75">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 rounded border-navy-950/25 accent-brand-500"
              />
              Mantener mi sesión abierta
            </label>
            <button
              type="button"
              onClick={() => setShowRecovery((value) => !value)}
              aria-expanded={showRecovery}
              className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        ) : (
          <div className="space-y-1.5">
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-navy-900/75">
              <input
                type="checkbox"
                name="terms"
                className="mt-0.5 h-4 w-4 rounded border-navy-950/25 accent-brand-500"
              />
              Acepto las condiciones de uso y el tratamiento de mis datos personales.
            </label>
            {errors.terms ? (
              <p className="flex items-center gap-1.5 text-xs font-medium text-brand-600">
                <Icon name="alert" className="h-3.5 w-3.5" />
                {errors.terms}
              </p>
            ) : null}
          </div>
        )}

        {showRecovery ? (
          <Alert tone="info" title="Restablecer contraseña">
            Escríbenos a{' '}
            <a href="mailto:hola@mercadoinmueble.com" className="font-semibold underline">
              hola@mercadoinmueble.com
            </a>{' '}
            desde el correo de tu cuenta y el equipo restablece tu acceso.
          </Alert>
        ) : null}

        {auth.isError ? (
          <Alert tone="error" title="No pudimos completar el acceso">
            Revisa tus datos e intenta de nuevo. Si el problema continúa, escríbenos desde la sección
            de contacto.
          </Alert>
        ) : null}

        <Button
          type="submit"
          size="lg"
          icon={auth.isPending ? undefined : 'arrowRight'}
          disabled={auth.isPending}
          className="w-full"
        >
          {auth.isPending
            ? 'Procesando…'
            : mode === 'login'
              ? 'Ingresar a mi cuenta'
              : 'Crear mi cuenta'}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-navy-950/10" />
        <span className="text-xs font-semibold tracking-wide text-navy-900/45 uppercase">o</span>
        <span className="h-px flex-1 bg-navy-950/10" />
      </div>

      <div className="space-y-3">
        <ButtonLink to="/plataforma#propiedades" variant="outline" size="md" icon="search" className="w-full">
          Explorar inmuebles sin cuenta
        </ButtonLink>
        <p className="text-center text-xs text-navy-900/55">
          ¿Representas una inmobiliaria?{' '}
          <Link
            to="/plataforma#contacto"
            className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Solicita una demostración
          </Link>
        </p>
      </div>
    </div>
  )
}
