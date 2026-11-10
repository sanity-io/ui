import {CheckmarkIcon} from '@sanity/icons/Checkmark'
import {RemoveIcon} from '@sanity/icons/Remove'
import clsx from 'clsx'
import {useEffect, useRef} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {type CheckboxProps, checkboxProps} from './checkbox.props'

const checkboxClassName = suffixClassName('sui-Checkbox')
const checkboxInputClassName = suffixClassName('sui-CheckboxInput')

/** @beta */
export function Checkbox(props: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const {className, style, hasError, indeterminate, ...rest} = getProps(props, checkboxProps)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate, inputRef])

  return (
    <Box
      as="span"
      className={clsx(checkboxClassName, className)}
      style={style}
      data-ui="Checkbox"
      position="relative"
      radius={2}
      width="17px"
      height="17px"
    >
      {indeterminate ? <RemoveIcon aria-hidden="true" /> : <CheckmarkIcon aria-hidden="true" />}

      <input
        type="checkbox"
        className={checkboxInputClassName}
        ref={inputRef}
        aria-invalid={hasError || undefined}
        {...rest}
      />
    </Box>
  )
}

export type {CheckboxProps}
