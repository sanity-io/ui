import type {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'

/** @public */
export interface CardStyleProps {
  className?: string
  checkered?: boolean
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorCardToneKey | 'inherit'
}
