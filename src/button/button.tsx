import React from 'react'
import styled, {css} from 'styled-components'
import {Text} from '../text'
import {Theme} from '../theme'

export type ButtonTone = 'brand'

interface ButtonProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
}

function buttonColorCss(props: {theme: Theme; tone?: ButtonTone}) {
  const tone = props.theme.color.button.tones[props.tone || 'default']

  return css`
    background: ${tone.enabled.bg};
    color: ${tone.enabled.fg};
  `
}

const Root = styled.button`
  -webkit-appearance: none;
  appearance: none;
  font: inherit;
  border: 0;
  padding: 1em;
  border-radius: 3px;

  ${buttonColorCss}
`

export function Button(props: React.HTMLProps<HTMLButtonElement> & ButtonProps) {
  const {children, ...restProps} = props

  return (
    <Root data-ui="Button" {...restProps}>
      {children && <Text>{children}</Text>}
    </Root>
  )
}
