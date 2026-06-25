import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {Text} from '../text/Text'
import {type LabelProps, labelProps} from './label.props'

/** @beta */
export function Label(props: LabelProps) {
  const {children, className, style, disabled, error, ...rest} = getProps(props, labelProps)

  return (
    <Text
      as="label"
      size={1}
      muted={disabled}
      className={classNames(
        getVersionedClassname('sui-Label'),
        'sui-display-flex sui-align-items-center sui-gap2',
        error && 'sui-error',
        className,
      )}
      style={style}
      data-ui="Label"
      {...rest}
    >
      {children}
    </Text>
  )
}
