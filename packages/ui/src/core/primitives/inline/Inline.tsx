import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'

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
  // eslint-disable-next-line no-warning-comments
  // todo: omit deprecated flex and grid props
>

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
    ...rest
  } = props as InlineProps<typeof DEFAULT_INLINE_ELEMENT>

  return (
    <Box
      data-ui="Inline"
      {...rest}
      alignItems="center"
      as={as}
      display="flex"
      gap={gap}
      flexWrap="wrap"
    >
      {children}
    </Box>
  )
}
