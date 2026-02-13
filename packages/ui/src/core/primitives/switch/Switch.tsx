import {
  _switch,
  _switchElement,
  _switchPresentation,
  _switchThumb,
  _switchTrack,
} from '@sanity/ui/css'
import {useEffect, useImperativeHandle, useRef} from 'react'

import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_SWITCH_ELEMENT = 'input'

/** @public */
export type SwitchOwnProps = {
  indeterminate?: boolean
}

/** @public */
export type SwitchElementType = 'input' | ComponentType

/** @public */
export type SwitchProps<E extends SwitchElementType = SwitchElementType> = Props<SwitchOwnProps, E>

/**
 * The `Switch` component allows the user to toggle a setting on and off.
 *
 * Extends all properties of an `<input type="checkbox" />` element, except type.
 *
 * @public
 */
export function Switch<E extends SwitchElementType = typeof DEFAULT_SWITCH_ELEMENT>(
  props: SwitchProps<E>,
): React.JSX.Element {
  const {
    as: Element = DEFAULT_SWITCH_ELEMENT,
    className,
    disabled,
    indeterminate,
    readOnly,
    ref: forwardedRef,
    ...rest
  } = props as SwitchProps<typeof DEFAULT_SWITCH_ELEMENT>

  const ref = useRef<HTMLInputElement | null>(null)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useEffect(() => {
    if (ref.current) {
      // Set the indeterminate state
      ref.current.indeterminate = indeterminate || false
    }
  }, [indeterminate])

  return (
    <span className={_switch({className})} data-ui="Switch">
      <Element
        {...rest}
        className={_switchElement()}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled || readOnly}
        type="checkbox"
        ref={ref}
      />
      <span aria-hidden className={_switchPresentation()}>
        <span className={_switchTrack()} />
        <span className={_switchThumb()} />
      </span>
    </span>
  )
}
