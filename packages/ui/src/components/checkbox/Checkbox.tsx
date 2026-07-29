import {CheckmarkIcon, RemoveIcon} from '@sanity/icons'
import clsx from 'clsx'
import {useEffect, useRef} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {Label} from '../label/Label'
import {VisuallyHidden} from '../visually-hidden/VisuallyHidden'
import {type CheckboxProps, checkboxProps} from './checkbox.props'

const checkboxClassName = suffixClassName('sui-Checkbox')
const checkboxInputClassName = suffixClassName('sui-CheckboxInput')
const checkboxMarkClassName = suffixClassName('sui-CheckboxMark')

/** @beta */
export function Checkbox(props: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const {className, style, disabled, error, indeterminate, label, ...rest} = getProps(
    props,
    checkboxProps,
  )

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <Label
      className={clsx(checkboxClassName, className)}
      style={style}
      data-ui="Checkbox"
      disabled={disabled}
      error={error}
    >
      <VisuallyHidden
        as="input"
        type="checkbox"
        className={checkboxInputClassName}
        ref={inputRef}
        disabled={disabled}
        {...rest}
      />

      <Box
        as="span"
        className={clsx(checkboxMarkClassName, error && 'sui-error')}
        position="relative"
        radius={2}
        width="17px"
        height="17px"
      >
        {indeterminate ? <RemoveIcon /> : <CheckmarkIcon />}
      </Box>

      {label}
    </Label>
  )
}

export type {CheckboxProps}
