import type {CardTone, ColorScheme} from '@sanity/ui/theme'
import type {ComponentType, ReactNode} from 'react'

/** @internal */
export type _CardCompatProviderComponent = ComponentType<{
  children?: ReactNode
  tone: CardTone | 'inherit'
  scheme: ColorScheme
}>

/** @public */
export interface CardContextValue {
  tone: CardTone
  scheme: ColorScheme
  /** @internal */
  unstable_CompatProvider?: _CardCompatProviderComponent
}
