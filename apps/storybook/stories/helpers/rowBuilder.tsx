import {ComponentProps, ReactNode} from 'react'

import {Card, Flex} from '../../../../packages/ui/src/core/primitives'
import {ThemeColorSchemeKey} from '../../../../packages/ui/src/theme'

interface RowBuilderProps<T> {
  gap?: ComponentProps<typeof Flex>['gap']
  renderItem: ({value, index}: {value: T; index: number}) => ReactNode
  rows: T[]
  scheme?: ThemeColorSchemeKey
}

export const rowBuilder = function <T>({
  gap = 3,
  renderItem,
  rows,
  scheme,
}: RowBuilderProps<T>): ReactNode {
  return (
    <Card border={!!scheme} padding={scheme ? 4 : 0} radius={scheme ? 2 : 0} scheme={scheme}>
      <Flex gap={gap} wrap="wrap">
        {rows.map((value, index) => renderItem({index, value}))}
      </Flex>
    </Card>
  )
}
