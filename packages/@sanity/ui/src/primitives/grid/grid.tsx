import {forwardRef, memo} from 'react'
import {useArrayProp} from '../../hooks'
import {compose} from '../../styles'
import {
  responsiveGridAutoColsStyle,
  responsiveGridAutoFlowStyle,
  responsiveGridAutoRowsStyle,
  responsiveGridColumnsStyle,
  responsiveGridGapStyle,
  responsiveGridGapXStyle,
  responsiveGridGapYStyle,
  responsiveGridRowsStyle,
  ResponsiveGridStyleProps,
  __tmp_gridStyle,
} from '../../styles/internal'
import {Box, BoxProps} from '../box'
import {ResponsiveGridProps} from '../types'

/**
 * @public
 */
export interface GridProps extends Omit<BoxProps, 'display'>, ResponsiveGridProps {}

const Root = memo(
  compose<ResponsiveGridStyleProps>(Box, [
    __tmp_gridStyle,
    responsiveGridAutoFlowStyle,
    responsiveGridAutoRowsStyle,
    responsiveGridAutoColsStyle,
    responsiveGridColumnsStyle,
    responsiveGridRowsStyle,
    responsiveGridGapStyle,
    responsiveGridGapXStyle,
    responsiveGridGapYStyle,
  ])
)

/**
 * @public
 */
export const Grid = forwardRef(function Grid(
  props: GridProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'rows'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {as, autoRows, autoCols, autoFlow, columns, gap, gapX, gapY, rows, children, ...restProps} =
    props

  return (
    <Root
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
    </Root>
  )
})
