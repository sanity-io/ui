import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {type IconProps, iconProps} from './icon.props'

/** @public */
export function Icon({size = 2, ...props}: IconProps) {
  const {className, style, icon: Component, ...rest} = getProps({size, ...props}, iconProps)

  return (
    <Component
      className={classNames('sui-Icon', className)}
      data-ui="Icon"
      style={style}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...rest}
    />
  )
}
