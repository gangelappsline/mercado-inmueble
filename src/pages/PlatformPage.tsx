import { AudiencesSection } from '@/components/sections/AudiencesSection'
import { BenefitsSection } from '@/components/sections/BenefitsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { CtaBand } from '@/components/sections/CtaBand'
import { FeaturesGrid } from '@/components/sections/FeaturesGrid'
import { PlatformHero } from '@/components/sections/PlatformHero'
import { PropertiesSection } from '@/components/sections/PropertiesSection'
import { StepsSection } from '@/components/sections/StepsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function PlatformPage() {
  return (
    <>
      <PlatformHero />

      <section id="audiencias" className="scroll-mt-24 py-16 lg:py-22">
        <div className="container-page">
          <SectionHeading
            eyebrow="Perfiles de la plataforma"
            title="Elige cómo quieres usar Mercado Inmueble"
            description="Los tres perfiles comparten el mismo inventario, pero cada uno tiene su propio tablero, permisos y herramientas de trabajo."
          />
          <div className="mt-12">
            <AudiencesSection />
          </div>
        </div>
      </section>

      <section id="capacidades" className="scroll-mt-24 bg-navy-50/50 py-16 lg:py-22">
        <div className="container-page">
          <SectionHeading
            eyebrow="Qué incluye la plataforma"
            title="Seis capacidades que resuelven el día a día"
            description="Desde la publicación del inmueble hasta el seguimiento de cada interesado, todo ocurre en el mismo lugar."
            align="center"
          />
          <FeaturesGrid className="mt-12" />
        </div>
      </section>

      <StepsSection />
      <PropertiesSection variant="full" />
      <BenefitsSection />
      <TestimonialsSection />
      <ContactSection />

      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  )
}
