import {type ReactNode} from 'react'

import {CardInternalContext} from './CardInternalContext'
import type {_CardCompatProviderComponent} from './types'

/** @internal */
export function CardInternalProvider(props: {
  children?: ReactNode
  CompatProvider?: _CardCompatProviderComponent
  root?: boolean
}): React.JSX.Element {
  const {children, root = false, CompatProvider} = props

  return <CardInternalContext value={{root, CompatProvider}}>{children}</CardInternalContext>
}
