import React, {createElement, forwardRef, isValidElement} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
  responsiveInputPaddingStyle,
  textInputStyle,
  TextInputInputStyleProps,
  TextInputRepresentationStyleProps,
  TextInputResponsivePaddingStyleProps,
} from '../../styles/internal'
import {ThemeFontWeightKey} from '../../theme'
import {Box} from '../box'
import {Card} from '../card'
import {Text} from '../text'

interface TextInputProps extends ResponsiveRadiusProps {
  border?: boolean
  customValidity?: string
  fontSize?: number | number[]
  icon?: React.ComponentType | React.ReactNode
  iconRight?: React.ComponentType | React.ReactNode
  padding?: number | number[]
  prefix?: React.ReactNode
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

const Presentation = styled.span<ResponsiveRadiusProps & TextInputRepresentationStyleProps>(
  responsiveRadiusStyle,
  textInputStyle.representation
)

const IconLeftBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
`

const IconRightBox = styled(Box)`
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
      disabled = false,
      fontSize = 2,
      icon,
      iconRight,
      padding = 3,
      prefix,
      radius = 1,
      space = 3,
      suffix,
      customValidity,
      type = 'text',
      ...restProps
    } = props

    const ref = useForwardedRef(forwardedRef)

    useCustomValidity(ref, customValidity)

    return (
      <Root>
        {prefix && (
          <Prefix borderTop borderLeft borderBottom radius={radius} sizing="border">
            <span>{prefix}</span>
          </Prefix>
        )}

        <InputRoot>
          <Input
            data-as="input"
            {...restProps}
            disabled={disabled}
            iconLeft={Boolean(icon)}
            iconRight={Boolean(iconRight)}
            padding={padding}
            ref={ref}
            space={space}
            fontSize={fontSize}
            type={type}
          />

          <Presentation
            border={border}
            hasPrefix={Boolean(prefix)}
            hasSuffix={Boolean(suffix)}
            radius={radius}
          >
            {icon && (
              <IconLeftBox padding={padding}>
                <Text size={fontSize}>
                  {isValidElement(icon) && icon}
                  {isValidElementType(icon) && createElement(icon)}
                </Text>
              </IconLeftBox>
            )}

            {iconRight && (
              <IconRightBox padding={padding}>
                <Text size={fontSize}>
                  {isValidElement(iconRight) && iconRight}
                  {isValidElementType(iconRight) && createElement(iconRight)}
                </Text>
              </IconRightBox>
            )}
          </Presentation>
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
