import {ResponsiveProp} from '@sanity/ui/css'
import {Space} from '@sanity/ui/theme'
import {forwardRef, useMemo, Children, ForwardedRef} from 'react'
import {Box, BoxProps} from '../box'

/**
 * @public
 */
export interface InlineProps
  extends Omit<BoxProps, 'align' | 'display' | 'gap' | 'gapX' | 'gapY' | 'justify'> {
  /** The spacing between children. */
  space?: ResponsiveProp<Space>
}

/**
 * The `Inline` component is a layout utility for aligning and spacing items horizontally.
 *
 * @public
 */
export const Inline = forwardRef(function Inline(
  props: InlineProps & Omit<React.HTMLProps<HTMLDivElement>, 'wrap'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {as, children: childrenProp, space, ...restProps} = props

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
      gap={space}
      ref={ref}
      wrap="wrap"
    >
      {children}
    </Box>
  )
})

Inline.displayName = 'ForwardRef(Inline)'
