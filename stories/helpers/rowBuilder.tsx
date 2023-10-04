import {ComponentProps, ReactNode} from 'react'
import {Card, Flex} from '../../src/primitives'
import {ThemeColorSchemeKey} from '../../src/theme'

interface RowBuilderProps<T> {
  gap?: ComponentProps<typeof Flex>['gap']
  renderItem: ({value}: {value: T}) => ReactNode
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
        {rows.map((value) => renderItem({value}))}
      </Flex>
    </Card>
  )
}
