import React, {createElement, forwardRef} from 'react'
import styled from 'styled-components'
import {radius} from '../../styles'
import {Box, BoxMarginProps, BoxPaddingProps} from '../box'
import {useCard} from '../card'
import {Flex, FlexJustify} from '../flex'
import {getResponsiveProp} from '../helpers'
import {Icon, IconSymbol} from '../icon'
import {Text} from '../text'
import {buttonBaseStyles, buttonColorStyles} from './styles'
import {ButtonMode, ButtonTone} from './types'

export interface ButtonProps extends BoxPaddingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  mode?: ButtonMode
  icon?: IconSymbol | React.FC
  iconRight?: IconSymbol | React.FC
  justify?: FlexJustify
  radius?: number | number[]
  selected?: boolean
  size?: number | number[]
  space?: number | number[]
  text?: React.ReactNode
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
}

const Root = styled.button(radius as any, buttonBaseStyles, buttonColorStyles)

export const Button = forwardRef(
  (props: BoxMarginProps & ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>, ref) => {
    const {
      children,
      disabled,
      icon,
      iconRight,
      justify = 'center',
      mode = 'default',
      margin,
      marginX,
      marginY,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      padding = 3,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      radius: radiusProp = 2,
      selected,
      size,
      space = 3,
      text,
      tone = 'default',
      ...restProps
    } = props

    const card = useCard()

    const boxProps = {
      margin,
      marginX,
      marginY,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }

    const uiRadius = getResponsiveProp(radiusProp)

    return (
      <Root
        data-ui="Button"
        {...restProps}
        data-disabled={disabled}
        data-selected={selected ? '' : undefined}
        disabled={disabled}
        ref={ref}
        scheme={card.scheme}
        tone={tone}
        uiMode={mode}
        uiRadius={uiRadius}
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
