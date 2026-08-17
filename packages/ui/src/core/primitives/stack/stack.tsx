import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles/helpers'
import {ElementType, Props} from '../../types/component'
import {Box, BoxOwnProps} from '../box/box'
import {responsiveStackSpaceStyle, ResponsiveStackSpaceStyleProps, stackBaseStyle} from './styles'

/**
 * @public
 */
export interface StackOwnProps extends BoxOwnProps {
  gap?: number | number[]
  /**
   * @deprecated Use `gap` instead.
   */
  space?: never
}

/**
 * @public
 */
export type StackProps<E extends ElementType = 'div'> = Props<StackOwnProps, E>

const StyledStack = styled(Box)<ResponsiveStackSpaceStyleProps>(
  stackBaseStyle,
  responsiveStackSpaceStyle,
)

function StackComponent(
  props: StackOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLDivElement>, 'as'>,
) {
  const {as, gap, ref, ...restProps} = props

  return (
    <StyledStack
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Stack"
      {...restProps}
      $space={_getArrayProp(gap)}
      forwardedAs={as}
      ref={ref}
    />
  )
}

/**
 * The `Stack` component is used to place elements on top of each other.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Stack = StackComponent as unknown as <E extends ElementType = 'div'>(
  props: StackProps<E>,
) => React.JSX.Element
