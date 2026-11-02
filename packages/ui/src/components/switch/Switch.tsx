import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {type SwitchProps, switchProps} from './switch.props'

const switchClassName = suffixClassName('sui-Switch')
const switchInputClassName = suffixClassName('sui-SwitchInput')

/** @beta */
export function Switch(props: SwitchProps) {
  const {className, style, hasError, ...rest} = getProps(props, switchProps)

  return (
    <Flex
      as="span"
      className={clsx(switchClassName, className)}
      position="relative"
      alignItems="center"
      radius={6}
    >
      <input
        type="checkbox"
        role="switch"
        className={switchInputClassName}
        aria-invalid={hasError || undefined}
        {...rest}
      />
    </Flex>
  )
}

export type {SwitchProps}
