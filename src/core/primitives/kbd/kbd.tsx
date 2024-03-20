import {forwardRef} from 'react'
import {styled, css} from 'styled-components'
import {useArrayProp} from '../../hooks'
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

function kbdStyle() {
  return css`
    --card-bg-color: var(--card-kbd-bg-color);
    --card-border-color: var(--card-kbd-border-color);
    --card-fg-color: var(--card-kbd-fg-color);

    box-shadow: inset 0 0 0 1px var(--card-border-color);
    background: var(--card-bg-color);
    font: inherit;

    vertical-align: top;

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
        <Text as="span" size={fontSize} weight="semibold">
          {children}
        </Text>
      </Box>
    </Root>
  )
})
