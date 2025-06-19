import type {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {type ReactNode, useMemo} from 'react'

import {CardContext} from './cardContext'
import type {_CardCompatProviderComponent} from './types'

/** @public */
export function CardProvider(props: {
  children?: ReactNode
  tone: ThemeColorCardToneKey
  scheme: ThemeColorSchemeKey
  /** @internal */
  unstable_CompatProvider?: _CardCompatProviderComponent
}): React.JSX.Element {
  const {children, tone, scheme, unstable_CompatProvider} = props

  return (
    <CardContext.Provider
      value={useMemo(
        () => ({tone, scheme, unstable_CompatProvider}),
        [tone, scheme, unstable_CompatProvider],
      )}
    >
      {children}
    </CardContext.Provider>
  )
}
