import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type TextInputProps, textInputProps} from './textInput.props'

const textInputClassName = suffixClassName('sui-TextInput')

/** @public */
export function TextInput({
  density = 'regular',
  hasError = false,
  type = 'text',
  ...props
}: TextInputProps) {
  const {className, style, ...rest} = getProps({density, ...props}, textInputProps)

  const textInputClasses = clsx(textInputClassName, 'sui-radius2', 'sui-width-full', className)

  return (
    <input
      type={type}
      className={textInputClasses}
      style={style}
      data-ui="TextInput"
      {...rest}
      aria-invalid={hasError || undefined}
    />
  )
}

export type {TextInputProps}
