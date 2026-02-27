import type {ComponentType, Props} from '@sanity/ui/core'
import {
  _switch,
  _switch_element,
  _switchPresentation,
  _switchThumb,
  _switchTrack,
} from '@sanity/ui/css'
import {useEffect, useImperativeHandle, useRef} from 'react'

/**
 * The default HTML element type rendered by the {@link Switch} component.
 *
 * @public
 */
export const DEFAULT_SWITCH_ELEMENT = 'input'

/**
 * Own props for the {@link Switch} component.
 *
 * @public
 */
export type SwitchOwnProps = {
  /**
   * When `true`, sets the switch to an indeterminate (mixed) state,
   * visually distinct from both on and off.
   */
  indeterminate?: boolean
}

/**
 * Accepted values for the `as` prop of the {@link Switch} component.
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
 * @typeParam E - The HTML element or component type to render. Defaults to {@link SwitchElementType}.
 *
 * @public
 */
export type SwitchProps<E extends SwitchElementType = SwitchElementType> = Props<SwitchOwnProps, E>

/**
 * The `Switch` component allows the user to toggle a setting on and off.
 *
 * @remarks
 * Renders an `<input type="checkbox">` by default, styled as a toggle switch
 * with a track and thumb. It supports `indeterminate`, `disabled`, and
 * `readOnly` states.
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
        ref={ref}
        className={_switch_element()}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled || readOnly}
        type="checkbox"
      />
      <span aria-hidden className={_switch_presentation()}>
        <span className={_switch_track()} />
        <span className={_switch_thumb()} />
      </span>
    </span>
  )
}
