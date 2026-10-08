import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader'
import { DashboardStat } from '@/components/dashboard/DashboardStat'
import {
  PropertyListItem,
  PropertyListItemSkeleton,
} from '@/components/dashboard/PropertyListItem'
import { ButtonLink } from '@/components/ui/Button'
import { useAuth } from '@/context/auth'
import { useFeaturedProperties } from '@/hooks/queries'
import { formatNumber } from '@/lib/format'

/** Panel del cliente: favoritos, contactos e inmuebles destacados. */
export function ClientePanelPage() {
  const { session } = useAuth()
  const featured = useFeaturedProperties()
  const highlights = featured.data?.slice(0, 4) ?? []

  return (
    <div className="container-page space-y-10 py-10 lg:py-14">
      <DashboardPageHeader
        eyebrow="Panel del cliente"
        title={<>Hola, {session?.name ?? 'bienvenido'} 👋</>}
        description="Guarda tus favoritos, haz seguimiento a tus contactos y encuentra el próximo inmueble."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardStat
          icon="building"
          label="Inmuebles en el catálogo"
          value={formatNumber(featured.data?.length ?? 0)}
          hint="Publicados y verificados"
        />
        <DashboardStat
          icon="heart"
          label="Favoritos guardados"
          value="0"
          hint="Aún no has guardado inmuebles"
        />
        <DashboardStat
          icon="chat"
          label="Contactos enviados"
          value="0"
          hint="Mensajes a publicantes"
        />
      </div>

      <section aria-labelledby="cliente-destacados" className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="cliente-destacados" className="text-xl font-extrabold text-navy-950 sm:text-2xl">
            Inmuebles destacados
          </h2>
          <ButtonLink to="/plataforma#propiedades" variant="outline" size="sm" icon="search">
            Explorar catálogo
          </ButtonLink>
        </div>

        <div className="grid gap-4">
          {featured.isPending
            ? Array.from({ length: 3 }, (_, index) => <PropertyListItemSkeleton key={index} />)
            : highlights.map((property) => <PropertyListItem key={property.id} property={property} />)}
        </div>
      </section>
    </div>
  )
}
