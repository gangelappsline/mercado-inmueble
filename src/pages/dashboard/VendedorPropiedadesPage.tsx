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

/** Panel del vendedor independiente: sus publicaciones activas. */
export function VendedorPropiedadesPage() {
  const { session } = useAuth()
  const propertiesQuery = useProperties({})
  const [showPublishHint, setShowPublishHint] = useState(false)

  const mine = (propertiesQuery.data ?? []).filter(
    (property) => property.publisherType === 'Vendedor independiente',
  )
  const forSale = mine.filter((property) => property.operation === 'Venta').length
  const forRent = mine.length - forSale

  return (
    <div className="container-page space-y-10 py-10 lg:py-14">
      <DashboardPageHeader
        eyebrow="Panel del vendedor"
        title="Mis propiedades"
        description={`Administra tus publicaciones, precios y contactos desde un solo lugar${session?.name ? `, ${session.name}` : ''}.`}
        actions={
          <Button icon="plus" onClick={() => setShowPublishHint((value) => !value)}>
            Publicar inmueble
          </Button>
        }
      />

      {showPublishHint ? (
        <Alert tone="info" title="Publicación de inmuebles">
          El formulario para publicar un nuevo inmueble estará disponible muy pronto. Mientras
          tanto, tus publicaciones activas aparecen listadas abajo.
        </Alert>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardStat
          icon="publish"
          label="Mis publicaciones"
          value={formatNumber(mine.length)}
          hint="Inmuebles activos"
        />
        <DashboardStat
          icon="trending"
          label="En venta"
          value={formatNumber(forSale)}
          hint="Publicadas para venta"
        />
        <DashboardStat
          icon="clock"
          label="En arriendo"
          value={formatNumber(forRent)}
          hint="Publicadas para arriendo"
        />
      </div>

      <section aria-labelledby="vendedor-publicaciones" className="space-y-5">
        <h2 id="vendedor-publicaciones" className="text-xl font-extrabold text-navy-950 sm:text-2xl">
          Publicaciones activas
        </h2>

        <div className="grid gap-4">
          {propertiesQuery.isPending ? (
            Array.from({ length: 2 }, (_, index) => <PropertyListItemSkeleton key={index} />)
          ) : mine.length > 0 ? (
            mine.map((property) => (
              <PropertyListItem key={property.id} property={property} badge={property.type} />
            ))
          ) : (
            <DashboardEmptyState
              icon="publish"
              title="Aún no tienes publicaciones"
              description="Cuando publiques tu primer inmueble aparecerá aquí para que gestiones precios, fotos y contactos."
            />
          )}
        </div>
      </section>
    </div>
  )
}
