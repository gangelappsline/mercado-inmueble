import { Icon } from '@/components/ui/Icon'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { steps } from '@/data/platform'

export function StepsSection() {
  return (
    <section id="como-funciona" className="scroll-mt-24 py-16 lg:py-22">
      <div className="container-page">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="De la publicación al cierre, en tres pasos"
          description="Sin procesos largos ni herramientas separadas: la misma plataforma acompaña todo el ciclo del negocio inmobiliario."
          align="center"
        />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute top-14 right-[12%] left-[12%] hidden border-t-2 border-dashed border-navy-950/12 lg:block"
          />

          <Stagger className="relative grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <StaggerItem key={step.number} className="h-full">
                <article className="flex h-full flex-col items-center rounded-3xl border border-navy-950/8 bg-white px-6 py-8 text-center shadow-card">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-lg font-extrabold text-white">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy-950">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-navy-900/70">{step.description}</p>
                  <p className="mt-4 flex items-start gap-2 rounded-2xl bg-navy-50 px-4 py-3 text-left text-xs leading-relaxed text-navy-900/75">
                    <Icon name="sparkles" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {step.detail}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
