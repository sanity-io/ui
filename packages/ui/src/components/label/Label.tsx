import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Text} from '../text/Text'
import {type LabelProps, labelProps} from './label.props'

const labelClassName = suffixClassName('sui-Label')

/** @beta */
export function Label(props: LabelProps) {
  const {children, className, style, disabled, error, ...rest} = getProps(props, labelProps)

  return (
    <Text
      as="label"
      size={1}
      muted={disabled}
      className={clsx(
        labelClassName,
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

export type {LabelProps}
