import {ChevronDownIcon} from '@sanity/icons'
import {_inputElement, select, selectPresentation, type SelectStyleProps} from '@sanity/ui/css'
import {useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks/useCustomValidity'
import type {ComponentType, Props} from '../../types'
import {Box} from '../box/Box'
import {Text} from '../text/Text'

/**
 * The default HTML element type rendered by the {@link Select} component.
 *
 * @public
 */
export const DEFAULT_SELECT_ELEMENT = 'select'

/**
 * Own props for the {@link Select} component.
 *
 * @remarks
 * Extends {@link SelectStyleProps} (which inherits from {@link InputStyleProps})
 * to provide shared input styling capabilities alongside select-specific properties.
 *
 * In addition to the props listed below, the component also forwards all standard
 * HTML `<select>` attributes (e.g. `value`, `defaultValue`, `disabled`, `multiple`,
 * `name`, `onChange`, `onBlur`, `ref`, etc.) to the underlying element.
 *
 * @public
 */
export type SelectOwnProps = SelectStyleProps & {
  /**
   * Sets a custom validation message on the select input element.
   *
   * @remarks
   * When a non-empty string is provided, the select is marked as invalid
   * via the Constraint Validation API (`setCustomValidity`), and the
   * `data-invalid` attribute is applied to the wrapper element for styling.
   *
   * Set to an empty string `""` or `undefined` to clear the validation error.
   */
  customValidity?: string

  /**
   * When `true`, prevents the user from changing the selected value while
   * keeping the element visually enabled.
   *
   * @remarks
   * Internally sets the native `disabled` attribute on the `<select>` element
   * to prevent interaction, while applying a `data-read-only` attribute on the
   * wrapper for styling differentiation from the disabled state.
   */
  readOnly?: boolean
}

/**
 * Accepted values for the `as` prop of the {@link Select} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Select`.
 *
 * @public
 */
export type SelectElementType = 'select' | ComponentType

/**
 * Props for the {@link Select} component.
 *
 * @remarks
 * Combines {@link SelectOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<select>` element by default.
 *
 * Standard HTML `<select>` attributes supported include:
 * - `value` (`string | string[]`) – The currently selected value(s) (controlled mode).
 * - `defaultValue` (`string | string[]`) – The initial selected value(s) (uncontrolled mode).
 * - `disabled` (`boolean`) – When `true`, disables the select and prevents interaction.
 * - `multiple` (`boolean`) – When `true`, allows selecting multiple options.
 * - `name` (`string`) – The form field name for the select.
 * - `onChange` (`ChangeEventHandler<HTMLSelectElement>`) – Callback fired when the selection changes.
 * - `ref` (`Ref<HTMLSelectElement>`) – Ref forwarded to the underlying `<select>` element.
 * - `children` (`ReactNode`) – The `<option>` and `<optgroup>` elements to render inside the select.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link SelectElementType}.
 *
 * @public
 */
export type SelectProps<E extends SelectElementType = SelectElementType> = Props<SelectOwnProps, E>

/**
 * A styled select input component that provides a dropdown for choosing
 * from a set of options.
 *
 * @remarks
 * The `Select` component renders a native `<select>` element wrapped in a
 * styled container with a chevron icon indicator. It supports all standard
 * HTML `<select>` attributes, custom validation via `customValidity`, and
 * a read-only mode that prevents user changes while maintaining visual clarity.
 *
 * Children should be standard `<option>` or `<optgroup>` HTML elements.
 *
 * @public
 */
export function Select<E extends SelectElementType = typeof DEFAULT_SELECT_ELEMENT>(
  props: SelectProps<E>,
): React.JSX.Element {
  const {
    as: Element = DEFAULT_SELECT_ELEMENT,
    border = true,
    children,
    customValidity,
    disabled,
    flex,
    fontSize = 2,
    gap = 2,
    padding = 3,
    radius = 1,
    readOnly,
    ref: forwardedRef,
    width = 'fill',
    ...rest
  } = props as SelectProps<typeof DEFAULT_SELECT_ELEMENT>

  const ref = useRef<HTMLSelectElement | null>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <span
      data-ui="Select"
      className={select({border, fontSize, flex, gap, padding, radius, width})}
      data-icon-right=""
    >
      <Element {...rest} className={_inputElement()} disabled={disabled || readOnly} ref={ref}>
        {children}
      </Element>
      <span className={selectPresentation()}>
        <Box as="span" display="inline-block" padding={padding}>
          <Text size={fontSize}>
            <ChevronDownIcon />
          </Text>
        </Box>
      </span>
    </span>
  )
}
