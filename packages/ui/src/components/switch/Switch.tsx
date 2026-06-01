import classNames from 'classnames'
import {useEffect, useRef} from 'react'

import {getProps} from '../../utils/getProps'
import {Box} from '../box/Box'
import {Label} from '../label/Label'
import {VisuallyHidden} from '../visually-hidden/VisuallyHidden'
import {type SwitchProps, switchProps} from './switch.props'

/** @beta */
export function Switch(props: SwitchProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const {className, style, label, indeterminate, ...rest} = getProps(props, switchProps)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <Label
      className={classNames('sui-Switch', className)}
      style={style}
      data-ui="Switch"
      disabled={props.disabled}
    >
      <VisuallyHidden
        as="input"
        type="checkbox"
        role="switch"
        className="sui-SwitchInput"
        ref={inputRef}
        {...rest}
      />

      <Box
        as="span"
        className="sui-SwitchMark sui-tone-neutral"
        position="relative"
        radius={6}
        width="25px"
        height="17px"
        aria-hidden="true"
      />

      {label}
    </Label>
  )
}
