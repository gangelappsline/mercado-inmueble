import { properties, type Operation, type Property } from '@/data/properties'

/**
 * Capa de acceso a datos.
 * Hoy devuelve datos de demostración con latencia simulada; cuando exista el
 * backend real basta con reemplazar el cuerpo de estas funciones por `fetch`.
 */

const LATENCY = 550

function wait(ms = LATENCY): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export type PropertyQuery = {
  operation?: 'Todas' | Operation
  type?: string
  city?: string
  limit?: number
}

export async function fetchProperties(query: PropertyQuery = {}): Promise<Property[]> {
  await wait()

  const { operation = 'Todas', type, city, limit } = query

  const result = properties.filter((property) => {
    const matchesOperation = operation === 'Todas' || property.operation === operation
    const matchesType = !type || type === 'Todos' || property.type === type
    const matchesCity = !city || city === 'Todas las ciudades' || property.city === city
    return matchesOperation && matchesType && matchesCity
  })

  return typeof limit === 'number' ? result.slice(0, limit) : result
}

export type LeadProfile = 'cliente' | 'vendedor' | 'inmobiliaria'

export type LeadPayload = {
  name: string
  email: string
  profile: LeadProfile
  message?: string
}

export type LeadReceipt = {
  id: string
  email: string
  receivedAt: string
}

export async function createLead(payload: LeadPayload): Promise<LeadReceipt> {
  await wait(750)

  return {
    id: `MI-${Date.now().toString(36).toUpperCase()}`,
    email: payload.email,
    receivedAt: new Date().toISOString(),
  }
}

export type AccountType = LeadProfile

export type SessionPayload = {
  email: string
  password: string
  accountType: AccountType
  name?: string
}

export type Session = {
  token: string
  name: string
  email: string
  accountType: AccountType
  greeting: string
}

const accountTypeLabels: Record<AccountType, string> = {
  cliente: 'Cliente',
  vendedor: 'Vendedor independiente',
  inmobiliaria: 'Inmobiliaria',
}

export function accountTypeLabel(type: AccountType): string {
  return accountTypeLabels[type]
}

export async function authenticate(payload: SessionPayload): Promise<Session> {
  await wait(850)

  const name = payload.name?.trim() || payload.email.split('@')[0]

  return {
    token: `demo_${Math.random().toString(36).slice(2, 12)}`,
    name,
    email: payload.email,
    accountType: payload.accountType,
    greeting: `Hola, ${name}`,
  }
}
