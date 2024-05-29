import {forwardRef} from 'react'
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
export const Icon = forwardRef(function Icon(
  props: IconProps & Omit<React.SVGProps<SVGSVGElement>, 'ref'>,
  ref: React.Ref<SVGSVGElement>,
) {
  const {symbol, ...restProps} = props
  const IconComponent = icons[symbol]

  if (!IconComponent) {
    return null
  }

  return <IconComponent {...restProps} ref={ref} />
})
