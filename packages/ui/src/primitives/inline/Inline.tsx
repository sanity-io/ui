import {inline, INLINE_STYLE_PROP_KEYS, type InlineStyleProps} from '@sanity/ui-css'

import {_splitKeys} from '../../core/_keys'
import type {Props} from '../../core/types'
import type {BoxElementType} from '../box/Box'

/** @public */
export const DEFAULT_INLINE_ELEMENT = 'div'

/** @public */
export type InlineOwnProps = InlineStyleProps

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
  const [
    styleProps,
    {
      as: Element = DEFAULT_INLINE_ELEMENT,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as InlineProps<typeof DEFAULT_INLINE_ELEMENT>, INLINE_STYLE_PROP_KEYS)

  return <Element data-ui="Inline" {...domProps} className={inline(styleProps)} />
}
