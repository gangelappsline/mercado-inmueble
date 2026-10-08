/**
 * Verifica que las vistas públicas y las rutas protegidas del panel se
 * rendericen sin errores, que las guardas redirijan como corresponde y que
 * cualquier ruta desconocida muestre la pantalla 404. Se ejecuta contra el
 * módulo SSR de Vite.
 *
 *   npm run smoke
 */
import { createServer } from 'vite'

const cases = [
  {
    path: '/',
    shell: 'public',
    markers: ['Todo el mercado inmobiliario', 'Para quién es', 'inmuebles publicados'],
  },
  {
    path: '/plataforma',
    shell: 'public',
    markers: ['Qué ofrecemos', 'Elige cómo quieres usar', 'De la publicación al cierre'],
  },
  { path: '/login', shell: 'public', markers: ['Bienvenido de vuelta', 'Crear cuenta', '¿Olvidaste tu contraseña?'] },
  { path: '/ruta-inexistente', shell: 'public', markers: ['Error 404', 'No encontramos esta página'] },
  // Panel: cada rol llega a su ruta y ve su contenido.
  {
    path: '/cliente/panel',
    shell: 'dashboard',
    role: 'cliente',
    name: 'Ana Demo',
    markers: ['Panel del cliente', 'Inmuebles destacados', 'Favoritos guardados'],
  },
  {
    path: '/vendedor/propiedades',
    shell: 'dashboard',
    role: 'vendedor',
    name: 'Camilo Demo',
    markers: ['Panel del vendedor', 'Mis publicaciones', 'Publicaciones activas'],
  },
  {
    path: '/inmobiliaria/propiedades',
    shell: 'dashboard',
    role: 'inmobiliaria',
    name: 'Arrendar Demo',
    markers: ['Panel de la inmobiliaria', 'Inmuebles en portafolio', 'Publicaciones del portafolio'],
  },
  {
    path: '/administrador/dashboard',
    shell: 'dashboard',
    role: 'administrador',
    name: 'Admin Demo',
    markers: ['Panel del administrador', 'Dashboard general', 'Publicaciones recientes'],
  },
  // Guardas: sin sesión redirige a /login; con otro rol redirige al panel propio.
  { path: '/vendedor/propiedades', shell: 'redirect', absent: ['Panel del vendedor'] },
  { path: '/cliente/panel', shell: 'dashboard', role: 'vendedor', absent: ['Panel del cliente'] },
]

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
})

let failures = 0

function shellOk(html, shell) {
  if (shell === 'public') return html.includes('<header') && html.includes('<footer')
  if (shell === 'dashboard') return html.includes('<header') && html.includes('Navegación del panel')
  if (shell === 'redirect') return html.trim() === ''
  return false
}

const shellLabel = {
  public: 'header/footer del layout público',
  dashboard: 'header del panel privado',
  redirect: 'redirección sin renderizar contenido',
}

try {
  const { renderRoute, renderRouteAs } = await vite.ssrLoadModule('/scripts/smoke.tsx')

  for (const testCase of cases) {
    const label = testCase.role ? `${testCase.path} (rol: ${testCase.role})` : testCase.path

    try {
      const html = testCase.role
        ? renderRouteAs(testCase.path, testCase.role, testCase.name)
        : renderRoute(testCase.path)

      const missing = (testCase.markers ?? []).filter((marker) => !html.includes(marker))
      const unexpected = (testCase.absent ?? []).filter((marker) => html.includes(marker))
      const hasShell = shellOk(html, testCase.shell)

      if (missing.length > 0 || unexpected.length > 0 || !hasShell) {
        failures += 1
        console.error(`✗ ${label}`)
        if (missing.length > 0) console.error(`   falta el contenido: ${missing.join(', ')}`)
        if (unexpected.length > 0) console.error(`   no debería mostrarse: ${unexpected.join(', ')}`)
        if (!hasShell) console.error(`   envoltura inesperada: se esperaba ${shellLabel[testCase.shell]}`)
        continue
      }

      console.log(`✓ ${label} — ${html.length} caracteres renderizados`)
    } catch (error) {
      failures += 1
      console.error(`✗ ${label}`)
      console.error(error)
    }
  }
} finally {
  await vite.close()
}

if (failures > 0) {
  console.error(`\n${failures} vista(s) con problemas.`)
  process.exit(1)
}

console.log(`\n${cases.length} vistas verificadas correctamente.`)
