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
import {forwardRef, isValidElement, useCallback, useImperativeHandle, useMemo, useRef} from 'react'
import {isValidElementType} from 'react-is'
import {EMPTY_RECORD} from '../../constants'
import {useArrayProp, useCustomValidity} from '../../hooks'
import {Box} from '../box'
import {Button, ButtonProps} from '../button'
import {Text} from '../text'

/**
 * @public
 */
export type TextInputClearButtonProps = Omit<ButtonProps, 'as'> &
  Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'onClick' | 'onMouseDown' | 'ref'>

/**
 * @public
 */
export type TextInputType =
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
  icon?: React.ElementType | React.ReactNode
  iconRight?: React.ElementType | React.ReactNode
  /**
   * @beta
   */
  onClear?: () => void
  prefix?: React.ReactNode
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
  suffix?: React.ReactNode
  type?: TextInputType
  weight?: ThemeFontWeightKey
}

const CLEAR_BUTTON_BOX_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  top: 0,
  right: 0,
  zIndex: 2,
}

// const TextInputClearButton = styled(Button)({
//   '&:not([hidden])': {
//     display: 'block',
//   },
// })

/**
 * Single line text input.
 *
 * @public
 */
export const TextInput = forwardRef(function TextInput(
  props: TextInputProps &
    Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'prefix' | 'type' | 'width'>,
  forwardedRef: React.Ref<HTMLInputElement>,
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
    space = 3, // eslint-disable-line @typescript-eslint/no-unused-vars
    suffix,
    customValidity,
    type = 'text',
    weight: _width, // eslint-disable-line @typescript-eslint/no-unused-vars
    width,
    ...restProps
  } = props
  const ref = useRef<HTMLInputElement | null>(null)

  // const rootTheme = useRootTheme()

  // const fontSize = useArrayProp(fontSizeProp)
  const paddingArray = useArrayProp(padding)
  // const radius = useArrayProp(radiusProp)
  // const space = useArrayProp(spaceProp)

  // Transient properties
  const $hasClearButton = Boolean(clearButton)
  // const $hasIcon = Boolean(IconComponent)
  // const $hasIconRight = Boolean(IconRightComponent)
  // const $hasSuffix = Boolean(suffix)
  // const $hasPrefix = Boolean(prefix)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  // Prevent the clear button from taking the focus away from the input
  const handleClearMouseDown = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleClearClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()

      if (onClear) onClear()

      // Focus the input, in case focus has been lost when clicking the clear button
      ref.current?.focus()
    },
    [onClear, ref],
  )

  // Render prefix (memoized)
  const prefixNode = useMemo(
    () =>
      prefix && (
        <Box
          as="span"
          // borderTop
          // borderLeft
          // borderBottom
          className="text-input-prefix"
          // radius={radius}
          sizing="border"
          // tone="inherit"
        >
          <span>{prefix}</span>
        </Box>
      ),
    [prefix],
  )

  // Render presentation (memoized)
  const presentationNode = useMemo(
    () => (
      <Box
        as="span"
        // $hasPrefix={$hasPrefix}
        // $unstableDisableFocusRing={__unstable_disableFocusRing}
        // $hasSuffix={$hasSuffix}
        // $radius={radius}
        // $scheme={rootTheme.scheme}
        // $tone={rootTheme.tone}
        // border={border}
        className={_inputPresentation()}
        // className="text-input-presentation"
        // data-border={border ? '' : undefined}
        data-disable-focus-ring={__unstable_disableFocusRing ? '' : undefined}
        // data-scheme={rootTheme.scheme}
        // data-tone={rootTheme.tone}
        position="absolute"
        // radius={radius}
      >
        {IconComponent && (
          <Box as="span" padding={padding} position="absolute" style={{top: 0, left: 0}}>
            <Text size={fontSize}>
              {isValidElement(IconComponent) && IconComponent}
              {isValidElementType(IconComponent) && <IconComponent />}
            </Text>
          </Box>
        )}

        {!$hasClearButton && IconRightComponent && (
          <Box as="span" padding={padding} position="absolute" style={{top: 0, right: 0}}>
            <Text size={fontSize}>
              {isValidElement(IconRightComponent) && IconRightComponent}
              {isValidElementType(IconRightComponent) && <IconRightComponent />}
            </Text>
          </Box>
        )}
      </Box>
    ),
    [
      __unstable_disableFocusRing,
      // border,
      fontSize,
      IconComponent,
      IconRightComponent,
      padding,
      // radius,
      // rootTheme,
      $hasClearButton,
      // $hasPrefix,
      // $hasSuffix,
    ],
  )

  // Render clear button (memoized)
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
    () => (typeof clearButton === 'object' ? clearButton : EMPTY_RECORD),
    [clearButton],
  )

  const clearButtonNode = useMemo(
    () =>
      !disabled &&
      !readOnly &&
      clearButton && (
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
      ),
    [
      clearButton,
      clearButtonBoxPadding,
      clearButtonPadding,
      clearButtonProps,
      // customValidity,
      disabled,
      fontSize,
      handleClearClick,
      handleClearMouseDown,
      radius,
      readOnly,
    ],
  )

  // Render suffix (memoized)
  const suffixNode = useMemo(
    () =>
      suffix && (
        <Box
          as="span"
          // borderTop
          // borderRight
          // borderBottom
          className="text-input-suffix"
          // radius={radius}
          sizing="border"
          // tone="inherit"
        >
          <span>{suffix}</span>
        </Box>
      ),
    [suffix],
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
      {prefixNode}

      <Box as="span" flex={1} position="relative">
        <input
          data-as="input"
          {...restProps}
          className={_inputElement()}
          disabled={disabled}
          readOnly={readOnly}
          ref={ref}
          type={type}
        />

        {presentationNode}
        {clearButtonNode}
      </Box>

      {suffixNode}
    </Box>
  )
})

TextInput.displayName = 'ForwardRef(TextInput)'
