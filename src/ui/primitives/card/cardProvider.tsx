import {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {ReactNode, useMemo} from 'react'

import {CardContext} from './cardContext'
import {CardCompatProviderComponent} from './types'

export function CardProvider(props: {
  compat_provider?: CardCompatProviderComponent
  children?: ReactNode
  rendered?: boolean
  tone: ThemeColorCardToneKey
  scheme: ThemeColorSchemeKey
}) {
  const {children, rendered = false, tone, scheme} = props

  const context = useMemo(() => ({rendered, tone, scheme}), [rendered, tone, scheme])

  return <CardContext.Provider value={context}>{children}</CardContext.Provider>
}
