import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {useArrayProp} from '../../hooks'
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
      $autoRows={useArrayProp(autoRows)}
      $autoCols={useArrayProp(autoCols)}
      $autoFlow={useArrayProp(autoFlow)}
      $columns={useArrayProp(columns)}
      $gap={useArrayProp(gap)}
      $gapX={useArrayProp(gapX)}
      $gapY={useArrayProp(gapY)}
      $rows={useArrayProp(rows)}
      forwardedAs={as}
      ref={ref}
    >
      {children}
    </StyledGrid>
  )
})
Grid.displayName = 'ForwardRef(Grid)'
