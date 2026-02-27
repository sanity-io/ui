import {CloseIcon} from '@sanity/icons'
import {
  _getResponsiveProp,
  type ComponentType,
  EMPTY_RECORD,
  isRecord,
  type Props,
} from '@sanity/ui/core'
import {
  _input_element,
  _input_presentation,
  type InputStyleProps,
  type ResponsiveProp,
  textInput,
  textInput_element,
  textInput_prefix,
  textInput_suffix,
} from '@sanity/ui/css'
import {useCustomValidity} from '@sanity/ui/hooks'
import {Box} from '@sanity/ui/primitives/box'
import {Button, type ButtonProps} from '@sanity/ui/primitives/button'
import {Text} from '@sanity/ui/primitives/text'
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

/**
 * The default HTML element type rendered by the {@link TextInput} component.
 *
 * @public
 */
export const DEFAULT_TEXT_INPUT_ELEMENT = 'input'

/**
 * Props for the clear button rendered inside the {@link TextInput} component.
 *
 * @remarks
 * Accepts all {@link ButtonProps} except `as`, `onClick`, and `onMouseDown`,
 * which are managed internally by the text input.
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
 * Extends {@link InputStyleProps} to provide visual styling props such as
 * `border`, `fontSize`, `padding`, `radius`, and `width`.
 *
 * @public
 */
