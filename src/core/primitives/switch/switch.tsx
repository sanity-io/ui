import {
  _composeClassNames,
  _switch,
  _switchElement,
  _switchPresentation,
  _switchThumb,
  _switchTrack,
} from '@sanity/ui/css'
import {useEffect, useImperativeHandle, useRef} from 'react'

import type {ComponentType, Props} from '../../types'
import {Box} from '../box'

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
) {
  const {
    as: Element = DEFAULT_SWITCH_ELEMENT,
    checked,
    className,
    disabled,
    indeterminate,
    readOnly,
    ref: forwardedRef,
    style,
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
    <Box
      className={_composeClassNames(className, _switch())}
      data-checked={checked ? '' : undefined}
      data-indeterminate={indeterminate ? '' : undefined}
      data-ui="Switch"
      display="inline-block"
      position="relative"
      style={style}
    >
      <Element
        {...rest}
        checked={indeterminate !== true && checked}
        className={_switchElement()}
        data-disabled={disabled ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled || readOnly}
        type="checkbox"
        ref={ref}
      />
      <span aria-hidden className={_switchPresentation()}>
        <span className={_switchTrack()} />
        <span className={_switchThumb()} />
      </span>
    </Box>
  )
}

Switch.displayName = 'Switch'
