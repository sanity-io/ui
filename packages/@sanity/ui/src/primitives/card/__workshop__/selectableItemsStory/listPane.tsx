import {Card, CardTone, Stack, Text} from '@sanity/ui'
import React from 'react'
import {ExamplePreview} from './examplePreview'
import {PaneItem} from './paneItem'

export function ListPane(props: {
  active: boolean
  borderLeft?: boolean
  loading?: boolean
  onSelect: (id: string) => void
  selectedId: string | null
  tone?: CardTone
}) {
  const {active, borderLeft, loading, onSelect, selectedId, tone} = props

  return (
    <Card borderLeft={borderLeft} flex={1} overflow="hidden" tone={tone}>
      <Card padding={4} shadow={1} tone="inherit">
        <Text weight="semibold">List</Text>
      </Card>
      <Stack padding={3} space={1}>
        <PaneItem active={active} onClick={() => onSelect('a')} selected={selectedId === 'a'}>
          <ExamplePreview loading={loading} />
        </PaneItem>
        <PaneItem active={active} onClick={() => onSelect('b')} selected={selectedId === 'b'}>
          <ExamplePreview loading={loading} />
        </PaneItem>
        <PaneItem active={active} onClick={() => onSelect('c')} selected={selectedId === 'c'}>
          <ExamplePreview loading={loading} />
        </PaneItem>
        <PaneItem active={active} onClick={() => onSelect('d')} selected={selectedId === 'd'}>
          <ExamplePreview loading={loading} />
        </PaneItem>
        <PaneItem active={active} onClick={() => onSelect('e')} selected={selectedId === 'e'}>
          <ExamplePreview loading={loading} />
        </PaneItem>
        <PaneItem active={active} onClick={() => onSelect('f')} selected={selectedId === 'f'}>
          <ExamplePreview loading={loading} />
        </PaneItem>
      </Stack>
    </Card>
  )
}
