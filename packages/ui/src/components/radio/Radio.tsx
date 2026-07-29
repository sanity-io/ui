import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {Label} from '../label/Label'
import {VisuallyHidden} from '../visually-hidden/VisuallyHidden'
import {type RadioProps, radioProps} from './radio.props'

const radioClassName = suffixClassName('sui-Radio')
const radioInputClassName = suffixClassName('sui-RadioInput')
const radioMarkClassName = suffixClassName('sui-RadioMark')

/** @beta */
export function Radio(props: RadioProps) {
  const {className, style, label, disabled, error, ...rest} = getProps(props, radioProps)

  return (
    <Label
      className={clsx(radioClassName, className)}
      style={style}
      data-ui="Radio"
      disabled={disabled}
      error={error}
    >
      <VisuallyHidden
        as="input"
        type="radio"
        className={radioInputClassName}
        disabled={disabled}
        {...rest}
      />

      <Box
        as="span"
        className={clsx(radioMarkClassName, error && 'sui-error')}
        position="relative"
        radius="full"
        width="17px"
        height="17px"
      />

      {label}
    </Label>
  )
}

export type {RadioProps}
