import { stats } from '@/data/platform'
import { Reveal } from '@/components/ui/Reveal'

export function StatsStrip() {
  return (
    <section className="border-y border-navy-950/8 bg-navy-50/60">
      <div className="container-page grid grid-cols-2 gap-6 py-9 sm:grid-cols-4 lg:py-10">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.06}>
            <div className="text-center sm:text-left">
              <p className="text-2xl font-extrabold text-navy-900 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium tracking-wide text-navy-900/60 uppercase">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
