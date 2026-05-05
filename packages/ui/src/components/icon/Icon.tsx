import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {Flex} from '../flex/Flex'
import {type IconProps, iconProps} from './icon.props'

const ICON_SIZES = {0: '17px', 1: '21px', 2: '25px', 3: '29px', 4: '33px'} as const

/** @public */
export function Icon({icon: IconComponent, muted, size = 2, tone, ...props}: IconProps) {
  const {className, style, ...rest} = getProps(props, iconProps)

  return (
    <Flex
      as="span"
      display="inline-flex"
      width={ICON_SIZES[size]}
      height={ICON_SIZES[size]}
      {...(tone !== undefined && {tone})}
      className={classNames('sui-Icon', {'sui-text-muted': muted}, className)}
      style={{background: 'none', ...style}}
      data-ui="Icon"
      {...rest}
    >
      <IconComponent />
    </Flex>
  )
}
