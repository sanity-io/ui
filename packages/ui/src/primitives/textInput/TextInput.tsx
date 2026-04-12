import {CloseIcon} from '@sanity/icons'
import {
  _input_element,
  _input_presentation,
  type InputStyleProps,
  type ResponsiveProp,
  textInput,
  textInput_element,
  textInput_prefix,
  textInput_suffix,
} from '@sanity/ui-css'
import type {FontWeight, Space} from '@sanity/ui-tokens'
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

import {EMPTY_RECORD} from '../../core/constants'
import {_getResponsiveProp} from '../../core/helpers/props'
import {isRecord} from '../../core/lib/isRecord'
import type {ComponentType, Props} from '../../core/types'
import {useCustomValidity} from '../../hooks/useCustomValidity'
import {Box} from '../box/Box'
import {Button, type ButtonProps} from '../button/Button'
import {Text} from '../text/Text'

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

  const responsivePadding = _getResponsiveProp(padding)

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
        <span className={textInput_prefix()}>
          <span>{prefix}</span>
        </span>
      )}

      <span className={textInput_element()}>
        <Element
          {...rest}
          ref={ref}
          className={_input_element()}
          data-no-focus-ring={__unstable_disableFocusRing ? '' : undefined}
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
