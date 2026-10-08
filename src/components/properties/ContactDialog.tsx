import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { TextAreaField, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { useCreateLead } from '@/hooks/queries'
import type { Property } from '@/data/properties'
import { formatPrice } from '@/lib/format'

type ContactDialogProps = {
  open: boolean
  onClose: () => void
  property?: Property | null
}

type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function ContactDialog({ open, onClose, property }: ContactDialogProps) {
  const [errors, setErrors] = useState<FormErrors>({})
  const lead = useCreateLead()
  const reduceMotion = useReducedMotion()
  const firstFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    lead.reset()
    setErrors({})
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 120)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, property?.id])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()

    const nextErrors: FormErrors = {}
    if (name.length < 3) nextErrors.name = 'Escribe tu nombre completo.'
    if (!emailPattern.test(email)) nextErrors.email = 'Revisa el correo electrónico.'
    if (message.length < 10) nextErrors.message = 'Cuéntanos brevemente qué necesitas.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    lead.mutate({
      name,
      email,
      profile: 'cliente',
      message: `${message}${phone ? ` · Teléfono: ${phone}` : ''}${
        property ? ` · Inmueble: ${property.id} (${property.title})` : ''
      }`,
    })
  }

  const subject = property
    ? `${property.title} · ${property.city}`
    : 'Quiero más información sobre Mercado Inmueble'

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-100 flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default bg-navy-950/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contacto-titulo"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-soft sm:rounded-3xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="contacto-titulo" className="text-xl font-extrabold text-navy-950">
                  Contactar al publicante
                </h2>
                <p className="mt-1 text-sm text-navy-900/65">{subject}</p>
                {property ? (
                  <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-navy-50 px-3 py-1 text-sm font-semibold text-navy-900">
                    <Icon name="target" className="h-4 w-4 text-brand-500" />
                    {formatPrice(property.price)}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar formulario de contacto"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy-950/10 text-navy-900 transition-colors hover:bg-navy-50"
              >
                <Icon name="close" className="h-4.5 w-4.5" />
              </button>
            </div>

            {lead.isSuccess ? (
              <div className="mt-6 space-y-4">
                <Alert tone="success" title="Mensaje enviado">
                  Registramos tu solicitud con el radicado{' '}
                  <strong className="font-semibold">{lead.data.id}</strong>. Enviamos la copia a{' '}
                  {lead.data.email}.
                </Alert>
                <p className="text-sm text-navy-900/70">
                  Una persona del equipo comercial te contactará en menos de 24 horas hábiles. Si ya
                  tienes cuenta, puedes revisar tus mensajes en tu panel.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="navy" onClick={onClose} className="w-full sm:w-auto">
                    Entendido
                  </Button>
                  <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto">
                    Cerrar
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <TextInput
                  ref={firstFieldRef}
                  name="name"
                  label="Nombre completo"
                  placeholder="Ana Martínez"
                  autoComplete="name"
                  error={errors.name}
                  required
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    name="email"
                    type="email"
                    label="Correo electrónico"
                    placeholder="ana@correo.com"
                    autoComplete="email"
                    error={errors.email}
                    required
                  />
                  <TextInput
                    name="phone"
                    type="tel"
                    label="Teléfono (opcional)"
                    placeholder="300 000 0000"
                    autoComplete="tel"
                  />
                </div>
                <TextAreaField
                  name="message"
                  label="Mensaje"
                  placeholder="Hola, me interesa este inmueble y quisiera agendar una visita."
                  error={errors.message}
                  defaultValue={
                    property
                      ? `Hola, me interesa el inmueble ${property.id} (${property.title}) en ${property.neighborhood}.`
                      : ''
                  }
                  required
                />

                {lead.isError ? (
                  <Alert tone="error" title="No pudimos enviar el mensaje">
                    Intenta de nuevo en unos segundos o escríbenos a hola@mercadoinmueble.com.
                  </Alert>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="order-2 text-xs text-navy-900/55 sm:order-1">
                    Tus datos se usan solo para responder esta solicitud.
                  </p>
                  <Button
                    type="submit"
                    icon={lead.isPending ? undefined : 'arrowRight'}
                    disabled={lead.isPending}
                    className="order-1 w-full sm:order-2 sm:w-auto"
                  >
                    {lead.isPending ? 'Enviando…' : 'Enviar mensaje'}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
