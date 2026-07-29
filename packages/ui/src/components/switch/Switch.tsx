import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {Label} from '../label/Label'
import {VisuallyHidden} from '../visually-hidden/VisuallyHidden'
import {type SwitchProps, switchProps} from './switch.props'

const switchClassName = suffixClassName('sui-Switch')
const switchInputClassName = suffixClassName('sui-SwitchInput')
const switchMarkClassName = suffixClassName('sui-SwitchMark')

/** @beta */
export function Switch(props: SwitchProps) {
  const {className, style, disabled, error, label, ...rest} = getProps(props, switchProps)

  return (
    <Label
      className={clsx(switchClassName, className)}
      style={style}
      data-ui="Switch"
      disabled={props.disabled}
      error={error}
    >
      <VisuallyHidden
        as="input"
        type="checkbox"
        role="switch"
        className={switchInputClassName}
        disabled={disabled}
        {...rest}
      />

      <Flex
        as="span"
        className={clsx(switchMarkClassName, error && 'sui-error')}
        alignItems="center"
        radius={6}
        aria-hidden="true"
      />

      {label}
    </Label>
  )
}

export type {SwitchProps}
