import {CloseIcon} from '@sanity/icons'
import React, {createElement, forwardRef, isValidElement, useCallback} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {getResponsiveProp} from '../../styles'
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

interface TextInputProps {
  border?: boolean
  /**
   * @beta
   */
  clearButton?:
    | boolean
    | (Omit<ButtonProps, 'as'> & Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref'>)
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

    const padding = getResponsiveProp(paddingProp)

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

    return (
      <Root data-ui="TextInput">
        {prefix && (
          <Prefix borderTop borderLeft borderBottom radius={radius} sizing="border">
            <span>{prefix}</span>
          </Prefix>
        )}

        <InputRoot>
          <Input
            data-as="input"
            {...restProps}
            $iconLeft={Boolean(icon)}
            $iconRight={Boolean(iconRight) || Boolean(clearButton)}
            $padding={padding}
            $space={space}
            $fontSize={fontSize}
            disabled={disabled}
            ref={ref}
            type={type}
          />

          <Presentation
            $border={border}
            $hasPrefix={Boolean(prefix)}
            $hasSuffix={Boolean(suffix)}
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

            {!clearButton && iconRight && (
              <RightBox padding={padding}>
                <Text size={fontSize}>
                  {isValidElement(iconRight) && iconRight}
                  {isValidElementType(iconRight) && createElement(iconRight)}
                </Text>
              </RightBox>
            )}
          </Presentation>

          {clearButton && (
            <RightBox padding={padding.map((v) => v - 2)} style={{zIndex: 2}}>
              <Button
                {...(typeof clearButton === 'object' ? clearButton : {})}
                data-qa="clear-button"
                fontSize={fontSize}
                icon={CloseIcon}
                mode="bleed"
                onClick={handleClearClick}
                onMouseDown={handleClearMouseDown}
                padding={padding.map((v) => v - 1)}
              />
            </RightBox>
          )}
        </InputRoot>

        {suffix && (
          <Suffix borderTop borderRight borderBottom radius={radius} sizing="border">
            <span>{suffix}</span>
          </Suffix>
        )}
      </Root>
    )
  }
)

TextInput.displayName = 'TextInput'
