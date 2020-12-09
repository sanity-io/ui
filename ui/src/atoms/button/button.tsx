import React, {createElement, forwardRef, isValidElement} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {
  FlexJustify,
  ResponsivePaddingStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
  ThemeProps,
} from '../../styles'
import {useTheme} from '../../theme'
import {Box} from '../box'
import {Flex} from '../flex'
import {Text} from '../text'
import {buttonBaseStyles, buttonColorStyles} from './styles'
import {ButtonMode, ButtonTone} from './types'

export interface ButtonProps extends ResponsivePaddingStyleProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  mode?: ButtonMode
  icon?: React.ComponentType | React.ReactNode
  iconRight?: React.ComponentType | React.ReactNode
  justify?: FlexJustify | FlexJustify[]
  selected?: boolean
  size?: number | number[]
  space?: number | number[]
  text?: React.ReactNode
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
}

const Root = styled.button<{uiMode: ButtonMode; tone: ButtonTone} & ThemeProps>(
  responsiveRadiusStyle,
  buttonBaseStyles,
  buttonColorStyles
)

export const Button = forwardRef(
  (props: ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>, ref) => {
    const {
      children,
      disabled,
      icon,
      iconRight,
      justify = 'center',
      mode = 'default',
      padding = 3,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      radius = 2,
      selected,
      size,
      space = 3,
      text,
      tone = 'default',
      type = 'button',
      ...restProps
    } = props

    const theme = useTheme()

    const boxProps = {
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }

    return (
      <Root
        data-ui="Button"
        {...restProps}
        data-disabled={disabled}
        data-selected={selected ? '' : undefined}
        disabled={disabled}
        radius={radius}
        ref={ref}
        tone={tone}
        type={type}
        uiMode={mode}
      >
        {(icon || text || iconRight) && (
          <Box as="span" {...boxProps}>
            <Flex as="span" justify={justify}>
              {icon && (
                <Text size={size}>
                  {isValidElement(icon) && icon}
                  {isValidElementType(icon) && createElement(icon)}
                </Text>
              )}

              {text && (
                <Box
                  flex={iconRight ? 1 : undefined}
                  marginLeft={icon ? space : undefined}
                  marginRight={iconRight ? space : undefined}
                >
                  <Text size={size} weight={theme.sanity.button.textWeight}>
                    {text}
                  </Text>
                </Box>
              )}

              {iconRight && (
                <Text size={size}>
                  {isValidElement(iconRight) && iconRight}
                  {isValidElementType(iconRight) && createElement(iconRight)}
                </Text>
              )}
            </Flex>
          </Box>
        )}

        {children && <span>{children}</span>}
      </Root>
    )
  }
)

Button.displayName = 'Button'
