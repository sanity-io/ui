import {forwardRef, type ForwardRefExoticComponent, type RefAttributes, type SVGProps} from 'react'
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
export const Icon: ForwardRefExoticComponent<
  IconProps & Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
> = forwardRef(function Icon(props, ref) {
  const {symbol, ...restProps} = props
  const IconComponent = icons[symbol]

  if (!IconComponent) {
    return null
  }

  return <IconComponent {...restProps} ref={ref} />
})
Icon.displayName = 'ForwardRef(Icon)'
