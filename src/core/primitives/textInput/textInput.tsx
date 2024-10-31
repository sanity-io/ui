import {CloseIcon} from '@sanity/icons'
import {
  _inputElement,
  _inputPresentation,
  composeClassNames,
  InputStyleProps,
  ResponsiveProp,
  textInput,
} from '@sanity/ui/css'
import {Space, ThemeFontWeightKey} from '@sanity/ui/theme'
import {
  CSSProperties,
  ElementType,
  ForwardedRef,
  forwardRef,
  isValidElement,
  MouseEvent,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import {isValidElementType} from 'react-is'

import {EMPTY_RECORD} from '../../constants'
import {useArrayProp, useCustomValidity} from '../../hooks'
import {isRecord} from '../../lib/isRecord'
import {Props} from '../../types'
import {Box} from '../box'
import {Button, ButtonProps} from '../button'
import {Text} from '../text'

/**
 * @public
 */
export type TextInputClearButtonProps = Omit<
  Props<ButtonProps, 'button'>,
  'as' | 'onClick' | 'onMouseDown'
>

/**
 * @public
 */
export type TextInputType =
  | 'search'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'url'
  | 'month'
  | 'number'
  | 'password'
  | 'tel'
  | 'time'
  | 'text'
  | 'week'
  | 'color'

/**
 * @public
 */
export interface TextInputProps extends InputStyleProps {
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
  type?: TextInputType
  weight?: ThemeFontWeightKey
}

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
export const TextInput = forwardRef(function TextInput(
  props: Props<TextInputProps, 'input'>,
  forwardedRef: ForwardedRef<HTMLInputElement>,
) {
  const {
    __unstable_disableFocusRing,
    border = true,
    className,
    clearButton,
    disabled = false,
    fontSize = 1,
    gap,
    icon: IconComponent,
    iconRight: IconRightComponent,
    onClear,
    padding = 3,
    prefix,
    radius = 2,
    readOnly,
    space = 3,
    suffix,
    customValidity,
    type = 'text',
    weight: _width, // eslint-disable-line @typescript-eslint/no-unused-vars
    width,
    ...restProps
  } = props
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
      as="span"
      className={composeClassNames(
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
      data-prefix={prefix ? '' : undefined}
      data-suffix={suffix ? '' : undefined}
      data-ui="TextInput"
      display="flex"
    >
      {prefix && (
        <Box as="span" className="text-input-prefix" sizing="border">
          <span>{prefix}</span>
        </Box>
      )}

      <Box as="span" flex={1} position="relative">
        <input
          // data-as="input"
          {...restProps}
          className={_inputElement()}
          disabled={disabled}
          readOnly={readOnly}
          ref={ref}
          type={type}
        />

        <Box
          as="span"
          // $unstableDisableFocusRing={__unstable_disableFocusRing}
          className={_inputPresentation()}
          data-disable-focus-ring={__unstable_disableFocusRing ? '' : undefined}
          position="absolute"
        >
          {IconComponent && (
            <Box as="span" padding={padding} position="absolute" style={{top: 0, left: 0}}>
              <Text size={fontSize}>
                {isValidElement(IconComponent) && IconComponent}
                {isValidElementType(IconComponent) && <IconComponent />}
              </Text>
            </Box>
          )}

          {!withClearButton && IconRightComponent && (
            <Box as="span" padding={padding} position="absolute" style={{top: 0, right: 0}}>
              <Text size={fontSize}>
                {isValidElement(IconRightComponent) && IconRightComponent}
                {isValidElementType(IconRightComponent) && <IconRightComponent />}
              </Text>
            </Box>
          )}
        </Box>

        {!disabled && !readOnly && clearButton && (
          <Box
            as="span"
            padding={clearButtonBoxPadding}
            position="absolute"
            style={CLEAR_BUTTON_BOX_STYLE}
            // tone={customValidity ? 'critical' : 'inherit'}
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
        )}
      </Box>

      {suffix && (
        <Box as="span" className="text-input-suffix" sizing="border">
          <span>{suffix}</span>
        </Box>
      )}
    </Box>
  )
})

TextInput.displayName = 'ForwardRef(TextInput)'
