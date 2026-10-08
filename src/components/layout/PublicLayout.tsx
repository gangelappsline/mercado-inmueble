import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollHandler } from '@/components/layout/ScrollHandler'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>

      <ScrollHandler />
      <Header />

      <main id="contenido" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
