import {ResponsiveProp} from '@sanity/ui/css'
import {Space} from '@sanity/ui/theme'
import {Children, ForwardedRef, forwardRef, useMemo} from 'react'

import {Props} from '../../types'
import {Box, BoxProps} from '../box'

/**
 * @public
 */
export interface InlineProps extends Omit<BoxProps, 'align' | 'display' | 'justify'> {
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
}

/**
 * The `Inline` component is a layout utility for aligning and spacing items horizontally.
 *
 * @public
 */
export const Inline = forwardRef(function Inline(
  props: Props<InlineProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {as, children: childrenProp, gap, gapX, gapY, space, ...restProps} = props

  const children = useMemo(
    () => Children.map(childrenProp, (child) => child && <Box maxWidth="fill">{child}</Box>),
    [childrenProp],
  )

  return (
    <Box
      data-ui="Inline"
      {...restProps}
      align="center"
      as={as}
      display="flex"
      gap={gap ?? space}
      gapX={gapX}
      gapY={gapY}
      ref={ref}
      wrap="wrap"
    >
      {children}
    </Box>
  )
})

Inline.displayName = 'ForwardRef(Inline)'
