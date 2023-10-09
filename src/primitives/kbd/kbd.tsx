import {forwardRef} from 'react'
import styled, {css} from 'styled-components'
import {useArrayProp} from '../../hooks'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
import {cssVars} from '../../theme'
import {Radius} from '../../types'
import {Box} from '../box'
import {Text} from '../text'

/**
 * @public
 */
export interface KBDProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  padding?: number | number[]
  radius?: Radius | Radius[]
}

function kbdStyle() {
  return css`
    background: ${cssVars.default.bg_tint};
    font: inherit;

    &:not([hidden]) {
      display: inline-block;
    }
  `
}

const Root = styled.kbd<ResponsiveRadiusStyleProps>(responsiveRadiusStyle, kbdStyle)

/**
 * @public
 */
export const KBD = forwardRef(function KBD(
  props: KBDProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {children, fontSize = 1, padding = 1, radius = 2, ...restProps} = props

  return (
    <Root data-ui="KBD" {...restProps} $radius={useArrayProp(radius)} ref={ref}>
      <Box as="span" padding={padding}>
        <Text as="span" muted size={fontSize} weight="medium">
          {children}
        </Text>
      </Box>
    </Root>
  )
})
