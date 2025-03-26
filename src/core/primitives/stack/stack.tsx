import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {useArrayProp} from '../../hooks'
import {Box, BoxProps} from '../box'
import {responsiveStackSpaceStyle, ResponsiveStackSpaceStyleProps, stackBaseStyle} from './styles'

/**
 * @public
 */
export interface StackProps extends BoxProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  space?: number | number[]
}

const StyledStack = styled(Box)<ResponsiveStackSpaceStyleProps>(
  stackBaseStyle,
  responsiveStackSpaceStyle,
)

/**
 * The `Stack` component is used to place elements on top of each other.
 *
 * @public
 */
export const Stack = forwardRef(function Stack(
  props: StackProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {as, space, ...restProps} = props

  return (
    <StyledStack
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Stack"
      {...restProps}
      $space={useArrayProp(space)}
      forwardedAs={as}
      ref={ref}
    />
  )
})
Stack.displayName = 'ForwardRef(Stack)'
