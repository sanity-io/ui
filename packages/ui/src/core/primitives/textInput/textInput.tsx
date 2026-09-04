import {CloseIcon} from '@sanity/icons/Close'
import {clsx} from 'clsx/lite'
import {isValidElement, useCallback, useImperativeHandle, useMemo, useRef} from 'react'
import {isValidElementType} from 'react-is'
import {styled} from 'styled-components'

import {ThemeFontWeightKey} from '../../../theme/system/font'
import {EMPTY_RECORD} from '../../constants'
import {useCustomValidity} from '../../hooks/useCustomValidity'
import {_getArrayProp} from '../../styles/helpers'
import {
  responsiveInputPaddingStyle,
  TextInputResponsivePaddingStyleProps,
} from '../../styles/input/responsiveInputPaddingStyle'
import {
  textInputBaseStyle,
  textInputFontSizeStyle,
  TextInputInputStyleProps,
  textInputRepresentationStyle,
  TextInputRepresentationStyleProps,
} from '../../styles/input/textInputStyle'
import {responsiveRadiusStyle} from '../../styles/radius/radiusStyle'
import {ResponsiveRadiusStyleProps} from '../../styles/radius/types'
import {useRootTheme} from '../../theme/useRootTheme'
import {Radius} from '../../types/radius'
import {Box} from '../box/box'
import {Button, ButtonOwnProps} from '../button/button'
import {Card} from '../card/card'
import {Text} from '../text/text'

import {inputRoot, textInputRoot} from '../../styles/input/textInput.css'
import {textInputClearButton, textInputLeftBox, textInputRightBox} from './textInput.css'

/**
 * @public
 */
export type TextInputClearButtonProps = ButtonOwnProps &
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
  // oxlint-disable-next-line no-redundant-type-constituents
  icon?: React.ElementType | React.ReactNode
  // oxlint-disable-next-line no-redundant-type-constituents
  iconRight?: React.ElementType | React.ReactNode
  /**
   * @beta
   */
  onClear?: () => void
  padding?: number | number[]
  prefix?: React.ReactNode
  radius?: Radius | Radius[]
  /**
   * @deprecated Use `gap` instead.
   */
  space?: never
  gap?: number | number[]
  suffix?: React.ReactNode
  type?: TextInputType
  weight?: ThemeFontWeightKey
}

const CLEAR_BUTTON_BOX_STYLE: React.CSSProperties = {zIndex: 2}

// Prefix and Suffix stay on styled-components: their corner radius overrides
// have to beat Card's runtime `border-radius` shorthand at the same
// specificity, which only holds while both rules live in the runtime stylesheet.
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

// Stays on styled-components: `background-color: transparent` has to beat
// Card's runtime `background-color: var(--card-bg-color)` at the same specificity.
const RightCard = styled(Card)`
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
`

/**
 * Single line text input.
 *
 * @public
 */
export function TextInput(
  props: TextInputProps & Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'prefix' | 'type'>,
) {
  const {
    __unstable_disableFocusRing,
    border = true,
    clearButton,
    disabled = false,
    fontSize: fontSizeProp = 2,
    gap = 3,
    icon: IconComponent,
    iconRight: IconRightComponent,
    onClear,
    padding: paddingProp = 3,
    prefix,
    radius: radiusProp = 2,
    readOnly,
    ref: forwardedRef,
    suffix,
    customValidity,
    type = 'text',
    weight,
    ...restProps
  } = props
  const ref = useRef<HTMLInputElement | null>(null)

  const rootTheme = useRootTheme()

  const fontSize = _getArrayProp(fontSizeProp)
  const padding = _getArrayProp(paddingProp)
  const radius = _getArrayProp(radiusProp)
  const space = _getArrayProp(gap)

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
          <Box className={textInputLeftBox} padding={padding}>
            <Text size={fontSize}>
              {isValidElement(IconComponent) && IconComponent}
              {isValidElementType(IconComponent) && <IconComponent />}
            </Text>
          </Box>
        )}

        {!$hasClearButton && IconRightComponent && (
          <Box className={textInputRightBox} padding={padding}>
            <Text size={fontSize}>
              {isValidElement(IconRightComponent) && IconRightComponent}
              {isValidElementType(IconRightComponent) && <IconRightComponent />}
            </Text>
          </Box>
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
          <Button
            aria-label="Clear"
            data-qa="clear-button"
            fontSize={fontSize}
            icon={CloseIcon}
            mode="bleed"
            padding={clearButtonPadding}
            radius={radius}
            {...clearButtonProps}
            className={clsx(textInputClearButton, clearButtonProps.className)}
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
    <Card
      as="span"
      className={textInputRoot}
      data-ui="TextInput"
      display="flex"
      tone={rootTheme.tone}
    >
      {prefixNode}

      <span className={inputRoot}>
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
      </span>

      {suffixNode}
    </Card>
  )
}
