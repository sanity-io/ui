import {ResponsiveProp} from '@sanity/ui/css'
import {Space} from '@sanity/ui/theme'
import {ForwardedRef, forwardRef} from 'react'

import {Props} from '../../types'
import {Box, BoxProps} from '../box'

/**
 * @public
 */
export interface StackProps extends Omit<BoxProps, 'direction' | 'display' | 'gapX' | 'gapY'> {
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
}

/**
 * The `Stack` component is used to place elements on top of each other.
 *
 * @public
 */
export const Stack = forwardRef(function Stack(
  props: Props<StackProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {as, gap, space, ...restProps} = props

  return (
    <Box
      data-ui="Stack"
      {...restProps}
      as={as}
      direction="column"
      display="flex"
      gap={gap ?? space}
      ref={ref}
    />
  )
})

Stack.displayName = 'ForwardRef(Stack)'
