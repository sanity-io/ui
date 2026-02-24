import type {CardTone, ColorScheme} from '@sanity/ui/tokens'
import type {ComponentType, ReactNode} from 'react'

/** @internal */
export type _CardCompatProviderComponent = ComponentType<{
  children?: ReactNode
  tone: CardTone | 'inherit'
  scheme: ColorScheme
}>

/** @public */
export interface CardContextValue {
  root: boolean
  tone: CardTone
  scheme: ColorScheme
  /** @internal */
  unstable_CompatProvider?: _CardCompatProviderComponent
}
