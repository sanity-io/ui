import {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {ReactNode, useMemo} from 'react'

import {CardContext} from './cardContext'
import {_CardCompatProviderComponent} from './types'

export function CardProvider(props: {
  children?: ReactNode
  tone: ThemeColorCardToneKey
  scheme: ThemeColorSchemeKey
  unstable_CompatProvider?: _CardCompatProviderComponent
}) {
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

CardProvider.displayName = 'CardProvider'
