import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {responsiveGridStyle, ResponsiveGridStyleProps} from '../../styles/internal'
import {Box, BoxProps} from '../box'
import {ResponsiveGridProps} from '../types'

/**
 * @public
 */
export interface GridProps extends Omit<BoxProps, 'display'>, ResponsiveGridProps {}

const StyledGrid = styled(Box)<ResponsiveGridStyleProps>(responsiveGridStyle)

/**
 * The `Grid` component is for building 2-dimensional layers (based on CSS grid).
 *
 * @public
 */
export const Grid = forwardRef(function Grid(
  props: GridProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'rows'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {as, autoRows, autoCols, autoFlow, columns, gap, gapX, gapY, rows, children, ...restProps} =
    props

  return (
    <StyledGrid
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Grid"
      {...restProps}
      $autoRows={_getArrayProp(autoRows)}
      $autoCols={_getArrayProp(autoCols)}
      $autoFlow={_getArrayProp(autoFlow)}
      $columns={_getArrayProp(columns)}
      $gap={_getArrayProp(gap)}
      $gapX={_getArrayProp(gapX)}
      $gapY={_getArrayProp(gapY)}
      $rows={_getArrayProp(rows)}
      forwardedAs={as}
      ref={ref}
    >
      {children}
    </StyledGrid>
  )
})
Grid.displayName = 'ForwardRef(Grid)'
