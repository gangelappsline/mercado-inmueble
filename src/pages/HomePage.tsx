import { AudiencePreview } from '@/components/sections/AudiencePreview'
import { CtaBand } from '@/components/sections/CtaBand'
import { FeaturesGrid } from '@/components/sections/FeaturesGrid'
import { Hero } from '@/components/sections/Hero'
import { PropertiesSection } from '@/components/sections/PropertiesSection'
import { StatsStrip } from '@/components/sections/StatsStrip'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <AudiencePreview />

      <section className="py-16 lg:py-22">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Capacidades"
              title="Lo que puedes hacer dentro de la plataforma"
              description="Herramientas concretas para publicar, buscar y gestionar inmuebles, sin planillas ni procesos manuales."
            />
            <Reveal>
              <ButtonLink to="/plataforma" variant="outline" icon="arrowRight">
                Ver todo lo que ofrecemos
              </ButtonLink>
            </Reveal>
          </div>

          <FeaturesGrid limit={3} className="mt-12" />
        </div>
      </section>

      <PropertiesSection variant="preview" />
      <CtaBand />
    </>
  )
}
