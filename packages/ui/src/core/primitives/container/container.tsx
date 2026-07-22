import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {ElementType, Props} from '../../types'
import {Box, BoxOwnProps} from '../box'
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

const ContainerComponent = forwardRef(function Container(
  props: ContainerOwnProps & {as?: ElementType} & Omit<
      React.HTMLProps<HTMLDivElement>,
      'as' | 'height' | 'width'
    >,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {as, width = 2, ...restProps} = props

  return (
    <StyledContainer
      data-ui="Container"
      {...restProps}
      $width={_getArrayProp(width)}
      forwardedAs={as}
      ref={ref}
    />
  )
})

/**
 * The `Container` component wraps content layout in a defined set of widths.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Container = ContainerComponent as unknown as <E extends ElementType = 'div'>(
  props: ContainerProps<E>,
) => React.JSX.Element
