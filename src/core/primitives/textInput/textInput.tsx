import {CloseIcon} from '@sanity/icons'
import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef, isValidElement, useCallback, useImperativeHandle, useMemo, useRef} from 'react'
import {isValidElementType} from 'react-is'
import {styled} from 'styled-components'

import {EMPTY_RECORD} from '../../constants'
import {useArrayProp, useCustomValidity} from '../../hooks'
import {
  responsiveInputPaddingStyle,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
  textInputBaseStyle,
  textInputFontSizeStyle,
  TextInputInputStyleProps,
  textInputRepresentationStyle,
  TextInputRepresentationStyleProps,
  TextInputResponsivePaddingStyleProps,
  textInputRootStyle,
} from '../../styles/internal'
import {useRootTheme} from '../../theme'
import {Radius} from '../../types'
import {Box} from '../box'
import {Button, ButtonProps} from '../button'
import {Card} from '../card'
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
export interface TextInputProps {
  /**
   * @beta
   */
  __unstable_disableFocusRing?: boolean
  border?: boolean
  /**
   * @beta
   */
  clearButton?: boolean | TextInputClearButtonProps
  customValidity?: string
  fontSize?: number | number[]
  icon?: React.ElementType | React.ReactNode
  iconRight?: React.ElementType | React.ReactNode
  /**
   * @beta
   */
  onClear?: () => void
  padding?: number | number[]
  prefix?: React.ReactNode
  radius?: Radius | Radius[]
  space?: number | number[]
  suffix?: React.ReactNode
  type?: TextInputType
  weight?: ThemeFontWeightKey
}

const CLEAR_BUTTON_BOX_STYLE: React.CSSProperties = {zIndex: 2}

const StyledTextInput = styled(Card).attrs({forwardedAs: 'span'})(textInputRootStyle)

const InputRoot = styled.span`
  flex: 1;
  min-width: 0;
  display: block;
  position: relative;
`

const Prefix = styled(Card).attrs({forwardedAs: 'span'})`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  & > span {
    display: block;
    margin: -1px;
  }
`

const Suffix = styled(Card).attrs({forwardedAs: 'span'})`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  & > span {
    display: block;
    margin: -1px;
  }
`

const Input = styled.input<TextInputResponsivePaddingStyleProps & TextInputInputStyleProps>(
  responsiveInputPaddingStyle,
  textInputBaseStyle,
  textInputFontSizeStyle,
)

const Presentation = styled.span<ResponsiveRadiusStyleProps & TextInputRepresentationStyleProps>(
  responsiveRadiusStyle,
  textInputRepresentationStyle,
)

const LeftBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
`

const RightBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
`

const RightCard = styled(Card)`
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
`

const TextInputClearButton = styled(Button)({
  '&:not([hidden])': {
    display: 'block',
  },
})

/**
 * Single line text input.
 *
 * @public
 */
export const TextInput = forwardRef(function TextInput(
  props: TextInputProps & Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'prefix' | 'type'>,
  forwardedRef: React.Ref<HTMLInputElement>,
) {
  const {
    __unstable_disableFocusRing,
    border = true,
    clearButton,
    disabled = false,
    fontSize: fontSizeProp = 2,
    icon: IconComponent,
    iconRight: IconRightComponent,
    onClear,
    padding: paddingProp = 3,
    prefix,
    radius: radiusProp = 2,
    readOnly,
    space: spaceProp = 3,
    suffix,
    customValidity,
    type = 'text',
    weight,
    ...restProps
  } = props
  const ref = useRef<HTMLInputElement | null>(null)

  const rootTheme = useRootTheme()

  const fontSize = useArrayProp(fontSizeProp)
  const padding = useArrayProp(paddingProp)
  const radius = useArrayProp(radiusProp)
  const space = useArrayProp(spaceProp)

  // Transient properties
  const $hasClearButton = Boolean(clearButton)
  const $hasIcon = Boolean(IconComponent)
  const $hasIconRight = Boolean(IconRightComponent)
  const $hasSuffix = Boolean(suffix)
  const $hasPrefix = Boolean(prefix)

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
        <Prefix borderTop borderLeft borderBottom radius={radius} sizing="border" tone="inherit">
          <span>{prefix}</span>
        </Prefix>
      ),
    [prefix, radius],
  )

  // Render presentation (memoized)
  const presentationNode = useMemo(
    () => (
      <Presentation
        $hasPrefix={$hasPrefix}
        $unstableDisableFocusRing={__unstable_disableFocusRing}
        $hasSuffix={$hasSuffix}
        $radius={radius}
        $scheme={rootTheme.scheme}
        $tone={rootTheme.tone}
        data-border={border ? '' : undefined}
        data-scheme={rootTheme.scheme}
        data-tone={rootTheme.tone}
      >
        {IconComponent && (
          <LeftBox padding={padding}>
            <Text size={fontSize}>
              {isValidElement(IconComponent) && IconComponent}
              {isValidElementType(IconComponent) && <IconComponent />}
            </Text>
          </LeftBox>
        )}

        {!$hasClearButton && IconRightComponent && (
          <RightBox padding={padding}>
            <Text size={fontSize}>
              {isValidElement(IconRightComponent) && IconRightComponent}
              {isValidElementType(IconRightComponent) && <IconRightComponent />}
            </Text>
          </RightBox>
        )}
      </Presentation>
    ),
    [
      __unstable_disableFocusRing,
      border,
      fontSize,
      IconComponent,
      IconRightComponent,
      padding,
      radius,
      rootTheme,
      $hasClearButton,
      $hasPrefix,
      $hasSuffix,
    ],
  )

  // Render clear button (memoized)
  const clearButtonBoxPadding = useMemo(
    () =>
      padding.map((v) => {
        if (v === 0) return 0
        if (v === 1) return 1
        if (v === 2) return 1

        return v - 2
      }),
    [padding],
  )
  const clearButtonPadding = useMemo(
    () =>
      padding.map((v) => {
        if (v === 0) return 0
        if (v === 1) return 0
        if (v === 2) return 1

        return v - 1
      }),
    [padding],
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
        <RightCard
          forwardedAs="span"
          padding={clearButtonBoxPadding}
          style={CLEAR_BUTTON_BOX_STYLE}
          tone={customValidity ? 'critical' : 'inherit'}
        >
          <TextInputClearButton
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
        </RightCard>
      ),
    [
      clearButton,
      clearButtonBoxPadding,
      clearButtonPadding,
      clearButtonProps,
      customValidity,
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
        <Suffix borderTop borderRight borderBottom radius={radius} sizing="border" tone="inherit">
          <span>{suffix}</span>
        </Suffix>
      ),
    [radius, suffix],
  )

  return (
    <StyledTextInput data-ui="TextInput" tone={rootTheme.tone}>
      {prefixNode}

      <InputRoot>
        <Input
          data-as="input"
          data-scheme={rootTheme.scheme}
          data-tone={rootTheme.tone}
          {...restProps}
          $fontSize={fontSize}
          $iconLeft={$hasIcon}
          $iconRight={$hasIconRight || $hasClearButton}
          $padding={padding}
          $scheme={rootTheme.scheme}
          $space={space}
          $tone={rootTheme.tone}
          $weight={weight}
          disabled={disabled}
          readOnly={readOnly}
          ref={ref}
          type={type}
        />

        {presentationNode}
        {clearButtonNode}
      </InputRoot>

      {suffixNode}
    </StyledTextInput>
  )
})
TextInput.displayName = 'ForwardRef(TextInput)'
