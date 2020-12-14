import React, {forwardRef} from 'react'
import styled, {css} from 'styled-components'
import {responsiveRadiusStyle} from '../../styles/internal'
import {Box} from '../box'
import {Code} from '../code'

interface KBDProps {
  padding?: number | number[]
  radius?: number | number[]
  size?: number | number[]
}

function kbdStyle() {
  return css`
    background: var(--card-bg-color);
    font: inherit;
    box-shadow: inset 0 0 0 1px var(--card-hairline-hard-color);

    &&:not([hidden]) {
      display: inline-block;
    }
  `
}

const Root = styled.kbd<{radius?: number | number[]}>(responsiveRadiusStyle, kbdStyle)

export const KBD = forwardRef(
  (
    props: KBDProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref' | 'size'>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {children, padding = 1, radius = 2, size = 1, ...restProps} = props

    return (
      <Root {...restProps} radius={radius} ref={ref}>
        <Box as="span" padding={padding}>
          <Code as="span" muted size={size}>
            {children}
          </Code>
        </Box>
      </Root>
    )
  }
)

KBD.displayName = 'KBD'
