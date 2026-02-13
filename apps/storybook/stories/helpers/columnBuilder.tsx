import {Card, Stack} from '@sanity/ui'
import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import type {ComponentProps, ReactNode} from 'react'

interface ColumnBuilderProps<T> {
  gap?: ComponentProps<typeof Stack>['gap']
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
      <Stack gap={gap}>{rows.map((value, index) => renderItem({index, value}))}</Stack>
    </Card>
  )
}
