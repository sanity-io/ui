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

  const containerProps = {
    'data-ui': 'Icon',
    'className': clsx(iconClassName, className, 'sui-display-block'),
  }

  const svgProps = {
    'style': iconElement ? {...iconElement.props.style, ...style} : style,
    'aria-hidden': ariaLabel ? undefined : true,
    'className': clsx('sui-display-block', iconElement?.props.className),
    ...rest,
  }

  if (props.trim) {
    const hasMargin = Object.keys(props).findIndex((prop) => prop.startsWith('margin')) > -1

    if (hasMargin) {
      return (
        <span
          {...containerProps}
          className={clsx(containerProps.className.replace('sui-icon-trim', ''))}
        >
          {iconElement
            ? cloneElement(iconElement, {
                ...svgProps,
                className: clsx(svgProps.className, 'sui-icon-trim'),
              })
            : createElement(icon as ComponentType<SVGProps<SVGSVGElement>>, {
                ...svgProps,
                className: clsx(svgProps.className, 'sui-icon-trim'),
              })}
        </span>
      )
    }
  }

  return iconElement
    ? cloneElement(iconElement, {
        ...containerProps,
        ...svgProps,
        className: clsx(containerProps.className, svgProps.className),
      })
    : createElement(icon as ComponentType<SVGProps<SVGSVGElement>>, {
        ...containerProps,
        ...svgProps,
        className: clsx(containerProps.className, svgProps.className),
      })
}

export type {IconProps}
