import type {CardTone, ColorScheme} from '@sanity/ui/theme'

/** @public */
export interface CardStyleProps {
  className?: string
  checkered?: boolean
  scheme?: ColorScheme
  tone?: CardTone | 'inherit'
}
