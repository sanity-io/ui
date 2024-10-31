import {memo, type ReactElement} from 'react'

import {Stack} from '../../primitives'
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

export const TreeGroup = memo(function TreeGroup(
  props: Props<TreeGroupProps, 'div'>,
): ReactElement {
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
      marginTop={tree.space}
      role="group"
      gap={tree.space}
    >
      {children}
    </Stack>
  )
})

TreeGroup.displayName = 'TreeGroup'
