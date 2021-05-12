import {Box, Card, Code, Tree, TreeItem, useRootTheme, useTheme} from '@sanity/ui'
import {defineScope} from '@sanity/ui-workshop'

import React from 'react'

export default defineScope('theme', 'Theme', [
  {name: 'color', title: 'Color', component: ColorStory},
  {name: 'context', title: 'Context', component: ContextStory},
])

function ColorStory() {
  const theme = useTheme()

  return (
    <Box padding={[4, 5, 6]}>
      <Tree space={1}>
        {Object.entries(theme.sanity.color)
          .filter((v) => v[0] !== 'dark')
          .map(([key, value]) => (
            <ColorGroup key={key} name={key} value={value as any} />
          ))}
      </Tree>
    </Box>
  )
}

function ColorGroup({name, value}: {name: string; value: Record<string, unknown>}) {
  const entries = Object.entries(value)

  return (
    <TreeItem fontSize={1} padding={2} text={name}>
      {entries.map(([key, value]) => {
        if (value && typeof value === 'object') {
          return <ColorGroup key={key} name={key} value={value as Record<string, unknown>} />
        }

        if (typeof value !== 'string') {
          return null
        }

        return <ColorPreview key={key} name={key} value={value} />
      })}
    </TreeItem>
  )
}

function ColorPreview({name, value}: {name: string; value: string}) {
  const text = (
    <>
      <Card
        radius={2}
        style={{
          backgroundColor: value,
          boxShadow: 'inset 0 0 0 1px var(--card-shadow-outline-color)',
          display: 'inline-block',
          height: 17,
          width: 25,
          margin: '0 8px -6px 0',
          verticalAlign: 'top',
        }}
        tone="inherit"
      />
      {name} <code>{value}</code>
    </>
  )

  return <TreeItem fontSize={1} padding={2} text={text} />
}

function ContextStory() {
  const rootTheme = useRootTheme()

  return (
    <Card padding={[4, 5, 6]}>
      <Code language="json">{JSON.stringify(rootTheme, null, 2)}</Code>
    </Card>
  )
}
