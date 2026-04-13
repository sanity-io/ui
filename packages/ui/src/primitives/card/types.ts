import type {CardTone, ColorScheme} from '@sanity/ui-tokens'
import type {ComponentType, ReactNode} from 'react'

/** @public */
export interface CardContextValue {
  tone: CardTone
  scheme: ColorScheme
}

/** @internal */
export type _CardCompatProviderComponent = ComponentType<{
  children?: ReactNode
  tone: CardTone | 'inherit'
  scheme: ColorScheme
}>

/** @internal */
export interface _CardInternalContextValue {
  CompatProvider?: _CardCompatProviderComponent
  root: boolean
}
