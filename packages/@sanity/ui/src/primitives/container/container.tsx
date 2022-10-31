import {forwardRef, memo} from 'react'
import {useArrayProp} from '../../hooks'
import {compose} from '../../styles'
import {Box, BoxProps} from '../box'
import {ResponsiveWidthProps} from '../types'
import {containerBaseStyle, responsiveContainerWidthStyle} from './styles'
import {ResponsiveWidthStyleProps} from './types'

/**
 * @public
 */
export interface ContainerProps extends BoxProps, ResponsiveWidthProps {}

const Root = memo(
  compose<ResponsiveWidthStyleProps>(Box, [containerBaseStyle, responsiveContainerWidthStyle])
)

/**
 * @public
 */
export const Container = forwardRef(function Container(
  props: ContainerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {as, width = 2, ...restProps} = props

  return (
    <Root
      data-ui="Container"
      {...restProps}
      $width={useArrayProp(width)}
      forwardedAs={as}
      ref={ref}
    />
  )
})
