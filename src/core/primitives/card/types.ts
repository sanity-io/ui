import type {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'
import type {ComponentType, ReactNode} from 'react'

/**
 * @internal
 * @deprecated Use `CardStyleProps` from `@sanity/ui/css` instead.
 */
export interface CardStyleProps {
  $checkered: boolean
  $focusRing: boolean
  $muted: boolean
  $tone: ThemeColorCardToneKey
}

/** @internal */
export type _CardCompatProviderComponent = ComponentType<{
  children?: ReactNode
  tone: ThemeColorCardToneKey
  scheme: ThemeColorSchemeKey
}>

/** @public */
export interface CardContextValue {
  tone: ThemeColorCardToneKey
  scheme: ThemeColorSchemeKey
  /** @internal */
  unstable_CompatProvider?: _CardCompatProviderComponent
}
