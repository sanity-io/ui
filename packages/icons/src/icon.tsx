import type {ComponentPropsWithRef, ReactElement} from 'react'

import {icons} from './icons'
import type {IconSymbol} from './icons'

/**
 * @public
 */
export interface IconProps {
  symbol: IconSymbol
}

/**
 * @public
 */
export function Icon(props: IconProps & ComponentPropsWithRef<'svg'>): ReactElement | null {
  const {symbol, ...restProps} = props
  const IconComponent = icons[symbol]

  if (!IconComponent) {
    return null
  }

  return <IconComponent {...restProps} />
}
