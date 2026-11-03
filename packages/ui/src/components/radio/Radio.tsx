import clsx from 'clsx'

import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {type RadioProps} from './radio.props'

const radioClassName = suffixClassName('sui-Radio')
const radioInputClassName = suffixClassName('sui-RadioInput')

/** @beta */
export function Radio(props: RadioProps) {
  const {className, style, ...rest} = props

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
      <input type="radio" className={radioInputClassName} {...rest} />
    </Box>
  )
}

export type {RadioProps}
