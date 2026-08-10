import {Children, useMemo} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles/helpers'
import {ElementType, Props} from '../../types/component'
import {Box, BoxOwnProps} from '../box/box'
import {inlineBaseStyle, inlineSpaceStyle} from './styles'
import {ResponsiveInlineSpaceStyleProps} from './types'

/**
 * @public
 */
export interface InlineOwnProps extends Omit<BoxOwnProps, 'display'> {
  /**
   * @deprecated Use `gap` instead.
   */
  space?: never
  /** The spacing between children. */
  gap?: number | number[]
}

/**
 * @public
 */
export type InlineProps<E extends ElementType = 'div'> = Props<InlineOwnProps, E>

const StyledInline = styled(Box)<ResponsiveInlineSpaceStyleProps>(inlineBaseStyle, inlineSpaceStyle)

function InlineComponent(
  props: InlineOwnProps & {as?: ElementType} & React.HTMLProps<HTMLDivElement>,
) {
  const {as, children: childrenProp, gap, ref, ...restProps} = props

  const children = useMemo(
    () => Children.map(childrenProp, (child) => child && <div>{child}</div>),
    [childrenProp],
  )

  return (
    <StyledInline
      data-ui="Inline"
      {...restProps}
      $space={_getArrayProp(gap)}
      forwardedAs={as}
      ref={ref}
    >
      {children}
    </StyledInline>
  )
}

/**
 * The `Inline` component is a layout utility for aligning and spacing items horizontally.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Inline = InlineComponent as unknown as <E extends ElementType = 'div'>(
  props: InlineProps<E>,
) => React.JSX.Element
