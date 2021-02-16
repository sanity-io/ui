import {CloseIcon} from '@sanity/icons'
import React, {createElement, forwardRef, isValidElement, useCallback, useMemo} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {EMPTY_RECORD} from '../../constants'
import {useForwardedRef, useCustomValidity, useResponsiveProp} from '../../hooks'
import {
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
  responsiveInputPaddingStyle,
  textInputStyle,
  TextInputInputStyleProps,
  TextInputRepresentationStyleProps,
  TextInputResponsivePaddingStyleProps,
} from '../../styles/internal'
import {ThemeFontWeightKey} from '../../theme'
import {Box} from '../box'
import {Button, ButtonProps} from '../button'
import {Card} from '../card'
import {Text} from '../text'

type ClearButtonProps = Omit<ButtonProps, 'as'> &
  Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref'>

interface TextInputProps {
  border?: boolean
  /**
   * @beta
   */
  clearButton?: boolean | ClearButtonProps
  customValidity?: string
  fontSize?: number | number[]
  icon?: React.ComponentType | React.ReactNode
  iconRight?: React.ComponentType | React.ReactNode
  /**
   * @beta
   */
  onClear?: () => void
  padding?: number | number[]
  prefix?: React.ReactNode
  radius?: number | number[]
  space?: number | number[]
  suffix?: React.ReactNode
  type?:
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
  weight?: ThemeFontWeightKey
}

const CLEAR_BUTTON_BOX_STYLE: React.CSSProperties = {zIndex: 2}

const Root = styled.span(textInputStyle.root)

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
  textInputStyle.input
)

const Presentation = styled.span<ResponsiveRadiusStyleProps & TextInputRepresentationStyleProps>(
  responsiveRadiusStyle,
  textInputStyle.representation
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

export const TextInput = forwardRef(
  (
    props: TextInputProps & Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'>,
    forwardedRef: React.Ref<HTMLInputElement>
  ) => {
    const {
      border = true,
      clearButton,
      disabled = false,
      fontSize = 2,
      icon,
      iconRight,
      onClear,
      padding: paddingProp = 3,
      prefix,
      radius = 1,
      space = 3,
      suffix,
      customValidity,
      type = 'text',
      ...restProps
    } = props

    const ref = useForwardedRef(forwardedRef)
    const padding = useResponsiveProp(paddingProp)

    // Transient properties
    const $hasClearButton = Boolean(clearButton)
    const $hasIcon = Boolean(icon)
    const $hasIconRight = Boolean(iconRight)
    const $hasSuffix = Boolean(suffix)
    const $hasPrefix = Boolean(prefix)

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
      [onClear, ref]
    )

    // Render prefix (memoized)
    const prefixNode = useMemo(
      () =>
        prefix && (
          <Prefix borderTop borderLeft borderBottom radius={radius} sizing="border">
            <span>{prefix}</span>
          </Prefix>
        ),
      [prefix, radius]
    )

    // Render presentation (memoized)
    const presentationNode = useMemo(
      () => (
        <Presentation
          $border={border}
          $hasPrefix={$hasPrefix}
          $hasSuffix={$hasSuffix}
          $radius={radius}
        >
          {icon && (
            <LeftBox padding={padding}>
              <Text size={fontSize}>
                {isValidElement(icon) && icon}
                {isValidElementType(icon) && createElement(icon)}
              </Text>
            </LeftBox>
          )}

          {!$hasClearButton && iconRight && (
            <RightBox padding={padding}>
              <Text size={fontSize}>
                {isValidElement(iconRight) && iconRight}
                {isValidElementType(iconRight) && createElement(iconRight)}
              </Text>
            </RightBox>
          )}
        </Presentation>
      ),
      [border, fontSize, icon, iconRight, padding, radius, $hasClearButton, $hasPrefix, $hasSuffix]
    )

    // Render clear button (memoized)
    const clearButtonBoxPadding = useMemo(() => padding.map((v) => v - 2), [padding])
    const clearButtonPadding = useMemo(() => padding.map((v) => v - 1), [padding])
    const clearButtonProps: ClearButtonProps = useMemo(
      () => (typeof clearButton === 'object' ? clearButton : EMPTY_RECORD),
      [clearButton]
    )
    const clearButtonNode = useMemo(
      () =>
        clearButton && (
          <RightBox padding={clearButtonBoxPadding} style={CLEAR_BUTTON_BOX_STYLE}>
            <Button
              {...clearButtonProps}
              data-qa="clear-button"
              fontSize={fontSize}
              icon={CloseIcon}
              mode="bleed"
              onClick={handleClearClick}
              onMouseDown={handleClearMouseDown}
              padding={clearButtonPadding}
            />
          </RightBox>
        ),
      [
        clearButton,
        clearButtonBoxPadding,
        clearButtonPadding,
        clearButtonProps,
        fontSize,
        handleClearClick,
        handleClearMouseDown,
      ]
    )

    // Render suffix (memoized)
    const suffixNode = useMemo(
      () =>
        suffix && (
          <Suffix borderTop borderRight borderBottom radius={radius} sizing="border">
            <span>{suffix}</span>
          </Suffix>
        ),
      [radius, suffix]
    )

    return (
      <Root data-ui="TextInput">
        {prefixNode}
        <InputRoot>
          <Input
            data-as="input"
            {...restProps}
            $iconLeft={$hasIcon}
            $iconRight={$hasIconRight || $hasClearButton}
            $padding={padding}
            $space={space}
            $fontSize={fontSize}
            disabled={disabled}
            ref={ref}
            type={type}
          />
          {presentationNode}
          {clearButtonNode}
        </InputRoot>
        {suffixNode}
      </Root>
    )
  }
)

TextInput.displayName = 'TextInput'
