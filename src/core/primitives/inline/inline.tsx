import type {ResponsiveProp} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'

import type {Props} from '../../types/props'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/box'

/** @public */
export const DEFAULT_INLINE_ELEMENT = 'div'

/** @public */
export type InlineOwnProps = Omit<
  BoxOwnProps,
  | 'alignItems'
  | 'flexDirection'
  | 'flexWrap'
  | 'justifyContent'
  | 'gridAutoColumns'
  | 'gridAutoFlow'
  | 'gridAutoRows'
  | 'gridColumnEnd'
  | 'gridColumnStart'
  | 'gridColumn'
  | 'gridRowEnd'
  | 'gridRowStart'
  | 'gridRow'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
  // todo: omit deprecated flex and grid props
> & {
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
}

/** @public */
export type InlineElementType = BoxElementType

/** @public */
export type InlineProps<E extends InlineElementType = InlineElementType> = Props<InlineOwnProps, E>

/**
 * The `Inline` component is a layout utility for aligning and spacing items horizontally.
 *
 * @public
 */
export function Inline<E extends InlineElementType = typeof DEFAULT_INLINE_ELEMENT>(
  props: InlineProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_INLINE_ELEMENT,
    children,
    gap,
    space,
    ...rest
  } = props as InlineProps<typeof DEFAULT_INLINE_ELEMENT>

  return (
    <Box
      data-ui="Inline"
      {...rest}
      alignItems="center"
      as={as}
      display="flex"
      gap={gap ?? space}
      flexWrap="wrap"
    >
      {children}
    </Box>
  )
}
