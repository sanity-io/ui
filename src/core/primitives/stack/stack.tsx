import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {Box, BoxProps} from '../box'
import {responsiveStackSpaceStyle, ResponsiveStackSpaceStyleProps, stackBaseStyle} from './styles'

/**
 * @public
 */
export interface StackProps extends BoxProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  gap?: number | number[]
  /**
   * @deprecated Use `gap` instead. `space` will be removed in v4.
   */
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
  const {as, gap, space: deprecated_space, ...restProps} = props
  const spacing = gap === undefined ? deprecated_space : gap

  return (
    <StyledStack
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Stack"
      {...restProps}
      $space={_getArrayProp(spacing)}
      forwardedAs={as}
      ref={ref}
    />
  )
})
Stack.displayName = 'ForwardRef(Stack)'
