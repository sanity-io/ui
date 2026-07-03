import {forwardRef} from 'react'
import {css, styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
import {ElementType, Props, Radius} from '../../types'
import {Box} from '../box'
import {Text} from '../text'

/**
 * @public
 */
export interface KBDOwnProps {
  fontSize?: number | number[]
  padding?: number | number[]
  radius?: Radius | Radius[]
}

/**
 * @public
 */
export type KBDProps<E extends ElementType = 'kbd'> = Props<KBDOwnProps, E>

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

const StyledKBD = styled.kbd<ResponsiveRadiusStyleProps>(responsiveRadiusStyle, kbdStyle)

const KBDComponent = forwardRef(function KBD(
  props: KBDOwnProps & {as?: ElementType} & Omit<
      React.HTMLProps<HTMLElement>,
      'as' | 'ref' | 'size'
    >,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {children, fontSize = 0, padding = 1, radius = 2, ...restProps} = props

  return (
    <StyledKBD data-ui="KBD" {...restProps} $radius={_getArrayProp(radius)} ref={ref}>
      <Box as="span" padding={padding}>
        <Text as="span" size={fontSize} weight="semibold">
          {children}
        </Text>
      </Box>
    </StyledKBD>
  )
})
KBDComponent.displayName = 'ForwardRef(KBD)'

/**
 * Used to define some text as keyboard input.
 *
 * @public
 */
export const KBD = KBDComponent as unknown as <E extends ElementType = 'kbd'>(
  props: KBDProps<E>,
) => React.JSX.Element
