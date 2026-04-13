import type {CardTone, ColorScheme} from '@sanity/ui-tokens'
import {type ReactNode} from 'react'

import {CardContext} from './CardContext'
import type {_CardCompatProviderComponent} from './types'

/** @public */
export function CardProvider(props: {
  children?: ReactNode
  tone: CardTone
  scheme: ColorScheme
}): React.JSX.Element {
  const {children, tone, scheme} = props

  return <CardContext value={{tone, scheme}}>{children}</CardContext>
}
