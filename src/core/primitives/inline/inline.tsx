import type {FlexStyleProps, GridStyleProps, ResponsiveProp} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'

import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box'

/** @public */
export const DEFAULT_INLINE_ELEMENT = 'div'

/** @public */
export type InlineOwnProps = Omit<BoxOwnProps, keyof FlexStyleProps | keyof GridStyleProps> & {
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
) {
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
      align="center"
      as={as}
      display="flex"
      gap={gap ?? space}
      wrap="wrap"
    >
      {children}
    </Box>
  )
}

Inline.displayName = 'Inline'
