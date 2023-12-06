import {forwardRef} from 'react'
import styled, {css} from 'styled-components'
import {useArrayProp} from '../../hooks'
import {ThemeProps} from '../../styles'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
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

function kbdStyle(props: ThemeProps) {
  const {theme} = props
  const color = theme.sanity.color.kbd || theme.sanity.color.base

  return css`
    --card-fg-color: ${color.fg};
    --kbd-box-bg: ${color.bg};
    --kbd-box-shadow: ${color.border};

    box-shadow: inset 0 0 0 1px var(--kbd-box-shadow);
    background: var(--kbd-box-bg);
    font: inherit;

    &:not([hidden]) {
      display: inline-block;
    }
  `
}

const Root = styled.kbd<ResponsiveRadiusStyleProps>(responsiveRadiusStyle, kbdStyle)

/**
 * Used to define some text as keyboard input.
 *
 * @public
 */
export const KBD = forwardRef(function KBD(
  props: KBDProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {children, fontSize = 0, padding = 1, radius = 2, ...restProps} = props

  return (
    <Root data-ui="KBD" {...restProps} $radius={useArrayProp(radius)} ref={ref}>
      <Box as="span" padding={padding}>
        <Text as="span" size={fontSize} weight="medium">
          {children}
        </Text>
      </Box>
    </Root>
  )
})
