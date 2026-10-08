import { useMemo, useState } from 'react'
import { ContactDialog } from '@/components/properties/ContactDialog'
import { PropertyCard, PropertyCardSkeleton } from '@/components/properties/PropertyCard'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { SelectField } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  cityOptions,
  operationFilters,
  typeOptions,
  type Operation,
  type Property,
} from '@/data/properties'
import { useFeaturedProperties, useProperties } from '@/hooks/queries'
import { cn } from '@/lib/cn'

type PropertiesSectionProps = {
  variant?: 'preview' | 'full'
}

export function PropertiesSection({ variant = 'full' }: PropertiesSectionProps) {
  const isFull = variant === 'full'

  const [operation, setOperation] = useState<'Todas' | Operation>('Todas')
  const [type, setType] = useState('Todos')
  const [city, setCity] = useState(cityOptions[0])
  const [contactProperty, setContactProperty] = useState<Property | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const featured = useFeaturedProperties()

  const query = useMemo(
    () => ({ operation, type, city: city ?? cityOptions[0] }),
    [operation, type, city],
  )
  const search = useProperties(query)

  const previewItems = featured.data?.slice(0, 3) ?? []
  const active = isFull ? search : featured
  const items = isFull ? (search.data ?? []) : previewItems

  function handleContact(property: Property) {
    setContactProperty(property)
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setContactProperty(null)
  }

  return (
    <section id="propiedades" className="scroll-mt-24 bg-navy-50/50 py-16 lg:py-22">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={isFull ? 'Inventario en vivo' : 'Propiedades publicadas'}
            title={isFull ? 'Explora el inventario publicado' : 'Así se ven las publicaciones'}
            description={
              isFull
                ? 'Filtra por operación, tipo de inmueble y ciudad. Todo lo que ves lo publicaron inmobiliarias y vendedores independientes registrados.'
                : 'Cada inmueble incluye fotos, características, precio, quién lo publica y un canal de contacto directo.'
            }
          />

          {isFull ? (
            <Reveal>
              <p className="flex items-center gap-2 text-sm text-navy-900/60">
                <Icon name="filter" className="h-4 w-4 text-brand-500" />
                Los resultados se actualizan sin recargar la página
              </p>
            </Reveal>
          ) : (
            <ButtonLink to="/plataforma#propiedades" variant="outline" icon="arrowRight">
              Ver todo el inventario
            </ButtonLink>
          )}
        </div>

        {isFull ? (
          <Reveal className="mt-9">
            <div className="rounded-3xl border border-navy-950/8 bg-white p-4 shadow-card sm:p-5">
              <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
                <div>
                  <p className="mb-2 text-xs font-bold tracking-[0.16em] text-navy-900/50 uppercase">
                    Operación
                  </p>
                  <div
                    role="group"
                    aria-label="Filtrar por tipo de operación"
                    className="flex rounded-full bg-navy-50 p-1"
                  >
                    {operationFilters.map((option) => {
                      const selected = option === operation
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setOperation(option)}
                          className={cn(
                            'flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                            selected
                              ? 'bg-navy-900 text-white shadow-sm'
                              : 'text-navy-900/70 hover:text-navy-900',
                          )}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <SelectField
                  name="tipo"
                  label="Tipo de inmueble"
                  options={typeOptions}
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                />

                <SelectField
                  name="ciudad"
                  label="Ciudad"
                  options={cityOptions}
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
            </div>
          </Reveal>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Badge tone="navy" icon={<Icon name="list" className="h-3.5 w-3.5" />}>
            {active.isPending
              ? 'Cargando inmuebles…'
              : `${items.length} ${items.length === 1 ? 'inmueble' : 'inmuebles'}`}
          </Badge>
          <Badge tone="neutral" icon={<Icon name="sparkles" className="h-3.5 w-3.5 text-brand-500" />}>
            Datos de demostración
          </Badge>
          {isFull && search.isFetching && !search.isPending ? (
            <span className="text-xs font-medium text-navy-900/55">Actualizando resultados…</span>
          ) : null}
        </div>

        <div
          className={cn(
            'mt-5 grid gap-6 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3',
            isFull && search.isPlaceholderData ? 'opacity-60' : 'opacity-100',
          )}
        >
          {active.isPending
            ? Array.from({ length: isFull ? 6 : 3 }).map((_, index) => (
                <PropertyCardSkeleton key={`skeleton-${index}`} />
              ))
            : items.map((property) => (
                <Reveal key={property.id} className="h-full" y={18}>
                  <PropertyCard property={property} onContact={handleContact} />
                </Reveal>
              ))}
        </div>

        {!active.isPending && items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-navy-950/15 bg-white p-10 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-navy-50 text-navy-900">
              <Icon name="search" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-navy-950">No encontramos inmuebles con esos filtros</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-navy-900/65">
              Prueba cambiando la operación, el tipo de inmueble o la ciudad para ampliar los resultados.
            </p>
            <button
              type="button"
              onClick={() => {
                setOperation('Todas')
                setType('Todos')
                setCity(cityOptions[0])
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              <Icon name="filter" className="h-4 w-4" />
              Limpiar filtros
            </button>
          </div>
        ) : null}

        {!isFull ? (
          <div className="mt-10 flex justify-center">
            <ButtonLink to="/login" size="lg" icon="arrowRight">
              Publicar mi inmueble
            </ButtonLink>
          </div>
        ) : null}
      </div>

      <ContactDialog open={dialogOpen} onClose={closeDialog} property={contactProperty} />
    </section>
  )
}
