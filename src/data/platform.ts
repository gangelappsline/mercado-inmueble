export type Audience = {
  id: 'clientes' | 'vendedores' | 'inmobiliarias'
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  cta: { label: string; to: string; hash?: string }
  featured?: boolean
}

export const audiences: Audience[] = [
  {
    id: 'clientes',
    eyebrow: 'Clientes',
    title: 'Encuentra el inmueble correcto, sin intermediarios innecesarios',
    description:
      'Explora el inventario completo de todas las inmobiliarias y vendedores registrados, guarda tus favoritos y contacta al responsable de cada propiedad.',
    bullets: [
      'Búsqueda por ciudad, barrio, precio, área y tipo de inmueble',
      'Fichas con fotos, características, ubicación y quién publica',
      'Contacto directo por formulario o WhatsApp, sin registros previos',
    ],
    cta: { label: 'Explorar propiedades', to: '/plataforma', hash: 'propiedades' },
  },
  {
    id: 'vendedores',
    eyebrow: 'Vendedores independientes',
    title: 'Publica tu inmueble y administra tus interesados',
    description:
      'Si vendes o arriendas por tu cuenta, publica tu propiedad en minutos y recibe los contactos de las personas interesadas en un solo lugar.',
    bullets: [
      'Publicación guiada con fotos, precio y características',
      'Edición de precio y disponibilidad cuando quieras',
      'Historial de contactos recibidos y su estado de gestión',
    ],
    cta: { label: 'Publicar mi inmueble', to: '/login' },
    featured: true,
  },
  {
    id: 'inmobiliarias',
    eyebrow: 'Inmobiliarias',
    title: 'Centraliza todo tu inventario y el trabajo de tu equipo',
    description:
      'Administra el portafolio completo de la oficina, asigna responsables a cada inmueble y controla el rendimiento de tus asesores.',
    bullets: [
      'Inventario compartido con roles para asesores y administradores',
      'Asignación de inmuebles y seguimiento de cada publicación',
      'Reportes de visitas, contactos y propiedades más consultadas',
    ],
    cta: { label: 'Hablar con el equipo', to: '/plataforma', hash: 'contacto' },
  },
]

export type Feature = {
  id: string
  title: string
  description: string
  icon:
    | 'publish'
    | 'search'
    | 'team'
    | 'chat'
    | 'chart'
    | 'verified'
}

export const features: Feature[] = [
  {
    id: 'publicacion',
    title: 'Publicación guiada',
    description:
      'Un formulario paso a paso que te pide exactamente lo que el cliente necesita ver: fotos, precio, área, ubicación y características.',
    icon: 'publish',
  },
  {
    id: 'busqueda',
    title: 'Búsqueda con filtros',
    description:
      'Filtra por operación (venta o arriendo), tipo de inmueble, habitaciones, rango de precio y ciudad para llegar rápido a lo que buscas.',
    icon: 'search',
  },
  {
    id: 'gestion',
    title: 'Gestión de inventario y equipos',
    description:
      'Organiza todas tus propiedades en un tablero, asígnalas a tus asesores y actualiza su estado: disponible, en negociación o cerrada.',
    icon: 'team',
  },
  {
    id: 'contacto',
    title: 'Contacto directo',
    description:
      'Cada publicación tiene un canal de contacto claro hacia el responsable, con el historial de conversaciones dentro de la plataforma.',
    icon: 'chat',
  },
  {
    id: 'metricas',
    title: 'Métricas de rendimiento',
    description:
      'Consulta cuántas personas vieron tu inmueble, cuántas guardaron como favorito y cuántos contactos generó cada publicación.',
    icon: 'chart',
  },
  {
    id: 'verificacion',
    title: 'Publicaciones verificadas',
    description:
      'Revisamos identidad y datos de contacto del publicante para reducir anuncios falsos y dar confianza a los compradores.',
    icon: 'verified',
  },
]

export type Step = {
  number: string
  title: string
  description: string
  detail: string
}

export const steps: Step[] = [
  {
    number: '01',
    title: 'Crea tu cuenta',
    description: 'Regístrate como cliente, vendedor independiente o inmobiliaria.',
    detail: 'Un solo registro habilita el perfil que necesitas; puedes cambiarlo más adelante.',
  },
  {
    number: '02',
    title: 'Publica o explora',
    description: 'Sube tu inmueble con fotos y datos, o busca entre el inventario disponible.',
    detail: 'Nuestro formulario te marca qué campos faltan antes de publicar.',
  },
  {
    number: '03',
    title: 'Cierra el negocio',
    description: 'Gestiona los contactos, agenda visitas y da seguimiento hasta el cierre.',
    detail: 'Los interesados llegan directo a tu bandeja, con su información de contacto.',
  },
]

export type Benefit = {
  title: string
  description: string
}

export const benefits: Benefit[] = [
  {
    title: 'Un mercado, todos los inventarios',
    description:
      'Los clientes dejan de saltar entre decenas de sitios: inmobiliarias y vendedores independientes publican en un mismo lugar.',
  },
  {
    title: 'Menos anuncios vencidos',
    description:
      'Las publicaciones tienen fecha de vigencia y los propios publicantes actualizan su estado, así el inventario se mantiene confiable.',
  },
  {
    title: 'Datos para decidir precios',
    description:
      'Comparamos precios por zona y tipo de inmueble para que sepas si tu propiedad está bien ubicada en el mercado.',
  },
  {
    title: 'Trazabilidad de cada contacto',
    description:
      'Siempre queda claro qué cliente escribió, por cuál inmueble y qué asesor lo atendió.',
  },
]

export const stats = [
  { value: '2.400+', label: 'inmuebles publicados' },
  { value: '380', label: 'inmobiliarias aliadas' },
  { value: '21', label: 'ciudades cubiertas' },
  { value: '48 h', label: 'para verificar un anuncio' },
] as const

export type Testimonial = {
  quote: string
  author: string
  role: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Antes manejábamos el inventario en tres hojas de cálculo distintas. Ahora los asesores actualizan cada propiedad y todos vemos lo mismo.',
    author: 'Laura Restrepo',
    role: 'Directora comercial, Arrendar Group',
    initials: 'LR',
  },
  {
    quote:
      'Publiqué mi apartamento un martes y el jueves ya tenía cuatro visitas agendadas. Lo mejor fue saber exactamente con quién hablaba.',
    author: 'Camilo Duarte',
    role: 'Vendedor independiente',
    initials: 'CD',
  },
  {
    quote:
      'Pude comparar precios de la misma zona antes de decidir. Terminé comprando en un edificio que no había encontrado en otros portales.',
    author: 'Natalia Gómez',
    role: 'Compradora, Bogotá',
    initials: 'NG',
  },
]

export const propertyTypes = ['Apartamento', 'Casa', 'Oficina', 'Local', 'Lote', 'Bodega'] as const
