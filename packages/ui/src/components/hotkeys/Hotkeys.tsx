import clsx from 'clsx'
import {type ComponentPropsWithRef} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {KBD} from '../kbd/KBD'
import {type HotkeysProps, hotkeysProps} from './hotkeys.props'

const hotkeysClassName = suffixClassName('sui-Hotkeys')

/** @alpha */
export function Hotkeys({keys, ...props}: HotkeysProps) {
  const {className, style, ...rest} = getProps(props, hotkeysProps)

  if (!keys || keys.length === 0) {
    return null
  }

  const hotkeysClasses = clsx(hotkeysClassName, 'sui-display-inline-flex')

  return (
    <kbd className={clsx(hotkeysClasses, className)} style={style} data-ui="Hotkeys" {...rest}>
      {(keys as string[]).map((key) => (
        <KBD key={key} text={key} />
      ))}
    </kbd>
  )
}

export type {HotkeysProps}
