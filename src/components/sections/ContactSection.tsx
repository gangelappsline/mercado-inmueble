import { useState } from 'react'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { SelectField, TextAreaField, TextInput } from '@/components/ui/Field'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/data/site'
import { useCreateLead } from '@/hooks/queries'
import type { LeadProfile } from '@/lib/api'

type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const profileOptions: Array<{ value: LeadProfile; label: string }> = [
  { value: 'cliente', label: 'Quiero comprar o arrendar' },
  { value: 'vendedor', label: 'Soy vendedor independiente' },
  { value: 'inmobiliaria', label: 'Represento una inmobiliaria' },
]

const channels: Array<{ icon: IconName; label: string; value: string; href: string }> = [
  { icon: 'mail', label: 'Correo', value: site.email, href: `mailto:${site.email}` },
  { icon: 'phone', label: 'Teléfono', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
  { icon: 'whatsapp', label: 'WhatsApp', value: site.whatsapp, href: 'https://wa.me/573105550198' },
  { icon: 'mapPin', label: 'Oficina', value: site.address, href: '#contacto' },
]

export function ContactSection() {
  const [errors, setErrors] = useState<FormErrors>({})
  const lead = useCreateLead()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const profile = String(form.get('profile') ?? 'cliente') as LeadProfile
    const message = String(form.get('message') ?? '').trim()

    const nextErrors: FormErrors = {}
    if (name.length < 3) nextErrors.name = 'Escribe tu nombre completo.'
    if (!emailPattern.test(email)) nextErrors.email = 'Revisa el correo electrónico.'
    if (message.length < 15) nextErrors.message = 'Cuéntanos un poco más sobre lo que necesitas.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    lead.mutate({ name, email, profile, message })
  }

  return (
    <section id="contacto" className="scroll-mt-24 bg-navy-50/60 py-16 lg:py-22">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contacto"
            title="Conversemos sobre lo que necesitas"
            description="Escríbenos para resolver dudas, pedir una demostración guiada o conocer los planes para inmobiliarias. Respondemos en menos de 24 horas hábiles."
          />

          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {channels.map((channel) => (
              <Reveal key={channel.label}>
                <li>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="flex h-full gap-3.5 rounded-3xl border border-navy-950/8 bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon name={channel.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold tracking-[0.16em] text-navy-900/50 uppercase">
                        {channel.label}
                      </span>
                      <span className="mt-1 block text-sm font-medium text-navy-950">
                        {channel.value}
                      </span>
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.15}>
            <p className="mt-8 flex items-center gap-2.5 text-sm text-navy-900/65">
              <Icon name="clock" className="h-4.5 w-4.5 text-brand-500" />
              {site.hours}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-[2rem] border border-navy-950/8 bg-white p-6 shadow-soft sm:p-8">
            <h3 className="text-xl font-extrabold text-navy-950">Solicita información</h3>
            <p className="mt-1.5 text-sm text-navy-900/65">
              Completa el formulario y te contactamos con una propuesta a tu medida.
            </p>

            {lead.isSuccess ? (
              <div className="mt-6 space-y-5">
                <Alert tone="success" title="¡Recibimos tu solicitud!">
                  Guardamos tu radicado <strong className="font-semibold">{lead.data.id}</strong> y
                  enviamos la confirmación a {lead.data.email}.
                </Alert>
                <Button variant="navy" onClick={() => lead.reset()} icon="arrowRight">
                  Enviar otra solicitud
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <TextInput
                  name="name"
                  label="Nombre completo"
                  placeholder="Tu nombre"
                  autoComplete="name"
                  error={errors.name}
                  required
                />
                <TextInput
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  error={errors.email}
                  required
                />
                <SelectField name="profile" label="¿Cuál es tu perfil?" options={profileOptions} />
                <TextAreaField
                  name="message"
                  label="¿En qué te podemos ayudar?"
                  placeholder="Cuéntanos sobre tu portafolio, tu inmueble o lo que estás buscando."
                  error={errors.message}
                  required
                />

                {lead.isError ? (
                  <Alert tone="error" title="No pudimos enviar el formulario">
                    Intenta nuevamente o escríbenos a {site.email}.
                  </Alert>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  icon={lead.isPending ? undefined : 'arrowRight'}
                  disabled={lead.isPending}
                  className="w-full"
                >
                  {lead.isPending ? 'Enviando…' : 'Enviar solicitud'}
                </Button>
                <p className="text-center text-xs text-navy-900/55">
                  Al enviar aceptas que te contactemos por correo o teléfono.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
