import {composeClassNames, container, ContainerStyleProps} from '@sanity/ui/css'
import {forwardRef} from 'react'
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
  props: ContainerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>,
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
