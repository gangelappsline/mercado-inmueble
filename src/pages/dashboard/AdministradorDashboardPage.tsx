import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { DashboardStat } from '@/components/dashboard/DashboardStat'
import {
  PropertyListItem,
  PropertyListItemSkeleton,
} from '@/components/dashboard/PropertyListItem'
import { useAuth } from '@/context/auth'
import { useProperties } from '@/hooks/queries'
import { formatNumber } from '@/lib/format'

/** Panel del administrador: métricas globales y publicaciones recientes. */
export function AdministradorDashboardPage() {
  const { session } = useAuth()
  const propertiesQuery = useProperties({})

  const all = propertiesQuery.data ?? []
  const inmobiliarias = all.filter((property) => property.publisherType === 'Inmobiliaria').length
  const vendedores = all.filter(
    (property) => property.publisherType === 'Vendedor independiente',
  ).length
  const cities = new Set(all.map((property) => property.city)).size
  const recent = [...all]
    .sort((a, b) => a.publishedDaysAgo - b.publishedDaysAgo)
    .slice(0, 5)

  return (
    <div className="container-page space-y-10 py-10 lg:py-14">
      <DashboardPageHeader
        eyebrow="Panel del administrador"
        title="Dashboard general"
        description={`Vista global de la plataforma para ${session?.name ?? 'el equipo administrador'}: actividad, publicaciones y publicantes.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStat
          icon="building"
          label="Inmuebles publicados"
          value={formatNumber(all.length)}
          hint="En todo el catálogo"
        />
        <DashboardStat
          icon="verified"
          label="Inmobiliarias"
          value={formatNumber(inmobiliarias)}
          hint="Publicando en la plataforma"
        />
        <DashboardStat
          icon="user"
          label="Vendedores independientes"
          value={formatNumber(vendedores)}
          hint="Publicando por su cuenta"
        />
        <DashboardStat
          icon="mapPin"
          label="Ciudades cubiertas"
          value={formatNumber(cities)}
          hint="Presencia nacional"
        />
      </div>

      <section aria-labelledby="admin-recientes" className="space-y-5">
        <h2 id="admin-recientes" className="text-xl font-extrabold text-navy-950 sm:text-2xl">
          Publicaciones recientes
        </h2>

        <div className="grid gap-4">
          {propertiesQuery.isPending
            ? Array.from({ length: 3 }, (_, index) => <PropertyListItemSkeleton key={index} />)
            : recent.map((property) => (
                <PropertyListItem
                  key={property.id}
                  property={property}
                  badge={property.publisher}
                />
              ))}
        </div>
      </section>
    </div>
  )
}
