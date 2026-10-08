const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const compactCurrency = new Intl.NumberFormat('es-CO', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const number = new Intl.NumberFormat('es-CO')

/** $ 1.250.000.000 */
export function formatPrice(value: number): string {
  return currency.format(value)
}

/** $ 1,3 mil M */
export function formatCompactPrice(value: number): string {
  return `$ ${compactCurrency.format(value)}`
}

/** 2.400 */
export function formatNumber(value: number): string {
  return number.format(value)
}

/** 124 m² */
export function formatArea(value: number): string {
  return `${number.format(value)} m²`
}
