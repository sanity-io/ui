import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {responsiveGridStyle, ResponsiveGridStyleProps} from '../../styles/internal'
import {Box, BoxProps} from '../box'
import {ResponsiveGridProps} from '../types'

interface GridProps extends Omit<BoxProps, 'display'>, ResponsiveGridProps {}

const Root = styled(Box)<ResponsiveGridStyleProps>(responsiveGridStyle)

export const Grid = forwardRef(
  (props: GridProps & Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'rows'>, ref) => {
    const {
      as: asProp,
      autoRows,
      autoCols,
      autoFlow,
      columns,
      gap,
      gapX,
      gapY,
      rows,
      children,
      ...restProps
    } = props

    return (
      <Root
        data-as={String(asProp)}
        data-ui="Grid"
        {...restProps}
        $autoRows={autoRows}
        $autoCols={autoCols}
        $autoFlow={autoFlow}
        $columns={columns}
        $gap={gap}
        $gapX={gapX}
        $gapY={gapY}
        $rows={rows}
        forwardedAs={asProp}
        ref={ref}
      >
        {children}
      </Root>
    )
  }
)

Grid.displayName = 'Grid'
