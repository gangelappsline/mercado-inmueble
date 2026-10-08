import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import {
  authenticate,
  createLead,
  fetchProperties,
  type LeadPayload,
  type PropertyQuery,
  type SessionPayload,
} from '@/lib/api'

export const queryKeys = {
  properties: (query: PropertyQuery) => ['properties', query] as const,
  featuredProperties: ['properties', { operation: 'Todas', limit: 6 }] as const,
}

/** Propiedades destacadas para la vitrina pública. */
export function useFeaturedProperties() {
  return useQuery({
    queryKey: queryKeys.featuredProperties,
    queryFn: () => fetchProperties({ operation: 'Todas', limit: 6 }),
    staleTime: 5 * 60 * 1000,
  })
}

/** Búsqueda del catálogo con filtros (mantiene los datos previos al filtrar). */
export function useProperties(query: PropertyQuery) {
  return useQuery({
    queryKey: queryKeys.properties(query),
    queryFn: () => fetchProperties(query),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  })
}

/** Registro de interesados (formulario de contacto). */
export function useCreateLead() {
  return useMutation({
    mutationFn: (payload: LeadPayload) => createLead(payload),
  })
}

/** Inicio de sesión / registro. */
export function useAuthenticate() {
  return useMutation({
    mutationFn: (payload: SessionPayload) => authenticate(payload),
  })
}
