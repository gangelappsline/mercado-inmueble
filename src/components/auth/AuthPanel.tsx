import penthouseImage from '@/assets/penthouse-terraza.jpg'
import { Icon } from '@/components/ui/Icon'

const highlights = [
  'Publica, edita y pausa tus inmuebles cuando quieras',
  'Recibe los contactos de cada interesado en tu bandeja',
  'Sigue el rendimiento de tus publicaciones con métricas claras',
]

export function AuthPanel() {
  return (
    <aside className="relative order-2 flex flex-col overflow-hidden rounded-[2rem] bg-navy-950 text-white shadow-soft lg:order-1">
      <img
        src={penthouseImage}
        alt="Terraza de un penthouse con vista a la ciudad al atardecer"
        loading="lazy"
        decoding="async"
        className="h-52 w-full object-cover sm:h-64 lg:h-72"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-linear-to-b from-navy-950/70 to-transparent sm:h-64 lg:h-72" />

      <div className="relative flex flex-1 flex-col gap-6 p-7 sm:p-8">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-brand-300 uppercase">
            Tu centro de operaciones
          </p>
          <h2 className="mt-3 text-2xl font-extrabold leading-snug">
            Un solo acceso para tu inventario, tus contactos y tus métricas
          </h2>
        </div>

        <ul className="space-y-3.5">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-navy-100/85">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                <Icon name="check" className="h-3.5 w-3.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <figure className="mt-auto rounded-3xl border border-white/12 bg-white/5 p-5 backdrop-blur-sm">
          <Icon name="quote" className="h-6 w-6 text-brand-400/80" />
          <blockquote className="mt-3 text-sm leading-relaxed text-navy-100/85">
            “Cargamos el portafolio completo de la oficina en dos tardes y ahora todos los asesores
            trabajan sobre la misma información.”
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white">
              LR
            </span>
            <span className="text-xs">
              <span className="block font-bold text-white">Laura Restrepo</span>
              <span className="block text-navy-100/65">Arrendar Group</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </aside>
  )
}
