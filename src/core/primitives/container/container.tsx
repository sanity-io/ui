import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {useArrayProp} from '../../hooks'
import {Box, BoxProps} from '../box'
import {ResponsiveWidthProps} from '../types'
import {containerBaseStyle, responsiveContainerWidthStyle} from './styles'
import {ResponsiveWidthStyleProps} from './types'

/**
 * @public
 */
export interface ContainerProps extends BoxProps, ResponsiveWidthProps {}

const StyledContainer = styled(Box)<ResponsiveWidthStyleProps>(
  containerBaseStyle,
  responsiveContainerWidthStyle,
)

/**
 * The `Container` component wraps content layout in a defined set of widths.
 *
 * @public
 */
export const Container = forwardRef(function Container(
  props: ContainerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {as, width = 2, ...restProps} = props

  return (
    <StyledContainer
      data-ui="Container"
      {...restProps}
      $width={useArrayProp(width)}
      forwardedAs={as}
      ref={ref}
    />
  )
})
Container.displayName = 'ForwardRef(Container)'
