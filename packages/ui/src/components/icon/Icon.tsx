import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {type IconProps, iconProps} from './icon.props'

/** @public */
export function Icon({icon: IconComponent, ...props}: IconProps) {
  const {className, style} = getProps(props, iconProps)

  return (
    <span className={classNames('sui-Icon', className)} style={style} data-ui="Icon">
      <IconComponent />
    </span>
  )
}
