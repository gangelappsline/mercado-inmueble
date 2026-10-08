import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Set de iconos propio (trazo de 1.7px, viewBox 24) para no depender
 * de una librería externa de iconografía.
 */
const icons = {
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrowRight: <path d="M4 12h15M13.2 6l5.8 6-5.8 6" />,
  arrowUpRight: <path d="M7 17L17 7M9.2 7H17v7.8" />,
  chevronDown: <path d="M6 9.5l6 6 6-6" />,
  check: <path d="M4.5 12.5l5 5L20 6.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.2 12.3l2.6 2.6 5-5.2" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.8v5M12 16.2h.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" />
    </>
  ),
  publish: (
    <>
      <path d="M14 3H8.2A2.2 2.2 0 006 5.2v13.6A2.2 2.2 0 008.2 21h7.6a2.2 2.2 0 002.2-2.2V7l-4-4z" />
      <path d="M14 3v4h4M12 11.5v5M9.5 14h5" />
    </>
  ),
  team: (
    <>
      <path d="M16 21v-1.8a4 4 0 00-4-4H6.2a4 4 0 00-4 4V21" />
      <circle cx="9.1" cy="7.6" r="3.9" />
      <path d="M21.8 21v-1.8a4 4 0 00-3-3.85M15.6 3.9a4 4 0 010 7.4" />
    </>
  ),
  chat: (
    <path d="M21 11.6a8.4 8.4 0 01-.9 3.8A8.5 8.5 0 0112.5 20a8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 014 11.5 8.5 8.5 0 018.7 4a8.4 8.4 0 013.8-.9h.4A8.5 8.5 0 0121 11.5v.1z" />
  ),
  chart: <path d="M3 20h18M6.5 20v-8.5M12 20V4.5M17.5 20v-6" />,
  verified: (
    <>
      <path d="M12 3l7 3v5.6c0 4.4-2.9 7.4-7 9.4-4.1-2-7-5-7-9.4V6l7-3z" />
      <path d="M9 12.2l2.1 2.1 4-4.1" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5.2A2.2 2.2 0 016.2 3h5.6A2.2 2.2 0 0114 5.2V21" />
      <path d="M14 21V9.2A2.2 2.2 0 0116.2 7h2.6A2.2 2.2 0 0121 9.2V21M2.5 21h19" />
      <path d="M7.6 7h2.8M7.6 11h2.8M7.6 15h2.8" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21.5s7-6.2 7-11.2a7 7 0 10-14 0c0 5 7 11.2 7 11.2z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </>
  ),
  bed: (
    <>
      <path d="M3 19v-7.5a2 2 0 012-2h14a2 2 0 012 2V19" />
      <path d="M3 15.5h18" />
      <path d="M6.5 9.5V7.2A1.2 1.2 0 017.7 6h3.1a1.2 1.2 0 011.2 1.2v2.3" />
    </>
  ),
  bath: (
    <>
      <path d="M3.5 12h17v2.8a4.2 4.2 0 01-4.2 4.2H7.7a4.2 4.2 0 01-4.2-4.2V12z" />
      <path d="M6.2 12V6.4A2.4 2.4 0 018.6 4c1.3 0 2.3 1 2.4 2.3" />
      <path d="M7.2 19l-1.4 2.4M16.8 19l1.4 2.4" />
    </>
  ),
  car: (
    <>
      <path d="M3.5 16.5v-3.1l1.9-4.6A2 2 0 017.2 7.5h9.6a2 2 0 011.8 1.3l1.9 4.6v3.1z" />
      <path d="M3.5 13.4h17" />
      <path d="M6.6 16.5v2.2M17.4 16.5v2.2" />
      <circle cx="7.4" cy="10.9" r="0.9" />
      <circle cx="16.6" cy="10.9" r="0.9" />
    </>
  ),
  area: <path d="M15 3h6v6M9 21H3v-6M21 3l-7.4 7.4M3 21l7.4-7.4" />,
  heart: (
    <path d="M12 20.4l-1.3-1.2C6 15.1 3 12.3 3 8.9A4.9 4.9 0 017.9 4c1.6 0 3.1.75 4.1 1.95A5.3 5.3 0 0116.1 4 4.9 4.9 0 0121 8.9c0 3.4-3 6.2-7.7 10.3L12 20.4z" />
  ),
  eye: (
    <>
      <path d="M2.2 12S5.9 5.6 12 5.6 21.8 12 21.8 12 18.1 18.4 12 18.4 2.2 12 2.2 12z" />
      <circle cx="12" cy="12" r="2.7" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M3 3l18 18" />
      <path d="M10.7 6.1A10 10 0 0112 6c6.1 0 9.8 6 9.8 6a18.4 18.4 0 01-2.6 3.4M6.6 8.3C3.9 10 2.2 12 2.2 12s3.7 6.4 9.8 6.4c1.2 0 2.3-.2 3.3-.6" />
      <path d="M9.9 10a2.9 2.9 0 004.2 4.1" />
    </>
  ),
  lock: (
    <>
      <path d="M5 10.5h14v8A2.5 2.5 0 0116.5 21h-9A2.5 2.5 0 015 18.5v-8z" />
      <path d="M8.2 10.5V7.3a3.8 3.8 0 017.6 0v3.2" />
      <path d="M12 14.4v2.9" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.9" />
      <path d="M4.6 20.6a7.4 7.4 0 0114.8 0" />
    </>
  ),
  mail: (
    <>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" />
      <path d="M3.6 7.2l8.4 6 8.4-6" />
    </>
  ),
  phone: (
    <path d="M21.6 16.9v2.9a2 2 0 01-2.2 2 19.6 19.6 0 01-8.5-3 19.3 19.3 0 01-6-6A19.6 19.6 0 011.9 4.2 2 2 0 013.9 2h2.9a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L7.8 9.8a15.8 15.8 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2.1z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M12 7.4V12l3 1.9" />
    </>
  ),
  sparkles: (
    <>
      <path d="M11.6 3l1.7 4.5 4.5 1.7-4.5 1.7-1.7 4.5-1.7-4.5L5.4 9.2l4.5-1.7L11.6 3z" />
      <path d="M18.4 15.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" />
    </>
  ),
  filter: <path d="M4 6.5h16M7 12h10M10.5 17.5h3" />,
  trending: (
    <>
      <path d="M3 17.5l6-6 4 4 7.5-7.5" />
      <path d="M15.5 8h5v5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 1.6v2.6M12 19.8v2.6M1.6 12h2.6M19.8 12h2.6" />
    </>
  ),
  quote: (
    <path d="M9.8 6.2C6.7 7.5 5 9.9 5 13.3V18h5.6v-5.6H8.2c0-2 .9-3.4 2.8-4.4L9.8 6.2zM19 6.2c-3.1 1.3-4.8 3.7-4.8 7.1V18h5.6v-5.6h-2.4c0-2 .9-3.4 2.8-4.4L19 6.2z" />
  ),
  list: (
    <>
      <path d="M8.5 6.5h12M8.5 12h12M8.5 17.5h12" />
      <path d="M4 6.5h.01M4 12h.01M4 17.5h.01" />
    </>
  ),
  whatsapp: (
    <path d="M12.04 2.2c-5.4 0-9.8 4.4-9.8 9.8 0 1.7.44 3.37 1.28 4.84L2.2 21.8l5.1-1.32a9.76 9.76 0 004.74 1.22h.01c5.4 0 9.8-4.4 9.8-9.8s-4.4-9.7-9.81-9.7zm5.75 13.9c-.24.68-1.4 1.32-1.93 1.37-.53.05-1.02.24-3.44-.72-2.9-1.15-4.72-4.14-4.86-4.33-.14-.2-1.15-1.54-1.15-2.93 0-1.4.72-2.08.98-2.36.24-.29.53-.36.72-.36l.52.01c.17 0 .39-.06.6.46.24.58.8 1.98.87 2.12.07.14.12.31.02.5-.1.2-.5.7-.67.9-.12.15-.28.31-.1.6.17.29.78 1.28 1.67 2.07 1.14 1.02 2.1 1.34 2.4 1.48.29.15.46.13.63-.08.17-.2.72-.84.91-1.13.2-.29.39-.24.66-.15.27.1 1.7.8 2 .95.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
  ),
} as const

export type IconName = keyof typeof icons

const filledIcons: IconName[] = ['whatsapp', 'heart', 'quote']

type IconProps = {
  name: IconName
  className?: string
  strokeWidth?: number
  children?: ReactNode
}

export function Icon({ name, className, strokeWidth = 1.7 }: IconProps) {
  const filled = filledIcons.includes(name)

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn('h-5 w-5 shrink-0', className)}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  )
}
