/**
 * Verifica que cada vista pública se renderice sin errores y contenga su
 * contenido principal. Se ejecuta contra el módulo SSR de Vite.
 *
 *   npm run smoke
 */
import { createServer } from 'vite'

const cases = [
  { path: '/', markers: ['Todo el mercado inmobiliario', 'Para quién es', 'inmuebles publicados'] },
  {
    path: '/plataforma',
    markers: ['Qué ofrecemos', 'Elige cómo quieres usar', 'De la publicación al cierre'],
  },
  { path: '/login', markers: ['Bienvenido de vuelta', 'Crear cuenta', '¿Olvidaste tu contraseña?'] },
  { path: '/ruta-inexistente', markers: ['No encontramos esta página'] },
]

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
})

let failures = 0

try {
  const { renderRoute } = await vite.ssrLoadModule('/scripts/smoke.tsx')

  for (const testCase of cases) {
    try {
      const html = renderRoute(testCase.path)
      const missing = testCase.markers.filter((marker) => !html.includes(marker))
      const hasShell = html.includes('<header') && html.includes('<footer')

      if (missing.length > 0 || !hasShell) {
        failures += 1
        console.error(`✗ ${testCase.path}`)
        if (missing.length > 0) console.error(`   falta el contenido: ${missing.join(', ')}`)
        if (!hasShell) console.error('   no se renderizaron header/footer del layout público')
        continue
      }

      console.log(`✓ ${testCase.path} — ${html.length} caracteres renderizados`)
    } catch (error) {
      failures += 1
      console.error(`✗ ${testCase.path}`)
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
