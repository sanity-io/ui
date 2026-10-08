import clsx from 'clsx'
import {type ComponentPropsWithRef} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Text} from '../text/Text'
import {type KBDProps, kbdProps} from './kbd.props'

const kbdClassName = suffixClassName('sui-KBD')

/** @alpha */
export function KBD(props: KBDProps & Omit<ComponentPropsWithRef<'kbd'>, keyof KBDProps>) {
  const {className, style, text, ...rest} = getProps(props, kbdProps)

  const kbdClasses = clsx(kbdClassName, 'sui-p1 sui-radius2 sui-display-inline-block')

  return (
    <kbd className={clsx(kbdClasses, className)} style={style} data-ui="KBD" {...rest}>
      <Text as="span" size={0} weight="semibold" muted trim>
        {text}
      </Text>
    </kbd>
  )
}

export type {KBDProps}
