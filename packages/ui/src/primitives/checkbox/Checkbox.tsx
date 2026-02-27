import {CheckmarkIcon, RemoveIcon} from '@sanity/icons'
import {type ComponentType, type Props} from '@sanity/ui/core'
import {checkbox, checkbox_input, checkbox_presentation} from '@sanity/ui/css'
import {useCustomValidity} from '@sanity/ui/hooks'
import {useEffect, useImperativeHandle, useRef} from 'react'

/**
 * The default HTML element type rendered by the {@link Checkbox} component.
 *
 * @public
 */
export const DEFAULT_CHECKBOX_ELEMENT = 'input'

/**
 * Own props for the {@link Checkbox} component.
 *
 * @public
 */
export type CheckboxOwnProps = {
  /**
   * When `true`, sets the checkbox to an indeterminate (mixed) state,
   * visually distinct from both checked and unchecked.
   */
  indeterminate?: boolean
  /**
   * Sets a custom validation message on the underlying input element.
   *
   * @remarks
   * When set to a non-empty string, the checkbox is marked as invalid
   * and the provided message is used as the validation message.
   */
  customValidity?: string
}

/**
 * Accepted values for the `as` prop of the {@link Checkbox} component.
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
 * @typeParam E - The HTML element or component type to render. Defaults to {@link CheckboxElementType}.
 *
 * @public
 */
export type CheckboxProps<E extends CheckboxElementType = CheckboxElementType> = Props<
  CheckboxOwnProps,
  E
>

/**
 * The `Checkbox` component allows the user to select one or more items from a set.
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
        ref={ref}
        className={checkbox_input()}
        data-invalid={customValidity ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled || readOnly}
        readOnly={readOnly}
        type="checkbox"
      />
      <span className={checkbox_presentation()}>
        <CheckmarkIcon />
        <RemoveIcon />
      </span>
    </span>
  )
}
