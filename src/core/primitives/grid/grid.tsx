import {forwardRef, useMemo} from 'react'
import {styled} from 'styled-components'
import {_getArrayProp} from '../../styles'
import {responsiveGridStyle, ResponsiveGridStyleProps} from '../../styles/internal'
import {Box, BoxProps} from '../box'
import {ResponsiveGridProps} from '../types'

/**
 * @public
 */
export interface GridProps extends Omit<BoxProps, 'display'>, ResponsiveGridProps {}

const Root = styled(Box)<ResponsiveGridStyleProps>(responsiveGridStyle)

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

  const $autoRows = useMemo(() => _getArrayProp(autoRows), [autoRows])
  const $autoCols = useMemo(() => _getArrayProp(autoCols), [autoCols])
  const $autoFlow = useMemo(() => _getArrayProp(autoFlow), [autoFlow])
  const $columns = useMemo(() => _getArrayProp(columns), [columns])
  const $gap = useMemo(() => _getArrayProp(gap), [gap])
  const $gapX = useMemo(() => _getArrayProp(gapX), [gapX])
  const $gapY = useMemo(() => _getArrayProp(gapY), [gapY])
  const $rows = useMemo(() => _getArrayProp(rows), [rows])

  return (
    <Root
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Grid"
      {...restProps}
      $autoRows={$autoRows}
      $autoCols={$autoCols}
      $autoFlow={$autoFlow}
      $columns={$columns}
      $gap={$gap}
      $gapX={$gapX}
      $gapY={$gapY}
      $rows={$rows}
      forwardedAs={as}
      ref={ref}
    >
      {children}
    </Root>
  )
})
