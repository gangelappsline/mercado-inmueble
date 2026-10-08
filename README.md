# Mercado Inmueble

Plataforma digital donde **inmobiliarias, vendedores independientes y clientes** publican, descubren y
gestionan inmuebles. Este repositorio contiene el **layout público** de la plataforma: la página de
inicio, la página donde se explica todo lo que ofrece el producto y la pantalla de acceso.

## Stack

| Herramienta              | Uso                                                       |
| ------------------------ | --------------------------------------------------------- |
| React 19 + Vite 8        | Base de la aplicación y servidor de desarrollo             |
| TypeScript               | Tipado estricto en todo el proyecto                        |
| Tailwind CSS 4           | Sistema de diseño con tokens de marca (`@theme`)           |
| React Router DOM 7       | Layout público con rutas anidadas y enlaces con ancla       |
| TanStack Query 5         | Consultas (inventario de propiedades) y mutaciones (formularios) |
| Motion (framer-motion)   | Transiciones, reveals al hacer scroll y microinteracciones  |
| Oxlint                   | Análisis estático                                          |

Paleta base: **#F95123** (naranja, `brand`) y **#080960** (azul profundo, `navy`), con escalas
completas de 50 a 950 definidas en `src/index.css`.

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:5173
```

Otros comandos:

```bash
npm run build     # build de producción
npm run preview   # sirve el build
npm run lint      # oxlint
npm run typecheck # tsc -b
npm run smoke     # renderiza las 4 vistas y verifica su contenido
npm run verify    # lint + typecheck + smoke
```

## Rutas

| Ruta            | Página                | Contenido                                                                    |
| --------------- | --------------------- | ---------------------------------------------------------------------------- |
| `/`             | `HomePage`            | Hero, cifras del mercado, los 3 perfiles, capacidades, propiedades destacadas y CTA |
| `/plataforma`   | `PlatformPage`        | Todo lo que ofrece la plataforma: perfiles, capacidades, cómo funciona, inventario filtrable, beneficios, testimonios y contacto |
| `/login`        | `LoginPage`           | Acceso y registro con panel de marca, validaciones y estado de éxito          |
| `*`             | `NotFoundPage`        | Página 404                                                                    |

## Estructura

```
src/
├── App.tsx                 # Providers (TanStack Query) + RouterProvider
├── index.css               # Tailwind, tokens de marca y utilidades propias
├── assets/                 # Imágenes optimizadas del sitio
├── components/
│   ├── auth/               # Panel de marca y tarjeta de acceso/registro
│   ├── layout/             # Header, Footer, PublicLayout, ScrollHandler, Logo
│   ├── properties/         # Tarjeta de inmueble y diálogo de contacto
│   ├── sections/           # Secciones reutilizables de las páginas
│   └── ui/                 # Button, Badge, Field, Alert, Icon, Reveal, SectionHeading
├── data/                   # Contenido y datos de demostración
├── hooks/queries.ts        # Hooks de TanStack Query
├── lib/                    # api, utilidades de formato y clases
├── pages/                  # Vistas de cada ruta
└── router/routes.tsx       # Definición de rutas públicas
```

El layout público vive en `src/components/layout/PublicLayout.tsx` y compone **Header** y **Footer**
como componentes independientes alrededor del `<Outlet />`.

## Datos y backend

`src/lib/api.ts` es la única capa que conoce el origen de datos. Hoy devuelve datos de demostración
(`src/data/`) con latencia simulada; cuando exista la API real solo hay que reemplazar el cuerpo de
`fetchProperties`, `createLead` y `authenticate` por llamadas `fetch`. Los formularios de contacto,
registro y acceso ya usan TanStack Query (mutaciones con estados de carga, error y éxito).

> La sesión y los formularios están **simulados**: la autenticación no persiste y el panel privado de
> gestión se desarrollará en la siguiente entrega del producto.

## Accesibilidad y responsividad

- Diseño mobile-first verificado en 320 px, tablet y escritorio (grid fluido, menú móvil con bloqueo
  de scroll, cierre con `Esc` y con cambio de ruta).
- Enlace «Saltar al contenido», `aria-*` en menús, pestañas, diálogo y filtros, foco visible y
  soporte de `prefers-reduced-motion` (las animaciones se desactivan).
- El header cambia a tono claro sobre los heroes oscuros y respeta el contraste AA.

## Pendientes sugeridos

1. Conectar la API real y reemplazar `src/lib/api.ts`.
2. Detalle de inmueble (`/propiedades/:id`) y carga de publicaciones desde el panel privado.
3. Autenticación real (sesión persistente, recuperación de contraseña) y panel de gestión.
4. Code splitting por ruta y `loading="lazy"` en más imágenes para reducir el bundle inicial.
