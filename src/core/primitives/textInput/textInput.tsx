import {CloseIcon} from '@sanity/icons'
import {
  _composeClassNames,
  _inputElement,
  _inputPresentation,
  type InputStyleProps,
  type ResponsiveProp,
  textInput,
  textInputElement,
  textInputPrefix,
  textInputSuffix,
} from '@sanity/ui/css'
import type {Space, ThemeFontWeightKey} from '@sanity/ui/theme'
import {
  type CSSProperties,
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
import {useArrayProp, useCustomValidity} from '../../hooks'
import {isRecord} from '../../lib/isRecord'
import type {ComponentType, Props} from '../../types'
import {Box} from '../box'
import {Button, type ButtonProps} from '../button'
import {Text} from '../text'

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
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
  suffix?: ReactNode
  weight?: ThemeFontWeightKey
}

/** @public */
export type TextInputElementType = 'input' | ComponentType

/** @public */
export type TextInputProps<E extends TextInputElementType = TextInputElementType> = Props<
  TextInputOwnProps,
  E
>

const CLEAR_BUTTON_BOX_STYLE: CSSProperties = {
  backgroundColor: 'transparent',
  top: 0,
  right: 0,
  zIndex: 2,
}

/**
 * Single line text input.
 *
 * @public
 */
export function TextInput<E extends TextInputElementType = typeof DEFAULT_TEXT_INPUT_ELEMENT>(
  props: TextInputProps<E>,
) {
  const {
    __unstable_disableFocusRing,
    as: Element = DEFAULT_TEXT_INPUT_ELEMENT,
    border = true,
    className,
    clearButton,
    disabled = false,
    fontSize = 2,
    gap,
    icon: IconComponent,
    iconRight: IconRightComponent,
    onClear,
    padding = 3,
    prefix,
    radius = 2,
    readOnly,
    ref: forwardedRef,
    space = 3,
    suffix,
    customValidity,
    type = 'text',
    weight: _width, // eslint-disable-line @typescript-eslint/no-unused-vars
    width,
    ...rest
  } = props as TextInputProps<typeof DEFAULT_TEXT_INPUT_ELEMENT>

  const ref = useRef<HTMLInputElement | null>(null)

  const paddingArray = useArrayProp(padding)

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

  const clearButtonBoxPadding = useMemo(
    () =>
      paddingArray.map((v) => {
        if (v === 0) return 0
        if (v === 1) return 1
        if (v === 2) return 1

        return typeof v === 'number' ? v - 2 : 0
      }) as Space[],
    [paddingArray],
  )

  const clearButtonPadding = useMemo(
    () =>
      paddingArray.map((v) => {
        if (v === 0) return 0
        if (v === 1) return 0
        if (v === 2) return 1

        return typeof v === 'number' ? v - 1 : 0
      }) as Space[],
    [paddingArray],
  )

  const clearButtonProps: TextInputClearButtonProps = useMemo(
    () => (isRecord(clearButton) ? clearButton : EMPTY_RECORD),
    [clearButton],
  )

  return (
    <Box
      align="center"
      className={_composeClassNames(
        className,
        textInput({
          border,
          fontSize,
          padding,
          radius,
          gap: gap ?? space,
          width,
        }),
      )}
      data-icon-left={IconComponent ? '' : undefined}
      data-icon-right={IconRightComponent ? '' : undefined}
      data-invalid={customValidity ? '' : undefined}
      data-prefix={prefix ? '' : undefined}
      data-read-only={!disabled && readOnly ? '' : undefined}
      data-suffix={suffix ? '' : undefined}
      data-ui="TextInput"
      display="flex"
    >
      {prefix && (
        <Box className={textInputPrefix()} sizing="border">
          <span>{prefix}</span>
        </Box>
      )}

      <Box className={textInputElement()} flex={1} position="relative">
        <Element
          {...rest}
          className={_inputElement()}
          data-no-focus-ring={__unstable_disableFocusRing ? '' : undefined}
          disabled={disabled}
          readOnly={readOnly}
          ref={ref}
          type={type}
        />

        <Box className={_inputPresentation()} position="absolute">
          {IconComponent && (
            <Box padding={padding} position="absolute" style={{top: 0, left: 0}}>
              <Text size={fontSize}>
                {isValidElement(IconComponent) && IconComponent}
                {isValidElementType(IconComponent) && <IconComponent />}
              </Text>
            </Box>
          )}

          {!withClearButton && IconRightComponent && (
            <Box padding={padding} position="absolute" style={{top: 0, right: 0}}>
              <Text size={fontSize}>
                {isValidElement(IconRightComponent) && IconRightComponent}
                {isValidElementType(IconRightComponent) && <IconRightComponent />}
              </Text>
            </Box>
          )}
        </Box>

        {!disabled && !readOnly && clearButton && (
          <Box padding={clearButtonBoxPadding} position="absolute" style={CLEAR_BUTTON_BOX_STYLE}>
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
        )}
      </Box>

      {suffix && (
        <Box className={textInputSuffix()} sizing="border">
          <span>{suffix}</span>
        </Box>
      )}
    </Box>
  )
}

TextInput.displayName = 'TextInput'
