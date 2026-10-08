import { Link } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'
import { Icon } from '@/components/ui/Icon'
import { footerColumns, site } from '@/data/site'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-navy-500/25 blur-3xl" />

      <div className="container-page relative py-14 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.6fr]">
          <div className="max-w-md">
            <Logo to="/" tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-navy-100/75">{site.description}</p>

            <ul className="mt-7 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-navy-100/85 transition-colors hover:text-white"
                >
                  <Icon name="mail" className="h-4.5 w-4.5 text-brand-400" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2.5 text-navy-100/85 transition-colors hover:text-white"
                >
                  <Icon name="phone" className="h-4.5 w-4.5 text-brand-400" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-navy-100/85">
                <Icon name="mapPin" className="mt-0.5 h-4.5 w-4.5 text-brand-400" />
                {site.address}
              </li>
              <li className="flex items-start gap-2.5 text-navy-100/85">
                <Icon name="clock" className="mt-0.5 h-4.5 w-4.5 text-brand-400" />
                {site.hours}
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={'hash' in link && link.hash ? `${link.to}#${link.hash}` : link.to}
                        className="text-navy-100/75 transition-colors hover:text-brand-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-navy-100/60">
            © {year} {site.name}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-2">
            {site.social.map((network) => (
              <a
                key={network.label}
                href={network.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-navy-100/80 transition-colors hover:border-brand-400/60 hover:text-white"
              >
                {network.label}
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
