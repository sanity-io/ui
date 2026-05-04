import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {Flex} from '../flex/Flex'
import {type IconProps, iconProps} from './icon.props'

const ICON_FONT_SIZES: Record<string, string> = {sm: '21px', md: '25px', lg: '29px'}

/** @public */
export function Icon({icon: IconComponent, size = 'md', tone, ...props}: IconProps) {
  const {as, className, style, ...rest} = getProps(props, iconProps)

  return (
    <Flex
      as={as || 'span'}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      {...(tone !== undefined && {tone})}
      className={classNames('sui-Icon', className)}
      style={{fontSize: ICON_FONT_SIZES[size], ...style}}
      data-ui="Icon"
      {...rest}
    >
      <IconComponent />
    </Flex>
  )
}
