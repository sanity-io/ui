import {_splitKeys, type Props} from '@sanity/ui/core'
import {stack, STACK_STYLE_PROP_KEYS, type StackStyleProps} from '@sanity/ui/css'
import {type BoxElementType} from '@sanity/ui/primitives/box'

/** @public */
export const DEFAULT_STACK_ELEMENT = 'div'

/** @public */
export type StackOwnProps = StackStyleProps

/** @public */
export type StackElementType = BoxElementType

/** @public */
export type StackProps<E extends StackElementType = StackElementType> = Props<StackOwnProps, E>

/**
 * The `Stack` component is used to place elements on top of each other.
 *
 * @public
 */
export function Stack<E extends StackElementType = typeof DEFAULT_STACK_ELEMENT>(
  props: StackProps<E>,
): React.JSX.Element {
  const [
    // split style props
    styleProps,
    {
      as: Element = DEFAULT_STACK_ELEMENT,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as StackProps<typeof DEFAULT_STACK_ELEMENT>, STACK_STYLE_PROP_KEYS)

  return <Element data-ui="Stack" {...domProps} className={stack(styleProps)} />
}
