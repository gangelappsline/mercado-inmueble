export const site = {
  name: 'Mercado Inmueble',
  tagline: 'La vitrina digital del mercado inmobiliario',
  description:
    'Mercado Inmueble conecta a inmobiliarias, vendedores independientes y clientes en una sola plataforma para publicar, descubrir y cerrar negocios inmobiliarios.',
  email: 'hola@mercadoinmueble.com',
  phone: '+57 604 444 12 30',
  whatsapp: '+57 310 555 0198',
  address: 'Carrera 43A #1-50, El Poblado, Medellín, Colombia',
  hours: 'Lunes a viernes, 8:00 a.m. – 6:00 p.m.',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'Instagram', href: 'https://www.instagram.com' },
    { label: 'Facebook', href: 'https://www.facebook.com' },
  ],
} as const

export type NavItem = {
  label: string
  to: string
  hash?: string
}

export const navItems: NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Qué ofrecemos', to: '/plataforma' },
  { label: 'Para clientes', to: '/plataforma', hash: 'audiencias' },
  { label: 'Cómo funciona', to: '/plataforma', hash: 'como-funciona' },
  { label: 'Contacto', to: '/plataforma', hash: 'contacto' },
]

export const footerColumns = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Qué ofrecemos', to: '/plataforma' },
      { label: 'Para clientes', to: '/plataforma', hash: 'audiencias' },
      { label: 'Cómo funciona', to: '/plataforma', hash: 'como-funciona' },
      { label: 'Propiedades destacadas', to: '/plataforma', hash: 'propiedades' },
    ],
  },
  {
    title: 'Para profesionales',
    links: [
      { label: 'Publicar un inmueble', to: '/login' },
      { label: 'Inmobiliarias', to: '/plataforma', hash: 'audiencias' },
      { label: 'Vendedores independientes', to: '/plataforma', hash: 'audiencias' },
      { label: 'Iniciar sesión', to: '/login' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Beneficios', to: '/plataforma', hash: 'beneficios' },
      { label: 'Hablar con el equipo', to: '/plataforma', hash: 'contacto' },
      { label: 'Crear cuenta', to: '/login' },
    ],
  },
] as const
