import {Stack} from '../../primitives'
import {useTree} from './useTree'

export interface TreeGroupProps {
  expanded?: boolean
}

export function TreeGroup(
  props: TreeGroupProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref' | 'role' | 'wrap'>,
): React.JSX.Element {
  const {children, expanded = false, ...restProps} = props
  const tree = useTree()

  return (
    <Stack
      as="ul"
      data-ui="TreeGroup"
      {...restProps}
      hidden={!expanded}
      marginTop={tree.gap}
      role="group"
      gap={tree.gap}
    >
      {children}
    </Stack>
  )
}
