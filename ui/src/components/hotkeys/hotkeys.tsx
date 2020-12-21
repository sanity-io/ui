import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Inline, KBD} from '../../primitives'

interface HotkeysProps {
  padding?: number | number[]
  radius?: number | number[]
  size?: number | number[]
  space?: number | number[]
  keys?: string[]
}

const Root = styled.kbd`
  &:not([hidden]) {
    display: block;
  }
  font: inherit;
`

const Key = styled(KBD)`
  &:not([hidden]) {
    display: block;
  }
`

export const Hotkeys = forwardRef(
  (
    props: HotkeysProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref'>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {keys, padding, radius, size, space = 1, ...restProps} = props

    if (!keys || keys.length === 0) {
      return <span />
    }

    return (
      <Root data-ui="Hotkeys" {...restProps} ref={ref}>
        <Inline as="span" space={space}>
          {keys.map((key, i) => (
            <Key fontSize={size} key={i} padding={padding} radius={radius}>
              {key}
            </Key>
          ))}
        </Inline>
      </Root>
    )
  }
)

Hotkeys.displayName = 'Hotkeys'
