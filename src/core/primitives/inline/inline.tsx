import {Children, forwardRef, useMemo} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {Box, BoxProps} from '../box'
import {inlineBaseStyle, inlineSpaceStyle} from './styles'
import {ResponsiveInlineSpaceStyleProps} from './types'

/**
 * @public
 */
export interface InlineProps extends Omit<BoxProps, 'display'> {
  /**
   * The spacing between children.
   * @deprecated Use `gap` instead. `space` will be removed in v4.
   */
  space?: number | number[]
  /** The spacing between children. */
  gap?: number | number[]
}

const StyledInline = styled(Box)<ResponsiveInlineSpaceStyleProps>(inlineBaseStyle, inlineSpaceStyle)

/**
 * The `Inline` component is a layout utility for aligning and spacing items horizontally.
 *
 * @public
 */
export const Inline = forwardRef(function Inline(
  props: InlineProps & React.HTMLProps<HTMLDivElement>,
  ref,
) {
  const {as, children: childrenProp, gap, space: deprecated_space, ...restProps} = props
  const spacing = gap === undefined ? deprecated_space : gap

  const children = useMemo(
    () => Children.map(childrenProp, (child) => child && <div>{child}</div>),
    [childrenProp],
  )

  return (
    <StyledInline
      data-ui="Inline"
      {...restProps}
      $space={_getArrayProp(spacing)}
      forwardedAs={as}
      ref={ref as any}
    >
      {children}
    </StyledInline>
  )
})
Inline.displayName = 'ForwardRef(Inline)'
