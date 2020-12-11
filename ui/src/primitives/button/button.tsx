import React, {createElement, forwardRef, isValidElement} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {ThemeProps} from '../../styles'
import {
  FlexJustify,
  ResponsivePaddingStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
} from '../../styles/internal'
import {useTheme} from '../../theme'
import {Box} from '../box'
import {Flex} from '../flex'
import {Text} from '../text'
import {buttonBaseStyles, buttonColorStyles} from './styles'
import {ButtonMode, ButtonTone} from './types'

export interface ButtonProps extends ResponsivePaddingStyleProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  mode?: ButtonMode
  icon?: React.ComponentType | React.ReactNode
  iconRight?: React.ComponentType | React.ReactNode
  justify?: FlexJustify | FlexJustify[]
  selected?: boolean
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

export const Button = forwardRef((props: ButtonProps & React.HTMLProps<HTMLButtonElement>, ref) => {
  const {
    children,
    disabled,
    fontSize,
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
              <Text size={fontSize}>
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
                <Text size={fontSize} weight={theme.sanity.button.textWeight}>
                  {text}
                </Text>
              </Box>
            )}

            {iconRight && (
              <Text size={fontSize}>
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
})

Button.displayName = 'Button'
