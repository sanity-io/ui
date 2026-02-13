import type {CardTone, ColorScheme} from '@sanity/ui/theme'
import {type ReactNode} from 'react'

import {CardContext} from './CardContext'
import type {_CardCompatProviderComponent} from './types'

/** @public */
export function CardProvider(props: {
  children?: ReactNode
  tone: CardTone
  scheme: ColorScheme
  /** @internal */
  unstable_CompatProvider?: _CardCompatProviderComponent
}): React.JSX.Element {
  const {children, tone, scheme, unstable_CompatProvider} = props

  return <CardContext value={{tone, scheme, unstable_CompatProvider}}>{children}</CardContext>
}
