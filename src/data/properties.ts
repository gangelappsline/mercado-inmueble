import aptoBalcones from '@/assets/properties/apto-balcones.jpg'
import aptoPanoramico from '@/assets/properties/apto-panoramico.jpg'
import casaJardin from '@/assets/properties/casa-jardin.jpg'
import edificioFachada from '@/assets/properties/edificio-fachada.jpg'
import penthouseTerraza from '@/assets/penthouse-terraza.jpg'
import salaInterior from '@/assets/properties/sala-interior.jpg'

export type Operation = 'Venta' | 'Arriendo'

export type Property = {
  id: string
  title: string
  city: string
  neighborhood: string
  operation: Operation
  type: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  parking: number
  image: string
  publisher: string
  publisherType: 'Inmobiliaria' | 'Vendedor independiente'
  publishedDaysAgo: number
  tags: string[]
}

export const properties: Property[] = [
  {
    id: 'MI-1042',
    title: 'Apartamento con balcón en edificio nuevo',
    city: 'Medellín',
    neighborhood: 'El Poblado',
    operation: 'Venta',
    type: 'Apartamento',
    price: 685_000_000,
    area: 96,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    image: aptoBalcones,
    publisher: 'Arrendar Group',
    publisherType: 'Inmobiliaria',
    publishedDaysAgo: 3,
    tags: ['Balcón', 'Ascensor', 'Zona social'],
  },
  {
    id: 'MI-2381',
    title: 'Casa campestre con jardín y estudio',
    city: 'Rionegro',
    neighborhood: 'Llanogrande',
    operation: 'Venta',
    type: 'Casa',
    price: 1_250_000_000,
    area: 280,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    image: casaJardin,
    publisher: 'Camilo Duarte',
    publisherType: 'Vendedor independiente',
    publishedDaysAgo: 8,
    tags: ['Jardín', 'Estudio', 'Lote amplio'],
  },
  {
    id: 'MI-3310',
    title: 'Apartaestudio amoblado cerca al centro',
    city: 'Bogotá',
    neighborhood: 'Chapinero Alto',
    operation: 'Arriendo',
    type: 'Apartamento',
    price: 2_450_000,
    area: 52,
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    image: salaInterior,
    publisher: 'Norte Propiedades',
    publisherType: 'Inmobiliaria',
    publishedDaysAgo: 2,
    tags: ['Amoblado', 'Piso alto', 'Vigilancia'],
  },
  {
    id: 'MI-1187',
    title: 'Oficina lista para estrenar en edificio empresarial',
    city: 'Medellín',
    neighborhood: 'Laureles',
    operation: 'Arriendo',
    type: 'Oficina',
    price: 6_900_000,
    area: 140,
    bedrooms: 0,
    bathrooms: 2,
    parking: 3,
    image: edificioFachada,
    publisher: 'Grupo Andina Inmobiliaria',
    publisherType: 'Inmobiliaria',
    publishedDaysAgo: 12,
    tags: ['Salas de juntas', 'Aire acondicionado'],
  },
  {
    id: 'MI-2764',
    title: 'Penthouse panorámico con terraza privada',
    city: 'Cartagena',
    neighborhood: 'Bocagrande',
    operation: 'Venta',
    type: 'Apartamento',
    price: 1_890_000_000,
    area: 175,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    image: penthouseTerraza,
    publisher: 'Costa Living Realty',
    publisherType: 'Inmobiliaria',
    publishedDaysAgo: 5,
    tags: ['Terraza', 'Vista al mar', 'Jacuzzi'],
  },
  {
    id: 'MI-3521',
    title: 'Apartamento luminoso en torre residencial',
    city: 'Cali',
    neighborhood: 'Granada',
    operation: 'Arriendo',
    type: 'Apartamento',
    price: 3_100_000,
    area: 78,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    image: aptoPanoramico,
    publisher: 'Valle Hogar Propiedades',
    publisherType: 'Inmobiliaria',
    publishedDaysAgo: 1,
    tags: ['Piso alto', 'Gimnasio', 'Portería 24/7'],
  },
]

export const operationFilters: Array<'Todas' | Operation> = ['Todas', 'Venta', 'Arriendo']

export const cityOptions = [
  'Todas las ciudades',
  ...Array.from(new Set(properties.map((property) => property.city))),
]

export const typeOptions = [
  'Todos',
  ...Array.from(new Set(properties.map((property) => property.type))),
]
