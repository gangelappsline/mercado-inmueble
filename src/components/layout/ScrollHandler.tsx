import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Lleva el scroll al inicio en cada cambio de ruta y al ancla cuando la URL
 * incluye un hash (por ejemplo /plataforma#como-funciona).
 */
export function ScrollHandler() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
