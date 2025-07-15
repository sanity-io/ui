import {Card, Flex} from '@sanity/ui'
import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import type {ComponentProps, ReactNode} from 'react'

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
    <Card
      border={!!scheme}
      data-ui="row-builder"
      padding={scheme ? 4 : 0}
      radius={scheme ? 2 : 0}
      scheme={scheme}
      tone="inherit"
    >
      <Flex gap={gap} wrap="wrap">
        {rows.map((value, index) => renderItem({index, value}))}
      </Flex>
    </Card>
  )
}
