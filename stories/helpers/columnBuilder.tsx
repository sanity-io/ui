import {ComponentProps, ReactNode} from 'react'
import {Card, Stack} from '../../src/core/primitives'
import {ThemeColorSchemeKey} from '../../src/theme'

interface ColumnBuilderProps<T> {
  gap?: ComponentProps<typeof Stack>['space']
  renderItem: ({value, index}: {value: T; index: number}) => ReactNode
  rows: T[]
  scheme?: ThemeColorSchemeKey
}

export const columnBuilder = function <T>({
  gap = 3,
  renderItem,
  rows,
  scheme,
}: ColumnBuilderProps<T>): ReactNode {
  return (
    <Card border={!!scheme} padding={scheme ? 4 : 0} radius={scheme ? 2 : 0} scheme={scheme}>
      <Stack space={gap}>{rows.map((value, index) => renderItem({index, value}))}</Stack>
    </Card>
  )
}
