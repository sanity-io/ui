import {radio, radioInput, radioPresentation} from '@sanity/ui/css'
import {useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks/useCustomValidity'
import type {ComponentType, Props} from '../../types'

/**
 * The default HTML element type rendered by the {@link Radio} component.
 *
 * @public
 */
export const DEFAULT_RADIO_ELEMENT = 'input'

/**
 * Own props for the {@link Radio} component.
 *
 * @remarks
 * Defines the configuration for a radio input element. In addition to the props
 * listed below, all standard HTML `<input>` attributes (such as `name`, `value`,
 * `checked`, `disabled`, `readOnly`, `onChange`, etc.) are also accepted and
 * forwarded to the underlying element.
 *
 * @public
 */
export type RadioOwnProps = {
  /**
   * A custom validation message to display when the radio input is invalid.
   *
   * @remarks
   * When set to a non-empty string, the input is marked as invalid via the
   * `data-invalid` attribute and the browser's constraint validation API
   * (`setCustomValidity`). When set to an empty string or `undefined`, the
   * input is considered valid.
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  customValidity?: string
}

/**
 * Accepted values for the `as` prop of the {@link Radio} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Radio`.
 *
 * Accepted values: `"input"` | `ComponentType`
 *
 * @public
 */
export type RadioElementType = 'input' | ComponentType

/**
 * Props for the {@link Radio} component.
 *
 * @remarks
 * Combines {@link RadioOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders an `<input type="radio">` element by default.
 *
 * Standard HTML `<input>` attributes supported include:
 * - `name` – Groups radio buttons together so only one in the group can be selected.
 * - `value` – The value submitted with the form when this radio is selected.
 * - `checked` – Whether the radio is currently selected.
 * - `disabled` – When `true`, prevents user interaction.
 * - `readOnly` – When `true`, prevents user changes but keeps the input focusable.
 * - `onChange` – Callback fired when the radio's checked state changes.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link RadioElementType}.
 *
 * @public
 */
export type RadioProps<E extends RadioElementType = RadioElementType> = Props<RadioOwnProps, E>

/**
 * A radio input that allows the user to select one option from a set.
 *
 * @remarks
 * The `Radio` component renders an `<input type="radio">` element by default,
 * wrapped in a presentational container that provides the design system's
 * visual styling. Radio buttons are used when only one option from a group
 * can be selected at a time.
 *
 * When `readOnly` is `true`, the input is rendered as `disabled` to prevent
 * user changes while the `data-read-only` attribute is applied for styling.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `RadioElementType` | `"input"` | No | The HTML element or component type to render. |
 * | `customValidity` | `string` | `undefined` | No | A custom validation message for the input. |
 * | `disabled` | `boolean` | `undefined` | No | Prevents user interaction when `true`. |
 * | `readOnly` | `boolean` | `undefined` | No | Prevents user changes while keeping the input focusable. |
 * | `name` | `string` | `undefined` | No | Groups radio buttons so only one in the group can be selected. |
 * | `value` | `string` | `undefined` | No | The value submitted with the form when selected. |
 * | `checked` | `boolean` | `undefined` | No | Whether the radio is currently selected. |
 *
 * @public
 */
export function Radio<E extends RadioElementType = typeof DEFAULT_RADIO_ELEMENT>(
  props: RadioProps<E>,
): React.JSX.Element {
  const {
    as: Element = DEFAULT_RADIO_ELEMENT,
    className,
    disabled,
    style,
    customValidity,
    readOnly,
    ref: forwardedRef,
    ...rest
  } = props as RadioProps<typeof DEFAULT_RADIO_ELEMENT>

  const ref = useRef<HTMLInputElement | null>(null)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <span className={radio({className})} data-ui="Radio" style={style}>
      <Element
        {...rest}
        className={radioInput()}
        data-invalid={customValidity ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled || readOnly}
        readOnly={readOnly}
        ref={ref}
        type="radio"
      />
      <span className={radioPresentation()} />
    </span>
  )
}
