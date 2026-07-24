import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {responsiveGridStyle, ResponsiveGridStyleProps} from '../../styles/internal'
import {ElementType, Props} from '../../types'
import {Box, BoxOwnProps} from '../box'
import {ResponsiveGridProps} from '../types'

/**
 * @public
 */
export interface GridOwnProps extends Omit<BoxOwnProps, 'display'>, ResponsiveGridProps {}

/**
 * @public
 */
export type GridProps<E extends ElementType = 'div'> = Props<GridOwnProps, E>

const StyledGrid = styled(Box)<ResponsiveGridStyleProps>(responsiveGridStyle)

const GridComponent = forwardRef(function Grid(
  props: GridOwnProps & {as?: ElementType} & Omit<
      React.HTMLProps<HTMLDivElement>,
      'as' | 'height' | 'rows'
    >,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    as,
    autoRows,
    autoCols,
    autoFlow,
    // oxlint-disable-next-line no-deprecated
    columns,
    gridTemplateColumns,
    gap,
    gapX,
    gapY,
    // oxlint-disable-next-line no-deprecated
    rows,
    gridTemplateRows,
    children,
    ...restProps
  } = props

  return (
    <StyledGrid
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Grid"
      {...restProps}
      $autoRows={_getArrayProp(autoRows)}
      $autoCols={_getArrayProp(autoCols)}
      $autoFlow={_getArrayProp(autoFlow)}
      $columns={_getArrayProp(gridTemplateColumns === undefined ? columns : gridTemplateColumns)}
      $gap={_getArrayProp(gap)}
      $gapX={_getArrayProp(gapX)}
      $gapY={_getArrayProp(gapY)}
      $rows={_getArrayProp(gridTemplateRows === undefined ? rows : gridTemplateRows)}
      forwardedAs={as}
      ref={ref}
    >
      {children}
    </StyledGrid>
  )
})

/**
 * The `Grid` component is for building 2-dimensional layers (based on CSS grid).
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Grid = GridComponent as unknown as <E extends ElementType = 'div'>(
  props: GridProps<E>,
) => React.JSX.Element
