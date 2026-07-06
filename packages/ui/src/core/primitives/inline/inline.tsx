import {Children, forwardRef, useMemo} from 'react'
import {styled} from 'styled-components'

import {useArrayProp} from '../../hooks'
import {Box, BoxProps} from '../box'
import {inlineBaseStyle, inlineSpaceStyle} from './styles'
import {ResponsiveInlineSpaceStyleProps} from './types'

/**
 * @public
 */
export interface InlineProps extends Omit<BoxProps, 'display'> {
  /** The spacing between children. */
  space?: number | number[]
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
  const {as, children: childrenProp, space, ...restProps} = props

  const children = useMemo(
    () => Children.map(childrenProp, (child) => child && <div>{child}</div>),
    [childrenProp],
  )

  return (
    <StyledInline
      data-ui="Inline"
      {...restProps}
      $space={useArrayProp(space)}
      forwardedAs={as}
      ref={ref as any}
    >
      {children}
    </StyledInline>
  )
})
Inline.displayName = 'ForwardRef(Inline)'
