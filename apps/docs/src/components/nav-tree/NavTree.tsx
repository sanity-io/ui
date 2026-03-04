import {Stack, type StackProps} from '@sanity/ui'

import {NavTreeItem} from './NavTreeItem'
import type {NavTreeNode} from './types'

export interface NavTreeProps extends StackProps<'div'> {
  nodes: NavTreeNode[]
}

export function NavTree(props: NavTreeProps) {
  const {gap = 1, nodes, ...rest} = props

  return (
    <Stack data-ui="NavTree" {...rest} gap={gap}>
      {nodes.map((r) => {
        if (r.hidden) {
          return null
        }

        return <NavTreeItem key={r.path} route={r} />
      })}
    </Stack>
  )
}
