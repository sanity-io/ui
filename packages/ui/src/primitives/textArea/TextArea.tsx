import type {ComponentType, Props} from '@sanity/ui/core'
import {
  textArea,
  textArea_element,
  textArea_presentation,
  type TextAreaStyleProps,
} from '@sanity/ui/css'
import {useCustomValidity} from '@sanity/ui/hooks'
import {useImperativeHandle, useRef} from 'react'

/**
 * The default HTML element type rendered by the {@link TextArea} component.
 *
 * @public
 */
export const DEFAULT_TEXT_AREA_ELEMENT = 'textarea'

/**
 * Own props for the {@link TextArea} component.
 *
 * @remarks
 * Extends {@link TextAreaStyleProps} to provide visual styling props such as
 * `border`, `fontSize`, `padding`, `radius`, and `width`.
 *
 * @public
 */
export type TextAreaOwnProps = TextAreaStyleProps & {
  /**
   * When `true`, disables the focus ring around the text area.
   *
   * @beta Do not use in production.
   */
  __unstable_disableFocusRing?: boolean
  /**
   * Sets a custom validation message on the underlying textarea element.
   *
   * @remarks
   * When set to a non-empty string, the text area is marked as invalid
   * and the provided message is used as the validation message.
   */
  customValidity?: string
}

/**
 * Accepted values for the `as` prop of the {@link TextArea} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `TextArea`.
 *
 * @public
 */
export type TextAreaElementType = 'textarea' | ComponentType

/**
 * Props for the {@link TextArea} component.
 *
 * @remarks
 * Combines {@link TextAreaOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<textarea>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TextAreaElementType}.
 *
 * @public
 */
export type TextAreaProps<E extends TextAreaElementType = TextAreaElementType> = Props<
  TextAreaOwnProps,
  E
>

/**
 * The `TextArea` component provides a styled multiline text input.
 *
 * @remarks
 * Renders a native `<textarea>` element by default, wrapped in a styled
 * container with border, padding, and focus ring treatment from the theme.
 * It supports custom validation, read-only state, and all standard HTML
 * textarea attributes.
 *
 * @public
 */
export function TextArea<E extends TextAreaElementType = typeof DEFAULT_TEXT_AREA_ELEMENT>(
  props: TextAreaProps<E>,
): React.JSX.Element {
  const {
    __unstable_disableFocusRing,
    as: Element = DEFAULT_TEXT_AREA_ELEMENT,
    border = true,
    className,
    customValidity,
    disabled = false,
    flex,
    fontSize = 2,
    fontWeight,
    gap = 3,
    padding = 3,
    radius = 3,
    readOnly,
    ref: forwardedRef,
    width,
    ...rest
  } = props as TextAreaProps<typeof DEFAULT_TEXT_AREA_ELEMENT>

  const ref = useRef<HTMLTextAreaElement | null>(null)

  useImperativeHandle<HTMLTextAreaElement | null, HTMLTextAreaElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <span
      className={textArea({
        className,
        border,
        flex,
        fontSize,
        fontWeight,
        gap,
        padding,
        radius,
        width,
      })}
      data-ui="TextArea"
    >
      <Element
        {...rest}
        ref={ref}
        className={textArea_element()}
        data-invalid={customValidity ? '' : undefined}
        data-no-focus-ring={__unstable_disableFocusRing ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled}
        readOnly={readOnly}
      />
      <span className={textArea_presentation()} />
    </span>
  )
}
