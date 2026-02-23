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

/** @public */
export const DEFAULT_TEXT_INPUT_ELEMENT = 'input'

/** @public */
export type TextInputClearButtonProps = Omit<
  ButtonProps<'button'>,
  'as' | 'onClick' | 'onMouseDown'
>

/** @public */
export type TextInputOwnProps = InputStyleProps & {
  /**
   * @beta
   */
  __unstable_disableFocusRing?: boolean
  /**
   * @beta
   */
  clearButton?: boolean | TextInputClearButtonProps
  customValidity?: string
  icon?: ElementType | ReactNode
  iconRight?: ElementType | ReactNode
  /**
   * @beta
   */
  onClear?: () => void
  prefix?: ReactNode
  suffix?: ReactNode
  /**
   * @deprecated Use `fontWeight` instead
   */
  weight?: FontWeight
}

/** @public */
export type TextInputElementType = 'input' | ComponentType

/** @public */
export type TextInputProps<E extends TextInputElementType = TextInputElementType> = Props<
  TextInputOwnProps,
  E
>

/**
 * Single line text input.
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
            padding={responsivePadding}
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

  const clearButtonBoxPadding = useMemo(() => {
    return padding.map((p) => {
      if (p === 0) return 0
      if (p === 1) return 1
      if (p === 2) return 1

      return typeof p === 'number' ? p - 2 : 0
    }) as ResponsiveProp<Space>
  }, [padding])

  const clearButtonPadding = useMemo(() => {
    return padding.map((p) => {
      if (p === 0) return 0
      if (p === 1) return 0
      if (p === 2) return 1

      return typeof p === 'number' ? p - 1 : 0
    }) as ResponsiveProp<Space>
  }, [padding])

  return (
    <Box
      as="span"
      insetRight={0}
      insetTop={0}
      padding={clearButtonBoxPadding}
      position="absolute"
      style={{zIndex: 2}}
    >
      <Button
        aria-label="Clear"
        data-qa="clear-button"
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
