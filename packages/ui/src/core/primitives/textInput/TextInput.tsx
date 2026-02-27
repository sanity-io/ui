import {CloseIcon} from '@sanity/icons'
import {
  _inputElement,
  _inputPresentation,
  type InputStyleProps,
  type ResponsiveProp,
  textInput,
  textInputElement,
  textInputPrefix,
  textInputSuffix,
} from '@sanity/ui/css'
import type {FontWeight, Space} from '@sanity/ui/theme'
import {
  type ElementType,
  isValidElement,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import {isValidElementType} from 'react-is'

import {EMPTY_RECORD} from '../../constants'
import {_getResponsiveProp} from '../../helpers/props'
import {useCustomValidity} from '../../hooks/useCustomValidity'
import {isRecord} from '../../lib/isRecord'
import type {ComponentType, Props} from '../../types'
import {Box} from '../box/Box'
import {Button, type ButtonProps} from '../button/Button'
import {Text} from '../text/Text'

/**
 * The default HTML element type rendered by the {@link TextInput} component.
 *
 * @public
 */
export const DEFAULT_TEXT_INPUT_ELEMENT = 'input'

/**
 * Props accepted by the clear button rendered inside the {@link TextInput} component.
 *
 * @remarks
 * Extends {@link ButtonProps} for a `<button>` element with `as`, `onClick`, and
 * `onMouseDown` omitted because they are managed internally by the `TextInput`.
 *
 * @public
 */
export type TextInputClearButtonProps = Omit<
  ButtonProps<'button'>,
  'as' | 'onClick' | 'onMouseDown'
>

/**
 * Own props for the {@link TextInput} component.
 *
 * @remarks
 * Extends {@link InputStyleProps} to provide shared input styling capabilities
 * (border, fontSize, gap, padding, flex, radius, width) alongside text-input-specific
 * properties.
 *
 * In addition to the props listed below, all standard HTML `<input>` attributes
 * (e.g. `type`, `value`, `defaultValue`, `placeholder`, `disabled`, `readOnly`,
 * `name`, `onChange`, `onBlur`, `onFocus`, `ref`, etc.) are forwarded to the
 * underlying element.
 *
 * @public
 */
export type TextInputOwnProps = InputStyleProps & {
  /**
   * When `true`, disables the focus ring visual indicator on the input element.
   *
   * @beta Do not use in production.
   */
  __unstable_disableFocusRing?: boolean

  /**
   * Controls the visibility and configuration of a clear button rendered inside
   * the input, on the trailing (right) side.
   *
   * @remarks
   * When set to `true`, renders a default clear button with a close icon.
   * When set to a {@link TextInputClearButtonProps} object, renders a clear button
   * with the specified custom props (e.g. custom `aria-label`). When `false` or
   * `undefined`, no clear button is rendered.
   *
   * The clear button is only rendered when the input is neither `disabled` nor
   * `readOnly`. When a clear button is displayed, the `iconRight` prop is ignored.
   *
   * Clicking the clear button invokes the {@link TextInputOwnProps.onClear | onClear}
   * callback and refocuses the input element.
   *
   */
  clearButton?: boolean | TextInputClearButtonProps

  /**
   * Sets a custom validation message on the input element.
   *
   * @remarks
   * When a non-empty string is provided, the input is marked as invalid via
   * the Constraint Validation API (`setCustomValidity`), and the `data-invalid`
   * attribute is applied to the wrapper element for styling purposes.
   *
   * Set to an empty string `""` or `undefined` to clear the validation error.
   */
  customValidity?: string

  /**
   * An icon to render on the leading (left) side of the input.
   *
   * @remarks
   * Accepts either a React component type (rendered as `<IconComponent />`) or
   * a React element (rendered as-is). The icon is positioned absolutely inside
   * the input presentation layer.
   */
  icon?: ElementType | ReactNode

  /**
   * An icon to render on the trailing (right) side of the input.
   *
   * @remarks
   * Accepts either a React component type (rendered as `<IconComponent />`) or
   * a React element (rendered as-is). The icon is positioned absolutely inside
   * the input presentation layer.
   *
   * Note: When `clearButton` is enabled, the `iconRight` is not rendered to
   * avoid overlap with the clear button.
   */
  iconRight?: ElementType | ReactNode

  /**
   * Callback fired when the clear button is clicked.
   *
   * @remarks
   * Only invoked when the `clearButton` prop is enabled. After the callback
   * fires, the input element is refocused. Use this callback to clear the
   * controlled input value in the parent component.
   *
   */
  onClear?: () => void

  /**
   * Content rendered before (to the left of) the input element, outside the
   * input's border.
   *
   * @remarks
   * The prefix is rendered in a separate container adjacent to the input.
   * Typically used for labels, icons, or short text that should appear
   * visually attached to the input.
   */
  prefix?: ReactNode

  /**
   * Content rendered after (to the right of) the input element, outside the
   * input's border.
   *
   * @remarks
   * The suffix is rendered in a separate container adjacent to the input.
   * Typically used for units, labels, or action buttons that should appear
   * visually attached to the input.
   */
  suffix?: ReactNode

  /**
   * Sets the font weight of the input text.
   */
  weight?: FontWeight
}

/**
 * Accepted values for the `as` prop of the {@link TextInput} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `TextInput`.
 *
 * @public
 */
export type TextInputElementType = 'input' | ComponentType

/**
 * Props for the {@link TextInput} component.
 *
 * @remarks
 * Combines {@link TextInputOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders an `<input>` element by default.
 *
 * Standard HTML `<input>` attributes supported include:
 * - `type` (`string`) – The input type (e.g. `"text"`, `"email"`, `"password"`, `"number"`, `"search"`, `"url"`, `"tel"`). Default: `"text"`.
 * - `value` (`string`) – The controlled value of the input.
 * - `defaultValue` (`string`) – The initial value for uncontrolled usage.
 * - `placeholder` (`string`) – Placeholder text shown when the input is empty.
 * - `disabled` (`boolean`) – When `true`, disables the input and prevents interaction. Default: `false`.
 * - `readOnly` (`boolean`) – When `true`, prevents user changes while keeping the input focusable.
 * - `name` (`string`) – The form field name for the input.
 * - `onChange` (`ChangeEventHandler<HTMLInputElement>`) – Callback fired when the value changes.
 * - `onBlur` (`FocusEventHandler<HTMLInputElement>`) – Callback fired when the input loses focus.
 * - `onFocus` (`FocusEventHandler<HTMLInputElement>`) – Callback fired when the input gains focus.
 * - `ref` (`Ref<HTMLInputElement>`) – A ref forwarded to the underlying `<input>` element.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TextInputElementType}.
 *
 * @public
 */
export type TextInputProps<E extends TextInputElementType = TextInputElementType> = Props<
  TextInputOwnProps,
  E
>

/**
 * A single-line text input component with support for icons, prefix/suffix
 * elements, a clear button, and custom validation.
 *
 * @remarks
 * The `TextInput` component renders an `<input>` element by default, wrapped
 * in a presentational container that provides themed styling, optional border,
 * and support for leading/trailing icons, prefix/suffix content, and a clear
 * button.
 *
 * When `readOnly` is `true`, the input is visually enabled but functionally
 * disabled. A `data-read-only` attribute is applied for styling differentiation.
 *
 * When `customValidity` is set to a non-empty string, the input is marked as
 * invalid via the Constraint Validation API and the `data-invalid` attribute
 * is applied to the wrapper element.
 *
 * @public
 */
export function TextInput<E extends TextInputElementType = typeof DEFAULT_TEXT_INPUT_ELEMENT>(
  props: TextInputProps<E>,
): React.JSX.Element {
  const {
    __unstable_disableFocusRing,
    as: Element = DEFAULT_TEXT_INPUT_ELEMENT,
    border = true,
    className,
    clearButton,
    disabled = false,
    flex,
    fontSize = 2,
    gap = 3,
    icon: IconComponent,
    iconRight: IconRightComponent,
    onClear,
    padding = 3,
    prefix,
    radius = 2,
    readOnly,
    ref: forwardedRef,
    suffix,
    customValidity,
    type = 'text',
    weight: _width,
    width,
    ...rest
  } = props as TextInputProps<typeof DEFAULT_TEXT_INPUT_ELEMENT>

  const ref = useRef<HTMLInputElement | null>(null)

  const responsivePadding = useMemo(() => _getResponsiveProp(padding), [padding])

  const withClearButton = Boolean(clearButton)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  // Prevent the clear button from taking the focus away from the input
  const handleClearMouseDown = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleClearClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()

      if (onClear) onClear()

      // Focus the input, in case focus has been lost when clicking the clear button
      ref.current?.focus()
    },
    [onClear, ref],
  )

  return (
    <span
      className={textInput({
        className,
        border,
        flex,
        fontSize,
        padding,
        radius,
        gap,
        width,
      })}
      data-icon-left={IconComponent ? '' : undefined}
      data-icon-right={IconRightComponent ? '' : undefined}
      data-invalid={customValidity ? '' : undefined}
      data-prefix={prefix ? '' : undefined}
      data-read-only={!disabled && readOnly ? '' : undefined}
      data-suffix={suffix ? '' : undefined}
      data-ui="TextInput"
    >
      {prefix && (
        <span className={textInputPrefix()}>
          <span>{prefix}</span>
        </span>
      )}

      <span className={textInputElement()}>
        <Element
          {...rest}
          className={_inputElement()}
          data-no-focus-ring={__unstable_disableFocusRing ? '' : undefined}
          disabled={disabled}
          readOnly={readOnly}
          ref={ref}
          type={type}
        />

        <span className={_inputPresentation()}>
          {IconComponent && (
            <Box as="span" padding={padding} position="absolute" insetTop={0} insetLeft={0}>
              <Text as="span" size={fontSize}>
                {isValidElement(IconComponent) && IconComponent}
                {isValidElementType(IconComponent) && <IconComponent />}
              </Text>
            </Box>
          )}

          {!withClearButton && IconRightComponent && (
            <Box as="span" padding={padding} position="absolute" insetTop={0} insetRight={0}>
              <Text as="span" size={fontSize}>
                {isValidElement(IconRightComponent) && IconRightComponent}
                {isValidElementType(IconRightComponent) && <IconRightComponent />}
              </Text>
            </Box>
          )}
        </span>

        {!disabled && !readOnly && clearButton && (
          <ClearButton
            fontSize={fontSize}
            radius={radius}
            clearButtonProps={isRecord(clearButton) ? clearButton : EMPTY_RECORD}
            handleClearClick={handleClearClick}
            handleClearMouseDown={handleClearMouseDown}
            padding={responsivePadding}
          />
        )}
      </span>

      {suffix && (
        <span className={textInputSuffix()}>
          <span>{suffix}</span>
        </span>
      )}
    </span>
  )
}

