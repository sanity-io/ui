import {_inputElement, _inputPresentation, textArea, type TextAreaStyleProps} from '@sanity/ui/css'
import {useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks/useCustomValidity'
import type {ComponentType, Props} from '../../types'

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
 * Extends {@link TextAreaStyleProps} (which itself extends {@link InputStyleProps})
 * to provide shared input styling capabilities alongside textarea-specific props.
 *
 * Inherited from {@link InputStyleProps} (via {@link TextAreaStyleProps}):
 * - `border` (`boolean`) – When `true`, renders a visible border around the textarea. Default: `true`.
 * - `fontSize` (`ResponsiveProp<FontTextSize>`) – Sets the font size of the textarea text. Accepted values: `0 | 1 | 2 | 3 | 4`. Default: `2`.
 * - `gap` (`ResponsiveProp<Space>`) – Sets the gap between internal elements. Default: `3`.
 * - `padding` (`ResponsiveProp<Space>`) – Sets the inner padding. Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`. Default: `3`.
 * - `flex` (`ResponsiveProp<Flex>`) – Controls flex grow/shrink behavior.
 * - `radius` (`ResponsiveProp<Radius | 'full'>`) – Sets the border radius. Default: `2`.
 * - `width` (`ResponsiveProp<Width>`) – Sets the width of the textarea.
 *
 * In addition to the props listed below, all standard HTML `<textarea>` attributes
 * (e.g. `rows`, `cols`, `placeholder`, `value`, `defaultValue`, `onChange`, `onBlur`,
 * `onFocus`, `name`, `disabled`, `readOnly`, `ref`, etc.) are also accepted and
 * forwarded to the underlying element.
 *
 * @public
 */
export type TextAreaOwnProps = TextAreaStyleProps & {
  /**
   * When `true`, disables the default focus ring rendered around the textarea
   * when it receives focus.
   *
   * @beta Do not use in production.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  __unstable_disableFocusRing?: boolean

  /**
   * Sets a custom validation message on the textarea element.
   *
   * @remarks
   * When a non-empty string is provided, the textarea is marked as invalid
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
 * Accepted values for the `as` prop of the {@link TextArea} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `TextArea`.
 *
 * Accepted values: `"textarea"` | `ComponentType`
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
 * Standard HTML `<textarea>` attributes supported include:
 * - `rows` (`number`) – The number of visible text lines.
 * - `cols` (`number`) – The visible width of the textarea in character widths.
 * - `placeholder` (`string`) – Placeholder text shown when the textarea is empty.
 * - `value` (`string`) – The controlled value of the textarea.
 * - `defaultValue` (`string`) – The initial value for uncontrolled usage.
 * - `disabled` (`boolean`) – When `true`, disables the textarea and prevents interaction. Default: `false`.
 * - `readOnly` (`boolean`) – When `true`, prevents the user from modifying the content. The textarea is rendered as disabled but with a `data-read-only` attribute for styling differentiation.
 * - `name` (`string`) – The form field name for the textarea.
 * - `onChange` (`ChangeEventHandler<HTMLTextAreaElement>`) – Callback fired when the value changes.
 * - `onBlur` (`FocusEventHandler<HTMLTextAreaElement>`) – Callback fired when the textarea loses focus.
 * - `onFocus` (`FocusEventHandler<HTMLTextAreaElement>`) – Callback fired when the textarea receives focus.
 * - `ref` (`Ref<HTMLTextAreaElement>`) – A ref forwarded to the underlying `<textarea>` element.
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
 * A multiline text input component for entering longer text content.
 *
 * @remarks
 * The `TextArea` component renders a `<textarea>` element by default, wrapped in a
 * styled container that provides the design system's visual treatment including
 * borders, focus rings, and custom validation states.
 *
 * It supports custom validation via the `customValidity` prop and read-only mode
 * via the `readOnly` prop (which renders the textarea as `disabled` while applying
 * a `data-read-only` attribute for distinct styling).
 *
 * ### Default prop values
 *
 * | Prop | Default |
 * |------|---------|
 * | `as` | `"textarea"` |
 * | `border` | `true` |
 * | `disabled` | `false` |
 * | `fontSize` | `2` |
 * | `gap` | `3` |
 * | `padding` | `3` |
 * | `radius` | `2` |
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
    gap = 3,
    padding = 3,
    radius = 2,
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
        gap,
        padding,
        radius,
        width,
      })}
      data-invalid={customValidity ? '' : undefined}
      data-read-only={!disabled && readOnly ? '' : undefined}
      data-ui="TextArea"
    >
      <Element
        {...rest}
        className={_inputElement()}
        data-no-focus-ring={__unstable_disableFocusRing ? '' : undefined}
        disabled={disabled}
        readOnly={readOnly}
        ref={ref}
      />
      <span className={_inputPresentation()} />
    </span>
  )
}
