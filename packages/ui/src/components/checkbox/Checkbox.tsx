import {CheckmarkIcon, RemoveIcon} from '@sanity/icons'
import classNames from 'classnames'
import {useEffect, useRef} from 'react'

import {getProps} from '../../utils/getProps'
import {Box} from '../box/Box'
import {Label} from '../label/Label'
import {VisuallyHidden} from '../visually-hidden/VisuallyHidden'
import {type CheckboxProps, checkboxProps} from './checkbox.props'

/** @beta */
export function Checkbox(props: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const {className, style, label, indeterminate, ...rest} = getProps(props, checkboxProps)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <Label
      className={classNames('sui-Checkbox', className)}
      style={style}
      data-ui="Checkbox"
      disabled={props.disabled}
    >
      <VisuallyHidden
        as="input"
        type="checkbox"
        className="sui-CheckboxInput"
        ref={inputRef}
        {...rest}
      />

      <Box
        as="span"
        className="sui-CheckboxMark sui-tone-neutral"
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
