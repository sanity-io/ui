import {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {ComponentType, ReactNode} from 'react'

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

export type CardCompatProviderComponent = ComponentType<{
  children?: ReactNode
  tone: ThemeColorCardToneKey
  scheme: ThemeColorSchemeKey
}>

/** @internal */
export interface CardContextValue {
  compat_provider?: CardCompatProviderComponent
  rendered: boolean
  tone: ThemeColorCardToneKey
  scheme: ThemeColorSchemeKey
}
