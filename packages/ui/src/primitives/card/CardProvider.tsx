import type {CardTone, ColorScheme} from '@sanity/ui-tokens'
import {type ReactNode, useMemo} from 'react'

import {CardContext} from './CardContext'
import type {_CardCompatProviderComponent, CardContextValue} from './types'

/** @public */
export function CardProvider(props: {
  children?: ReactNode
  root?: boolean
  tone: CardTone
  scheme: ColorScheme
  /** @internal */
  unstable_CompatProvider?: _CardCompatProviderComponent
}): React.JSX.Element {
  const {children, root = false, tone, scheme, unstable_CompatProvider} = props

  const context = useMemo(
    (): CardContextValue => ({root, tone, scheme, unstable_CompatProvider}),
    [root, tone, scheme, unstable_CompatProvider],
  )

  return <CardContext value={context}>{children}</CardContext>
}
