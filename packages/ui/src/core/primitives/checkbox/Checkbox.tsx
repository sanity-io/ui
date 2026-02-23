import {CheckmarkIcon, RemoveIcon} from '@sanity/icons'
import {checkbox, checkboxInput, checkboxPresentation} from '@sanity/ui/css'
import {useEffect, useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks/useCustomValidity'
import type {ComponentType, Props} from '../../types'

/**
 * The default HTML element type rendered by the {@link Checkbox} component.
 *
 * @public
 */
export const DEFAULT_CHECKBOX_ELEMENT = 'input'

/**
 * Own props for the {@link Checkbox} component.
 *
 * @remarks
 * Defines the configuration for rendering a checkbox input. In addition to the
 * props listed below, the component also forwards all standard HTML `<input>`
 * attributes (e.g. `checked`, `defaultChecked`, `disabled`, `readOnly`, `name`,
 * `value`, `onChange`, `onBlur`, etc.) to the underlying element.
 *
 * @public
 */
export type CheckboxOwnProps = {
  /**
   * When `true`, sets the checkbox to an indeterminate (mixed) visual state.
   *
   * @remarks
   * The indeterminate state is a visual-only state that indicates the checkbox
   * is neither fully checked nor unchecked. It is typically used when a checkbox
   * represents a group where some, but not all, child items are selected.
   *
   * This is set via the `HTMLInputElement.indeterminate` DOM property (not an
   * HTML attribute), so it can only be controlled programmatically.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  indeterminate?: boolean

  /**
   * Sets a custom validation message on the checkbox input element.
   *
   * @remarks
   * When a non-empty string is provided, the checkbox is marked as invalid
   * via the Constraint Validation API (`setCustomValidity`), and the
   * `data-invalid` attribute is applied to the wrapper element for styling.
   *
   * Set to an empty string `""` or `undefined` to clear the validation error.
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  customValidity?: string
}

/**
 * Accepted values for the `as` prop of the {@link Checkbox} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Checkbox`.
 *
 * Accepted values: `"input"` | `ComponentType`
 *
 * @public
 */
export type CheckboxElementType = 'input' | ComponentType

/**
 * Props for the {@link Checkbox} component.
 *
 * @remarks
 * Combines {@link CheckboxOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders an `<input>` element by default.
 *
 * Standard HTML `<input>` props available include:
 * - `checked` – Controls the checked state of the checkbox.
 * - `defaultChecked` – Sets the initial checked state for uncontrolled usage.
 * - `disabled` – Disables the checkbox, preventing interaction.
 * - `readOnly` – Makes the checkbox read-only (visually enabled but non-interactive).
 * - `name` – The form field name for the checkbox.
 * - `value` – The value submitted with the form when checked.
 * - `onChange` – Callback fired when the checked state changes.
 * - `onBlur` – Callback fired when the checkbox loses focus.
 * - `ref` – A ref to the underlying `HTMLInputElement`.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link CheckboxElementType}.
 *
 * @public
 */
export type CheckboxProps<E extends CheckboxElementType = CheckboxElementType> = Props<
  CheckboxOwnProps,
  E
>

/**
 * Checkboxes allow the user to select one or more items from a set.
 *
 * @remarks
 * The `Checkbox` component renders an `<input type="checkbox">` element by default,
 * wrapped in a presentational container that provides custom styling. It supports
 * checked, unchecked, indeterminate, disabled, and read-only states.
 *
 * When `readOnly` is `true`, the checkbox is visually enabled but interaction is
 * prevented by setting the native `disabled` attribute. A `data-read-only` attribute
 * is applied for styling differentiation from disabled state.
 *
 * ### Default prop values
 *
 * | Prop | Default |
 * |------|---------|
 * | `as` | `"input"` |
 *
 * @public
 */
export function Checkbox<E extends CheckboxElementType = typeof DEFAULT_CHECKBOX_ELEMENT>(
  props: CheckboxProps<E>,
): React.JSX.Element {
  const {
    as: Element = DEFAULT_CHECKBOX_ELEMENT,
    className,
    disabled,
    indeterminate,
    customValidity,
    readOnly,
    ref: forwardedRef,
    style,
    ...rest
  } = props as CheckboxProps<typeof DEFAULT_CHECKBOX_ELEMENT>

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

  useCustomValidity(ref, customValidity)

  return (
    <span className={checkbox({className})} data-ui="Checkbox" style={style}>
      <Element
        {...rest}
        className={checkboxInput()}
        data-invalid={customValidity ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled || readOnly}
        type="checkbox"
        readOnly={readOnly}
        ref={ref}
      />
      <span className={checkboxPresentation()}>
        <CheckmarkIcon />
        <RemoveIcon />
      </span>
    </span>
  )
}
