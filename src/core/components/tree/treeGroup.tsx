import {memo, ReactElement} from 'react'

import {Stack} from '../../primitives'
import {Props} from '../../types'
import {useTree} from './useTree'

export interface TreeGroupProps {
  expanded?: boolean
}

export const TreeGroup = memo(function TreeGroup(
  props: Props<TreeGroupProps, 'div'>,
): ReactElement {
  const {children, expanded = false, ...restProps} = props
  const tree = useTree()

  return (
    <Stack
      as="ul"
      data-ui="TreeGroup"
      {...restProps}
      hidden={!expanded}
      marginTop={tree.space}
      role="group"
      space={tree.space}
    >
      {children}
    </Stack>
  )
})
