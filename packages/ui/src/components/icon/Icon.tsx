import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {Flex} from '../flex/Flex'
import {type IconProps, iconProps} from './icon.props'

const ICON_FONT_SIZES = ['17px', '21px', '25px', '29px', '33px']

/** @public */
export function Icon({icon: IconComponent, size = 2, tone, ...props}: IconProps) {
  const {as, className, style, ...rest} = getProps(props, iconProps)

  return (
    <Flex
      as={as || 'span'}
      display="inline-flex"
      width={ICON_FONT_SIZES[size]}
      height={ICON_FONT_SIZES[size]}
      {...(tone !== undefined && {tone})}
      className={classNames('sui-Icon', className)}
      style={{...style, background: 'none'}}
      data-ui="Icon"
      {...rest}
    >
      <IconComponent />
    </Flex>
  )
}
