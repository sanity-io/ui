import {ComponentProps, ReactNode} from 'react'
import { Card } from '../../src/core/primitives/card/card'
import { Flex } from '../../src/core/primitives/flex/flex'
import { ThemeColorSchemeKey } from '../../src/theme/system/color/_system'

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
