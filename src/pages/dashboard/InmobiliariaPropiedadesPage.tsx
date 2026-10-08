import { useState } from 'react'
import { DashboardEmptyState } from '@/components/dashboard/DashboardEmptyState'
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { DashboardStat } from '@/components/dashboard/DashboardStat'
import {
  PropertyListItem,
  PropertyListItemSkeleton,
} from '@/components/dashboard/PropertyListItem'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/auth'
import { useProperties } from '@/hooks/queries'
import { formatNumber } from '@/lib/format'

/** Panel de la inmobiliaria: el portafolio de inmuebles que gestiona. */
export function InmobiliariaPropiedadesPage() {
  const { session } = useAuth()
  const propertiesQuery = useProperties({})
  const [showPublishHint, setShowPublishHint] = useState(false)

  const portfolio = (propertiesQuery.data ?? []).filter(
    (property) => property.publisherType === 'Inmobiliaria',
  )
  const forSale = portfolio.filter((property) => property.operation === 'Venta').length
  const cities = new Set(portfolio.map((property) => property.city)).size

  return (
    <div className="container-page space-y-10 py-10 lg:py-14">
      <DashboardPageHeader
        eyebrow="Panel de la inmobiliaria"
        title="Propiedades del portafolio"
        description={`Gestiona el portafolio completo de inmuebles${session?.name ? ` de ${session.name}` : ''}: publicaciones, precios y ciencia de contacto.`}
        actions={
          <Button icon="plus" onClick={() => setShowPublishHint((value) => !value)}>
            Agregar inmueble
          </Button>
        }
      />

      {showPublishHint ? (
        <Alert tone="info" title="Alta de inmuebles">
          El formulario para agregar inmuebles al portafolio estará disponible muy pronto. Mientras
          tanto, el portafolio activo aparece listado abajo.
        </Alert>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardStat
          icon="building"
          label="Inmuebles en portafolio"
          value={formatNumber(portfolio.length)}
          hint="Publicaciones activas"
        />
        <DashboardStat
          icon="trending"
          label="En venta"
          value={formatNumber(forSale)}
          hint="Publicadas para venta"
        />
        <DashboardStat
          icon="mapPin"
          label="Ciudades cubiertas"
          value={formatNumber(cities)}
          hint="Presencia del portafolio"
        />
      </div>

      <section aria-labelledby="inmobiliaria-portafolio" className="space-y-5">
        <h2
          id="inmobiliaria-portafolio"
          className="text-xl font-extrabold text-navy-950 sm:text-2xl"
        >
          Publicaciones del portafolio
        </h2>

        <div className="grid gap-4">
          {propertiesQuery.isPending ? (
            Array.from({ length: 3 }, (_, index) => <PropertyListItemSkeleton key={index} />)
          ) : portfolio.length > 0 ? (
            portfolio.map((property) => (
              <PropertyListItem key={property.id} property={property} badge={property.city} />
            ))
          ) : (
            <DashboardEmptyState
              icon="building"
              title="El portafolio está vacío"
              description="Cuando se agreguen inmuebles a la inmobiliaria aparecerán aquí para su gestión."
            />
          )}
        </div>
      </section>
    </div>
  )
}
