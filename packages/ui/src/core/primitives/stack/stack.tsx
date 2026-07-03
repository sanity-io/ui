import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {ElementType, Props} from '../../types'
import {Box, BoxOwnProps} from '../box'
import {responsiveStackSpaceStyle, ResponsiveStackSpaceStyleProps, stackBaseStyle} from './styles'

/**
 * @public
 */
export interface StackOwnProps extends BoxOwnProps {
  gap?: number | number[]
  /**
   * @deprecated Use `gap` instead. `space` will be removed in v4.
   */
  space?: number | number[]
}

/**
 * @public
 */
export type StackProps<E extends ElementType = 'div'> = Props<StackOwnProps, E>

const StyledStack = styled(Box)<ResponsiveStackSpaceStyleProps>(
  stackBaseStyle,
  responsiveStackSpaceStyle,
)

const StackComponent = forwardRef(function Stack(
  props: StackOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  // oxlint-disable-next-line no-deprecated
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
StackComponent.displayName = 'ForwardRef(Stack)'

/**
 * The `Stack` component is used to place elements on top of each other.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Stack = StackComponent as unknown as <E extends ElementType = 'div'>(
  props: StackProps<E>,
) => React.JSX.Element
