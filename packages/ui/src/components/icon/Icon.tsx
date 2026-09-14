import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type IconProps, iconProps} from './icon.props'

const iconClassName = suffixClassName('sui-Icon')

/** @public */
export function Icon({size = 2, ...props}: IconProps) {
  const {className, style, icon: Component, ...rest} = getProps({size, ...props}, iconProps)

  return (
    <Component
      className={clsx(iconClassName, className)}
      data-ui="Icon"
      style={style}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...rest}
    />
  )
}

export type {IconProps}
