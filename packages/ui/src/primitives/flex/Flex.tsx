import {_splitKeys, type Props} from '@sanity/ui/core'
import {flex, FLEX_STYLE_PROP_KEYS, type FlexStyleProps} from '@sanity/ui-css'
import {type BoxElementType} from '@sanity/ui/primitives/box'

/** @public */
export const DEFAULT_FLEX_ELEMENT = 'div'

/** @public */
export type FlexOwnProps = FlexStyleProps

/** @public */
export type FlexElementType = BoxElementType

/** @public */
export type FlexProps<E extends FlexElementType = FlexElementType> = Props<FlexOwnProps, E>

/**
 * The `Flex` component is a wrapper component for flexible elements (`Box`, `Card` and `Flex`).
 *
 * @public
 */
export function Flex<E extends FlexElementType = typeof DEFAULT_FLEX_ELEMENT>(
  props: FlexProps<E>,
): React.JSX.Element {
  const [
    // split style props
    styleProps,
    {
      as: Element = DEFAULT_FLEX_ELEMENT,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as FlexProps<typeof DEFAULT_FLEX_ELEMENT>, FLEX_STYLE_PROP_KEYS)

  return <Element data-ui="Flex" {...domProps} className={flex(styleProps)} />
}
