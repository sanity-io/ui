import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles/helpers'
import {ElementType, Props} from '../../types/component'
import {Box, BoxOwnProps} from '../box/box'
import {ResponsiveWidthProps} from '../types'
import {containerBaseStyle, responsiveContainerWidthStyle} from './styles'
import {ResponsiveWidthStyleProps} from './types'

/**
 * @public
 */
export interface ContainerOwnProps extends BoxOwnProps, ResponsiveWidthProps {}

/**
 * @public
 */
export type ContainerProps<E extends ElementType = 'div'> = Props<ContainerOwnProps, E>

const StyledContainer = styled(Box)<ResponsiveWidthStyleProps>(
  containerBaseStyle,
  responsiveContainerWidthStyle,
)

const ContainerComponent = function Container(
  props: ContainerOwnProps & {as?: ElementType} & Omit<
      React.HTMLProps<HTMLDivElement>,
      'as' | 'height' | 'width'
    >,
) {
  const {as, ref, width = 2, ...restProps} = props

  return (
    <StyledContainer
      data-ui="Container"
      {...restProps}
      $width={_getArrayProp(width)}
      forwardedAs={as}
      ref={ref}
    />
  )
}

/**
 * The `Container` component wraps content layout in a defined set of widths.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Container = ContainerComponent as unknown as <E extends ElementType = 'div'>(
  props: ContainerProps<E>,
) => React.JSX.Element
