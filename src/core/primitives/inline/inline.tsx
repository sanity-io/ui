import {forwardRef, useMemo, Children} from 'react'
import {styled} from 'styled-components'
import {_getArrayProp} from '../../styles'
import {Box, BoxProps} from '../box'
import {inlineBaseStyle, inlineSpaceStyle} from './styles'
import {ResponsiveInlineSpaceStyleProps} from './types'

/**
 * @public
 */
export interface InlineProps extends Omit<BoxProps, 'display'> {
  /** The spacing between children. */
  space?: number | number[]
}

const Root = styled(Box)<ResponsiveInlineSpaceStyleProps>(inlineBaseStyle, inlineSpaceStyle)

/**
 * The `Inline` component is a layout utility for aligning and spacing items horizontally.
 *
 * @public
 */
export const Inline = forwardRef(function Inline(
  props: InlineProps & React.HTMLProps<HTMLDivElement>,
  ref,
) {
  const {as, children: childrenProp, space, ...restProps} = props

  const $space = useMemo(() => _getArrayProp(space), [space])
  const children = useMemo(
    () => Children.map(childrenProp, (child) => child && <div>{child}</div>),
    [childrenProp],
  )

  return (
    <Root
      data-ui="Inline"
      {...restProps}
      $space={$space}
      forwardedAs={as}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
    >
      {children}
    </Root>
  )
})
