import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {type RadioProps, radioProps} from './radio.props'

const radioClassName = suffixClassName('sui-Radio')
const radioInputClassName = suffixClassName('sui-RadioInput')

/** @beta */
export function Radio(props: RadioProps) {
  const {className, style, hasError, ...rest} = getProps(props, radioProps)

  return (
    <Box
      as="span"
      className={clsx(radioClassName, className)}
      style={style}
      data-ui="Radio"
      position="relative"
      radius="full"
      width="17px"
      height="17px"
    >
      <input
        type="radio"
        className={radioInputClassName}
        aria-invalid={hasError || undefined}
        {...rest}
      />
    </Box>
  )
}

export type {RadioProps}
