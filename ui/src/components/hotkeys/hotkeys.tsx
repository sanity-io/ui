import React from 'react'
import styled from 'styled-components'
import {Card, Inline, Text} from '../../atoms'

interface HotkeysProps {
  size?: number | number[]
  keys?: string[]
}

const Root = styled.span`
  display: inline-flex;
  align-items: center;
`

const KeyCard = styled(Card)`
  min-width: 1em;
  text-align: center;
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 0 1px currentColor;
    opacity: 0.25;
    pointer-events: none;
  }
`

const KeyText = styled(Text)`
  color: inherit;
  text-transform: capitalize;
`

export function Hotkeys(props: HotkeysProps) {
  const {keys, size} = props

  if (!keys || keys.length === 0) {
    return <span />
  }

  return (
    <Root>
      <Inline>
        {keys.map((key, i) => (
          <KeyCard key={i} padding={2} radius={2}>
            <KeyText size={size}>{key}</KeyText>
          </KeyCard>
        ))}
      </Inline>
    </Root>
  )
}
