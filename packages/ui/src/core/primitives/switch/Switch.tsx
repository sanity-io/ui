import {
  _switch,
  _switchElement,
  _switchPresentation,
  _switchThumb,
  _switchTrack,
} from '@sanity/ui/css'
import {useEffect, useImperativeHandle, useRef} from 'react'

import type {ComponentType, Props} from '../../types'

/**
 * The default HTML element type rendered by the {@link Switch} component.
 *
 * @public
 */
export const DEFAULT_SWITCH_ELEMENT = 'input'

/**
 * Own props for the {@link Switch} component.
 *
 * @remarks
 * In addition to the props listed below, the `Switch` component accepts all
 * intrinsic HTML attributes of an `<input type="checkbox" />` element
 * (e.g. `checked`, `defaultChecked`, `onChange`, `name`, `value`, `disabled`,
 * `readOnly`, `ref`, etc.) via the underlying element type.
 *
 * @public
 */
export type SwitchOwnProps = {
  /**
   * When `true`, sets the switch to an indeterminate (mixed) visual state.
   *
   * @remarks
   * The indeterminate state is set programmatically via the
   * `HTMLInputElement.indeterminate` property and cannot be set through HTML alone.
   * It represents a "neither on nor off" state, which is useful for parent
   * checkboxes that summarize the state of a group of child checkboxes.
   *
   * Note: The indeterminate state is purely visual and does not affect the
   * underlying `checked` value of the input.
   */
  indeterminate?: boolean
}

/**
 * Accepted values for the `as` prop of the {@link Switch} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Switch`.
 *
 * @public
 */
export type SwitchElementType = 'input' | ComponentType

/**
 * Props for the {@link Switch} component.
 *
 * @remarks
 * Combines {@link SwitchOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders an `<input>` element by default.
 *
 * Common inherited HTML props:
 * - `checked` (`boolean`) – Controls whether the switch is on or off (controlled mode).
 * - `defaultChecked` (`boolean`) – Sets the initial checked state (uncontrolled mode).
 * - `disabled` (`boolean`) – When `true`, disables the switch and prevents interaction.
 * - `readOnly` (`boolean`) – When `true`, prevents the user from changing the switch state. The switch is rendered as disabled but without the native `disabled` styling.
 * - `name` (`string`) – The form field name for the input.
 * - `value` (`string`) – The form field value for the input.
 * - `onChange` (`ChangeEventHandler<HTMLInputElement>`) – Callback fired when the switch state changes.
 * - `ref` (`Ref<HTMLInputElement>`) – A ref forwarded to the underlying `<input>` element.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link SwitchElementType}.
 *
 * @public
 */
export type SwitchProps<E extends SwitchElementType = SwitchElementType> = Props<SwitchOwnProps, E>

/**
 * A toggle switch component that allows the user to turn a setting on and off.
 *
 * @remarks
 * The `Switch` component renders an `<input type="checkbox">` element by default,
 * styled as a toggle switch with a track and thumb. It supports all standard
 * checkbox input attributes including `checked`, `disabled`, `readOnly`, `name`,
 * and `onChange`.
 *
 * The `indeterminate` prop can be used to set the switch to a mixed visual state
 * that represents "neither on nor off".
 *
 * When `readOnly` is `true`, the switch is visually rendered as non-interactive
 * (functionally disabled) but distinguished from `disabled` via a `data-read-only`
 * attribute for styling purposes.
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
