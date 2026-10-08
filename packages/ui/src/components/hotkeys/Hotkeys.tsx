import clsx from 'clsx'
import {type ComponentPropsWithRef} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {KBD} from '../kbd/KBD'
import {type HotkeysProps, hotkeysProps} from './hotkeys.props'

const hotkeysClassName = suffixClassName('sui-Hotkeys')

/** @alpha */
export function Hotkeys(
  props: HotkeysProps & Omit<ComponentPropsWithRef<'kbd'>, keyof HotkeysProps>,
) {
  const {className, keys, style, ...rest} = getProps(props, hotkeysProps)

  if (!keys || keys.length === 0) {
    return null
  }

  const hotkeysClasses = clsx(hotkeysClassName, 'sui-display-inline-flex sui-align-items-center')

  return (
    <kbd className={clsx(hotkeysClasses, className)} style={style} data-ui="Hotkeys" {...rest}>
      {/* A shortcut never repeats a key, so the key name is unique. */}
      {(keys as string[]).map((key) => (
        <KBD key={key} text={key} />
      ))}
    </kbd>
  )
}

export type {HotkeysProps}