function ClearButton({
  fontSize,
  radius,
  clearButtonProps,
  handleClearClick,
  handleClearMouseDown,
  padding,
}: {
  clearButtonProps: TextInputClearButtonProps
  handleClearClick: (event: MouseEvent<HTMLButtonElement>) => void
  handleClearMouseDown: (event: MouseEvent<HTMLButtonElement>) => void
  padding: ResponsiveProp<Space>
} & Pick<TextInputOwnProps, 'fontSize' | 'radius'>) {
  const clearButtonBoxPadding = useMemo(() => {
    return Object.fromEntries(
      Object.entries(padding).map(([key, value]) => {
        if (value === 0) return [key, 0]
        if (value === 1) return [key, 1]
        if (value === 2) return [key, 1]

        return [key, typeof value === 'number' ? value - 2 : 0]
      }),
    ) as ResponsiveProp<Space>
  }, [padding])

  const clearButtonPadding = useMemo(() => {
    return Object.fromEntries(
      Object.entries(padding).map(([key, value]) => {
        if (value === 0) return [key, 0]
        if (value === 1) return [key, 0]
        if (value === 2) return [key, 1]

        return [key, typeof value === 'number' ? value - 1 : 0]
      }),
    ) as ResponsiveProp<Space>
  }, [padding])

  return (
    <Box
      as="span"
      insetTop={0}
      insetRight={0}
      padding={clearButtonBoxPadding}
      position="absolute"
      style={{zIndex: 2}}
    >
      <Button
        aria-label="Clear"
        data-qa="clear-button"
        display="block"
        fontSize={fontSize}
        icon={CloseIcon}
        mode="bleed"
        padding={clearButtonPadding}
        radius={radius}
        {...clearButtonProps}
        onClick={handleClearClick}
        onMouseDown={handleClearMouseDown}
      />
    </Box>
  )
}
