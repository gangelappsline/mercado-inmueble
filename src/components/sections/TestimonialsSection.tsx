import { Icon } from '@/components/ui/Icon'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { testimonials } from '@/data/platform'

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-22">
      <div className="container-page">
        <SectionHeading
          eyebrow="Voces del mercado"
          title="Lo que dicen quienes ya la están usando"
          description="Inmobiliarias, vendedores independientes y compradores que probaron la plataforma durante la etapa piloto."
          align="center"
        />

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.author} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-navy-950/8 bg-navy-50/60 p-6 transition-shadow duration-300 hover:shadow-card sm:p-7">
                <Icon name="quote" className="h-7 w-7 text-brand-500/80" />
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-navy-900/85">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-950/8 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-900 text-sm font-bold text-white">
                    {testimonial.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy-950">{testimonial.author}</span>
                    <span className="block text-xs text-navy-900/60">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
