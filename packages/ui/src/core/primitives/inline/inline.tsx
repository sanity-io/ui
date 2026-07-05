import {Children, forwardRef, useMemo} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {ElementType, Props} from '../../types'
import {Box, BoxOwnProps} from '../box'
import {inlineBaseStyle, inlineSpaceStyle} from './styles'
import {ResponsiveInlineSpaceStyleProps} from './types'

/**
 * @public
 */
export interface InlineOwnProps extends Omit<BoxOwnProps, 'display'> {
  /**
   * The spacing between children.
   * @deprecated Use `gap` instead. `space` will be removed in v4.
   */
  space?: number | number[]
  /** The spacing between children. */
  gap?: number | number[]
}

/**
 * @public
 */
export type InlineProps<E extends ElementType = 'div'> = Props<InlineOwnProps, E>

const StyledInline = styled(Box)<ResponsiveInlineSpaceStyleProps>(inlineBaseStyle, inlineSpaceStyle)

const InlineComponent = forwardRef(function Inline(
  props: InlineOwnProps & {as?: ElementType} & React.HTMLProps<HTMLDivElement>,
  ref,
) {
  // oxlint-disable-next-line no-deprecated
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
      // oxlint-disable-next-line no-unnecessary-type-assertion, no-unsafe-type-assertion
      ref={ref as any}
    >
      {children}
    </StyledInline>
  )
})
InlineComponent.displayName = 'ForwardRef(Inline)'

/**
 * The `Inline` component is a layout utility for aligning and spacing items horizontally.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Inline = InlineComponent as unknown as <E extends ElementType = 'div'>(
  props: InlineProps<E>,
) => React.JSX.Element
