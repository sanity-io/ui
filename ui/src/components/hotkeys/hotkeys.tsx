import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Inline, KBD} from '../../atoms'

interface HotkeysProps {
  padding?: number | number[]
  radius?: number | number[]
  size?: number | number[]
  space?: number | number[]
  keys?: string[]
}

const Root = styled.kbd`
  &&:not([hidden]) {
    display: block;
  }
  font: inherit;
`

const Key = styled(KBD)`
  /* See: https://github.com/styled-components/styled-components/issues/1816 */
  &&:not([hidden]) {
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
      <Root {...restProps} ref={ref}>
        <Inline as="span" space={space}>
          {keys.map((key, i) => (
            <Key key={i} padding={padding} radius={radius} size={size}>
              {key}
            </Key>
          ))}
        </Inline>
      </Root>
    )
  }
)

Hotkeys.displayName = 'Hotkeys'
