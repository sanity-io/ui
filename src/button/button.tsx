import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {BoxPaddingProps, boxPaddingStyles} from '../box'
import {getResponsiveProp} from '../helpers'
import {Text} from '../text'
import {buttonBaseStyles, buttonColorStyles} from './styles'
import {ButtonTone} from './types'

interface ButtonProps extends BoxPaddingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
}

// @todo: Figure out typings
const Root = styled.button(boxPaddingStyles as any, buttonBaseStyles, buttonColorStyles)

export const Button = forwardRef((props: React.HTMLProps<HTMLButtonElement> & ButtonProps, ref) => {
  const {
    children,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    tone = 'default',
    ...restProps
  } = props

  const paddingProps = {
    padding: getResponsiveProp(padding, [3]),
    paddingX: getResponsiveProp(paddingX, []),
    paddingY: getResponsiveProp(paddingY, []),
    paddingTop: getResponsiveProp(paddingTop, []),
    paddingBottom: getResponsiveProp(paddingBottom, []),
    paddingLeft: getResponsiveProp(paddingLeft, []),
    paddingRight: getResponsiveProp(paddingRight, []),
  }

  return (
    <Root data-ui="Button" {...restProps} {...paddingProps} ref={ref} tone={tone}>
      {children && <Text as="span">{children}</Text>}
    </Root>
  )
})

Button.displayName = 'Button'
