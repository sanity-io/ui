import clsx from 'clsx'
import {cloneElement, createElement, isValidElement, type ComponentType, type SVGProps} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type IconProps, iconProps} from './icon.props'

const iconClassName = suffixClassName('sui-Icon')

/** @public */
export function Icon({icon, size = 2, ...props}: IconProps) {
  const {className, style, ...rest} = getProps({size, ...props}, iconProps)
  const iconElement = isValidElement(icon) ? icon : null
  const ariaLabel =
    props['aria-label'] || (iconElement ? iconElement.props['aria-label'] : undefined)

  const svgProps = {
    'className': clsx(
      iconClassName,
      className,
      iconElement ? iconElement.props.className : undefined,
    ),
    'style': iconElement ? {...iconElement.props.style, ...style} : style,
    'data-ui': 'Icon',
    'aria-hidden': ariaLabel ? undefined : true,
    ...rest,
  }

  return iconElement
    ? cloneElement(iconElement, svgProps)
    : createElement(icon as ComponentType<SVGProps<SVGSVGElement>>, svgProps)
}

export type {IconProps}
