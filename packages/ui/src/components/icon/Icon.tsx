import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {type IconProps, iconProps} from './icon.props'

const iconClassname = getVersionedClassname('sui-Icon')

/** @public */
export function Icon({size = 2, ...props}: IconProps) {
  const {className, style, icon: Component, ...rest} = getProps({size, ...props}, iconProps)

  return (
    <Component
      className={classNames(iconClassname, className)}
      data-ui="Icon"
      style={style}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...rest}
    />
  )
}
