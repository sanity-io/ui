import {SelectIcon} from '@sanity/icons'
import type {ComponentType, Props} from '@sanity/ui/core'
import {_input_element, select, select_presentation, type SelectStyleProps} from '@sanity/ui/css'
import {useCustomValidity} from '@sanity/ui/hooks'
import {Text} from '@sanity/ui/primitives/text'
import {useImperativeHandle, useRef} from 'react'

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
 * Extends {@link SelectStyleProps} to provide visual styling props such as
 * `border`, `fontSize`, `padding`, `radius`, and `width`.
 *
 * @public
 */
export type SelectOwnProps = SelectStyleProps & {
  /**
   * Sets a custom validation message on the underlying select element.
   *
   * @remarks
   * When set to a non-empty string, the select is marked as invalid
   * and the provided message is used as the validation message.
   */
  customValidity?: string
  /**
   * When `true`, prevents user interaction with the select element
   * without applying a disabled visual state.
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
 * @typeParam E - The HTML element or component type to render. Defaults to {@link SelectElementType}.
 *
 * @public
 */
export type SelectProps<E extends SelectElementType = SelectElementType> = Props<SelectOwnProps, E>

/**
 * The `Select` component provides a styled dropdown for selecting from a set of options.
 *
 * @remarks
 * Renders a native `<select>` element by default, wrapped in a styled container
 * with a trailing dropdown icon. It supports custom validation, read-only state,
 * and all standard HTML select attributes.
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
    radius,
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
      className={select({border, fontSize, flex, gap, padding, radius, width})}
      data-icon-right=""
      data-ui="Select"
    >
      <Element {...rest} ref={ref} className={_input_element()} disabled={disabled || readOnly}>
        {children}
      </Element>
      <span className={select_presentation()}>
        <span>
          <Text size={fontSize}>
            <SelectIcon />
          </Text>
        </span>
      </span>
    </span>
  )
}
