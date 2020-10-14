import React, {createElement, forwardRef} from 'react'
import styled from 'styled-components'
import {radius} from '../../styles'
import {Box, BoxMarginProps, BoxPaddingProps} from '../box'
import {useCard} from '../card'
import {getResponsiveProp} from '../helpers'
import {Icon, IconSymbol} from '../icon'
import {Text} from '../text'
import {buttonBaseStyles, buttonColorStyles} from './styles'
import {ButtonMode, ButtonTone} from './types'

export interface ButtonProps extends BoxPaddingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  mode?: ButtonMode
  tone?: ButtonTone
  icon?: IconSymbol | React.FC
  radius?: number | number[]
  selected?: boolean
  size?: number | number[]
  text?: React.ReactNode
  type?: 'button' | 'reset' | 'submit'
}

const Root = styled.button(radius as any, buttonBaseStyles, buttonColorStyles)

const TextContainer = styled.span`
  svg + & {
    margin-left: 0.75em;
  }
`

export const Button = forwardRef(
  (props: BoxMarginProps & ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>, ref) => {
    const {
      children,
      disabled,
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
      text,
      tone = 'default',
      icon,
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
        {(icon || text) && (
          <Box as="span" {...boxProps}>
            <Text as="span" size={size}>
              {typeof icon === 'function' && createElement(icon)}
              {typeof icon === 'string' && <Icon symbol={icon} />}
              {text && <TextContainer>{text}</TextContainer>}
            </Text>
          </Box>
        )}

        {children && <span>{children}</span>}
      </Root>
    )
  }
)

Button.displayName = 'Button'
