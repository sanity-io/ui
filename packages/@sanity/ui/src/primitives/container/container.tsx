import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Box, BoxProps} from '../box'
import {ResponsiveWidthProps} from '../types'
import {containerBaseStyle, responsiveContainerWidthStyle} from './styles'
import {ResponsiveWidthStyleProps} from './types'

/**
 * @public
 */
export interface ContainerProps extends BoxProps, ResponsiveWidthProps {}

const Root = styled(Box)<ResponsiveWidthStyleProps>(
  containerBaseStyle,
  responsiveContainerWidthStyle
)

/**
 * @public
 */
export const Container = forwardRef(
  (props: ContainerProps & Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'width'>, ref) => {
    const {as, width = 2, ...restProps} = props

    return <Root data-ui="Container" {...restProps} $width={width} forwardedAs={as} ref={ref} />
  }
)

Container.displayName = 'Container'
