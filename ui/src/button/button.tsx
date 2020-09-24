import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Box, BoxPaddingProps} from '../box'
import {Text} from '../text'
import {buttonBaseStyles, buttonColorStyles} from './styles'
import {ButtonMode, ButtonTone} from './types'

interface ButtonProps extends BoxPaddingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  mode?: ButtonMode
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
}

// @todo: Figure out typings
const Root = styled.button(buttonBaseStyles, buttonColorStyles)

export const Button = forwardRef((props: React.HTMLProps<HTMLButtonElement> & ButtonProps, ref) => {
  const {
    children,
    disabled,
    mode = 'default',
    padding = 3,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    tone = 'default',
    ...restProps
  } = props

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
      disabled={disabled}
      mode={mode}
      ref={ref}
      tone={tone}
    >
      <Box as="span" {...boxProps}>
        {children && <Text as="span">{children}</Text>}
      </Box>
    </Root>
  )
})

Button.displayName = 'Button'
