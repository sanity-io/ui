import {Stack} from '../../primitives/stack/stack'
import type {ComponentType, Props} from '../../types'
import {useTree} from './useTree'

/** @public */
export const DEFAULT_TREE_GROUP_ELEMENT = 'div'

/** @public */
export type TreeGroupElementType = 'div' | ComponentType

/** @public */
export type TreeGroupOwnProps = {
  expanded?: boolean
}

/** @public */
export type TreeGroupProps<E extends TreeGroupElementType = TreeGroupElementType> = Props<
  TreeGroupOwnProps,
  E
>

export const TreeGroup = function TreeGroup(
  props: Props<TreeGroupProps, 'div'>,
): React.JSX.Element {
  const {
    children,
    expanded = false,
    ...rest
  } = props as TreeGroupProps<typeof DEFAULT_TREE_GROUP_ELEMENT>

  const tree = useTree()

  return (
    <Stack
      as="ul"
      data-ui="TreeGroup"
      {...rest}
      hidden={!expanded}
      marginTop={tree.gap}
      role="group"
      gap={tree.gap}
    >
      {children}
    </Stack>
  )
}
