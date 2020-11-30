import React, {createElement, forwardRef} from 'react'
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
} from '../../styles'
import {Box} from '../box'
import {Card, useCard} from '../card'
import {Icon, IconSymbol} from '../icon'
import {Text} from '../text'

interface TextInputProps extends ResponsiveRadiusProps {
  border?: boolean
  customValidity?: string
  icon?: IconSymbol | React.ComponentType
  iconRight?: IconSymbol | React.ComponentType
  padding?: number | number[]
  prefix?: React.ReactNode
  size?: number | number[]
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
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
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
    props: TextInputProps & Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'size' | 'type'>,
    forwardedRef: React.Ref<HTMLInputElement>
  ) => {
    const {
      border = true,
      disabled = false,
      icon,
      iconRight,
      padding = 3,
      prefix,
      radius = 1,
      size = 2,
      space = 3,
      suffix,
      customValidity,
      type = 'text',
      ...restProps
    } = props
    const {scheme} = useCard()

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
            {...restProps}
            disabled={disabled}
            iconLeft={Boolean(icon)}
            iconRight={Boolean(iconRight)}
            padding={padding}
            ref={ref}
            scheme={scheme}
            space={space}
            type={type}
            uiSize={size}
          />

          <Presentation
            border={border}
            hasPrefix={Boolean(prefix)}
            hasSuffix={Boolean(suffix)}
            radius={radius}
            scheme={scheme}
          >
            {icon && (
              <IconLeftBox padding={padding}>
                <Text size={size}>
                  {typeof icon === 'string' && <Icon symbol={icon} />}
                  {typeof icon !== 'string' && isValidElementType(icon) && createElement(icon)}
                </Text>
              </IconLeftBox>
            )}

            {iconRight && (
              <IconRightBox padding={padding}>
                <Text size={size}>
                  {typeof iconRight === 'string' && <Icon symbol={iconRight} />}
                  {typeof iconRight !== 'string' &&
                    isValidElementType(iconRight) &&
                    createElement(iconRight)}
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
