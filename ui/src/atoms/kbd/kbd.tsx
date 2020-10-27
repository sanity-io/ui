import React, {forwardRef} from 'react'
import styled, {css} from 'styled-components'
import {radius} from '../../styles'
import {Box} from '../box'
import {Code} from '../code'
import {getResponsiveProp} from '../helpers'

interface KBDProps {
  padding?: number | number[]
  radius?: number | number[]
  size?: number | number[]
}

function kbd() {
  return css`
    display: inline-block;
    background: var(--card-bg-color);
    font: inherit;
    box-shadow: inset 0 0 0 1px var(--card-hairline-soft-color);
  `
}

const Root = styled.kbd<{uiRadius: number[]}>(radius, kbd)

export const KBD = forwardRef(
  (props: KBDProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref' | 'size'>, ref) => {
    const {children, padding = 1, radius: radiusProp = 2, size = 1, ...restProps} = props
    const radius = getResponsiveProp(radiusProp)

    return (
      <Root {...restProps} uiRadius={radius} ref={ref as any}>
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
