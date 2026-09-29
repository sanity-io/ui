import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type TextInputProps, textInputProps} from './textInput.props'

const textInputClassName = suffixClassName('sui-TextInput')

/** @public */
export function TextInput({density = 'regular', hasError = false, ...props}: TextInputProps) {
  const {className, style, ...rest} = getProps({density, ...props}, textInputProps)

  const textInputClasses = clsx(
    textInputClassName,
    hasError && 'sui-error',
    'sui-radius2',
    'sui-width-full',
    className,
  )

  return (
    <input
      className={textInputClasses}
      style={style}
      data-ui="TextInput"
      aria-invalid={hasError || undefined}
      {...rest}
    />
  )
}

export type {TextInputProps}
