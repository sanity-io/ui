import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type TextAreaProps, textAreaProps} from './textArea.props'

const textAreaClassName = suffixClassName('sui-TextArea')

/** @public */
export function TextArea({
  autoResize = false,
  density = 'regular',
  hasError = false,
  rows = 5,
  ...props
}: TextAreaProps) {
  const {className, style, ...rest} = getProps({autoResize, density, rows, ...props}, textAreaProps)

  const textAreaClasses = clsx(textAreaClassName, 'sui-radius2', 'sui-width-full', className)

  return (
    <textarea
      className={textAreaClasses}
      style={style}
      data-ui="TextArea"
      {...rest}
      aria-invalid={hasError || undefined}
    />
  )
}

export type {TextAreaProps}