export type TextInputOwnProps = InputStyleProps & {
  /**
   * When `true`, disables the focus ring on the input element.
   *
   * @beta Do not use in production.
   */
  __unstable_disableFocusRing?: boolean

  /**
   * Enables a clear button inside the input. When `true`, renders a default
   * clear button. When an object is provided, it is spread as props onto the
   * clear {@link Button}.
   *
   * @beta
   */
  clearButton?: boolean | TextInputClearButtonProps

  /**
   * Sets a custom validation message on the underlying input element.
   *
   * @remarks
   * When set to a non-empty string, the input is marked as invalid
   * and the provided message is used as the validation message.
   */
  customValidity?: string

  /**
   * An icon to render on the leading (left) side of the input.
   *
   * @remarks
   * Accepts either a React component type (rendered as `<IconComponent />`) or
   * a React element (rendered as-is).
   */
  icon?: ElementType | ReactNode

  /**
   * An icon to render on the trailing (right) side of the input.
   *
   * @remarks
   * Accepts either a React component type (rendered as `<IconComponent />`) or
   * a React element (rendered as-is). Hidden when `clearButton` is enabled.
   */
  iconRight?: ElementType | ReactNode

  /**
   * A callback that fires when the clear button is clicked.
   *
   * @beta
   */
  onClear?: () => void

  /**
   * Content to render before the input element, outside the input's
   * styled boundary.
   */
  prefix?: ReactNode

  /**
   * Content to render after the input element, outside the input's
   * styled boundary.
   */
  suffix?: ReactNode

  /**
   * @deprecated Use `fontWeight` instead.
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
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TextInputElementType}.
 *
 * @public
 */
export type TextInputProps<E extends TextInputElementType = TextInputElementType> = Props<
  TextInputOwnProps,
  E
>

/**
 * A single-line text input component with support for leading/trailing icons,
 * prefix/suffix content, a clear button, and custom validation.
 *
 * @remarks
 * Renders an `<input>` element by default, wrapped in a styled container.
 * The component supports `disabled`, `readOnly`, custom validity states,
 * and all standard HTML input attributes.
 *
 * @public
 */
export function TextInput<E extends TextInputElementType = typeof DEFAULT_TEXT_INPUT_ELEMENT>(
  props: TextInputProps<E>,
): React.JSX.Element {
  const {
    __unstable_disableFocusRing,
    as: Element = DEFAULT_TEXT_INPUT_ELEMENT,
    border,
    className,
    clearButton,
    disabled = false,
    flex,
    fontSize = 2,
    fontWeight: _fontWeight,
    gap = 3,
    icon: IconComponent,
    iconRight: IconRightComponent,
    onClear,
    padding = 3,
    prefix,
    radius,
    readOnly,
    ref: forwardedRef,
    suffix,
    customValidity,
    type = 'text',
    weight: _weight,
    width,
    ...rest
  } = props as TextInputProps<typeof DEFAULT_TEXT_INPUT_ELEMENT>

  const fontWeight = _fontWeight ?? _weight

  const ref = useRef<HTMLInputElement | null>(null)

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
        fontWeight,
        padding,
        radius,
        gap,
        width,
      })}
      data-icon-left={IconComponent ? '' : undefined}
      data-icon-right={IconRightComponent ? '' : undefined}
      data-prefix={prefix ? '' : undefined}
      data-suffix={suffix ? '' : undefined}
      data-ui="TextInput"
    >
      {prefix && (
        <span className={textInput_prefix()}>
          <span>{prefix}</span>
        </span>
      )}

      <span className={textInput_element()}>
        <Element
          {...rest}
          ref={ref}
          className={_input_element()}
          data-invalid={customValidity ? '' : undefined}
          data-no-focus-ring={__unstable_disableFocusRing ? '' : undefined}
          data-read-only={!disabled && readOnly ? '' : undefined}
          disabled={disabled}
          readOnly={readOnly}
          type={type}
        />

        <span className={_input_presentation()}>
          {IconComponent && (
            <Box as="span" insetLeft={0} insetTop={0} padding={padding} position="absolute">
              <Text as="span" size={fontSize}>
                {isValidElement(IconComponent) && IconComponent}
                {isValidElementType(IconComponent) && <IconComponent />}
              </Text>
            </Box>
          )}

          {!withClearButton && IconRightComponent && (
            <Box as="span" insetRight={0} insetTop={0} padding={padding} position="absolute">
              <Text as="span" size={fontSize}>
                {isValidElement(IconRightComponent) && IconRightComponent}
                {isValidElementType(IconRightComponent) && <IconRightComponent />}
              </Text>
            </Box>
          )}
        </span>

        {!disabled && !readOnly && clearButton && (
          <ClearButton
            clearButtonProps={isRecord(clearButton) ? clearButton : EMPTY_RECORD}
            fontSize={fontSize}
            handleClearClick={handleClearClick}
            handleClearMouseDown={handleClearMouseDown}
            padding={padding}
            radius={radius}
          />
        )}
      </span>

      {suffix && (
        <span className={textInput_suffix()}>
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
  padding: paddingProp,
}: {
  clearButtonProps: TextInputClearButtonProps
  handleClearClick: (event: MouseEvent<HTMLButtonElement>) => void
  handleClearMouseDown: (event: MouseEvent<HTMLButtonElement>) => void
  padding: ResponsiveProp<Space>
} & Pick<TextInputOwnProps, 'fontSize' | 'radius'>) {
  const padding = _getResponsiveProp(paddingProp)

  const boxPadding = useMemo(() => {
    return padding.map((p) => {
      if (p === 0) return 0
      if (p === 1) return 1
      if (p === 2) return 1
      if (p === 3) return 1

      return typeof p === 'number' ? p - 2 : 0
    }) as ResponsiveProp<Space>
  }, [padding])

  const buttonPadding = useMemo(() => {
    return padding.map((p) => {
      if (p === 0) return 0
      if (p === 1) return 0
      if (p === 2) return 1
      if (p === 3) return 2

      return typeof p === 'number' ? p - 1 : 0
    }) as ResponsiveProp<Space>
  }, [padding])

  return (
    <Box
      as="span"
      insetRight={0}
      insetTop={0}
      padding={boxPadding}
      position="absolute"
      style={{zIndex: 2}}
    >
      <Button
        aria-label="Clear"
        data-qa="clear-button"
        fontSize={fontSize}
        icon={CloseIcon}
        mode="bleed"
        padding={buttonPadding}
        radius={radius}
        {...clearButtonProps}
        onClick={handleClearClick}
        onMouseDown={handleClearMouseDown}
      />
    </Box>
  )
}
