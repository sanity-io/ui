import React, {forwardRef} from 'react'
import styled, {css} from 'styled-components'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
import {Box} from '../box'
import {Code} from '../code'

/**
 * @public
 */
export interface KBDProps {
  fontSize?: number | number[]
  padding?: number | number[]
  radius?: number | number[]
}

function kbdStyle() {
  return css`
    background: var(--card-bg-color);
    font: inherit;
    box-shadow: inset 0 0 0 1px var(--card-hairline-hard-color);

    &:not([hidden]) {
      display: inline-block;
    }
  `
}

const Root = styled.kbd<ResponsiveRadiusStyleProps>(responsiveRadiusStyle, kbdStyle)

/**
 * @public
 */
export const KBD = forwardRef(
  (
    props: KBDProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref' | 'size'>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {children, fontSize = 1, padding = 1, radius = 2, ...restProps} = props

    return (
      <Root data-ui="KBD" {...restProps} $radius={radius} ref={ref}>
        <Box as="span" padding={padding}>
          <Code as="span" muted size={fontSize}>
            {children}
          </Code>
        </Box>
      </Root>
    )
  }
)

KBD.displayName = 'KBD'
