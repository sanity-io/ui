import {ResponsiveProp} from '@sanity/ui/css'
import {Space} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {Box, BoxProps} from '../box'

/**
 * @public
 */
export interface StackProps
  extends Omit<BoxProps, 'direction' | 'display' | 'gap' | 'gapX' | 'gapY'> {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  space?: ResponsiveProp<Space>
}

/**
 * The `Stack` component is used to place elements on top of each other.
 *
 * @public
 */
export const Stack = forwardRef(function Stack(
  props: StackProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {as, space, ...restProps} = props

  return (
    <Box
      // as={as}
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Stack"
      {...restProps}
      as={as}
      direction="column"
      display="flex"
      // forwardedAs={as}
      gapY={space}
      ref={ref}
    />
  )
})

Stack.displayName = 'ForwardRef(Stack)'
