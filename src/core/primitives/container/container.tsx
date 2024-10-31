import {composeClassNames, container, ContainerStyleProps} from '@sanity/ui/css'
import {ForwardedRef, forwardRef} from 'react'

import {Props} from '../../types'
import {Box, BoxProps} from '../box'

/**
 * @public
 */
export interface ContainerProps extends Omit<BoxProps, 'width'>, ContainerStyleProps {}

/**
 * The `Container` component wraps content layout in a defined set of widths.
 *
 * @public
 */
export const Container = forwardRef(function Container(
  props: Props<ContainerProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {as, className, sizing = 'border', width = 2, ...restProps} = props

  return (
    <Box
      data-ui="Container"
      {...restProps}
      as={as}
      className={composeClassNames(className, container({width}))}
      ref={ref}
      sizing={sizing}
    />
  )
})

Container.displayName = 'ForwardRef(Container)'
