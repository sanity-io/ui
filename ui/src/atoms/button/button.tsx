import React, {createElement, forwardRef} from 'react'
import styled from 'styled-components'
import {
  FlexJustify,
  ResponsivePaddingStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
} from '../../styles'
import {ThemeColorSchemeKey, Theme} from '../../theme'
import {Box} from '../box'
import {useCard} from '../card'
import {Flex} from '../flex'
import {Icon, IconSymbol} from '../icon'
import {Text} from '../text'
import {buttonBaseStyles, buttonColorStyles} from './styles'
import {ButtonMode, ButtonTone} from './types'

export interface ButtonProps extends ResponsivePaddingStyleProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  mode?: ButtonMode
  icon?: IconSymbol | React.ComponentType
  iconRight?: IconSymbol | React.ComponentType
  justify?: FlexJustify
  selected?: boolean
  size?: number | number[]
  space?: number | number[]
  text?: React.ReactNode
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
}

const Root = styled.button<{
  uiMode: ButtonMode
  scheme: ThemeColorSchemeKey
  theme: Theme
  tone: ButtonTone
}>(responsiveRadiusStyle, buttonBaseStyles, buttonColorStyles)

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
      ...restProps
    } = props

    const card = useCard()

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
        scheme={card.scheme}
        tone={tone}
        uiMode={mode}
      >
        {(icon || text || iconRight) && (
          <Box as="span" {...boxProps}>
            <Flex as="span" justify={justify}>
              {icon && (
                <Text size={size}>
                  {typeof icon === 'function' && createElement(icon)}
                  {typeof icon === 'string' && <Icon symbol={icon} />}
                </Text>
              )}

              {text && (
                <Box
                  flex={iconRight ? 1 : undefined}
                  marginLeft={icon ? space : undefined}
                  marginRight={iconRight ? space : undefined}
                >
                  <Text size={size}>{text}</Text>
                </Box>
              )}

              {iconRight && (
                <Text size={size}>
                  {typeof iconRight === 'function' && createElement(iconRight)}
                  {typeof iconRight === 'string' && <Icon symbol={iconRight} />}
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
