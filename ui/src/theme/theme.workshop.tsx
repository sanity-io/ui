import {Box, Card, Code, Flex, Stack, useRootTheme, useTheme} from '@sanity/ui'
import {defineScope} from '@sanity/ui-workshop'

import React, {useState} from 'react'

export default defineScope('theme', 'Theme', [
  {name: 'color', title: 'Color', component: ColorStory},
  {name: 'context', title: 'Context', component: ContextStory},
])

function ColorStory() {
  const theme = useTheme()

  return (
    <Card height="fill" overflow="auto" tone="inherit">
      <Box padding={4}>
        <Stack space={2}>
          {Object.entries(theme.sanity.color)
            .filter((v) => v[0] !== 'dark')
            .map(([key, value]) => (
              <ColorObjectPreview key={key} name={key} value={value as any} />
            ))}
        </Stack>
      </Box>
    </Card>
  )
}

function ContextStory() {
  const rootTheme = useRootTheme()

  return (
    <Card padding={4}>
      <Code language="json">{JSON.stringify(rootTheme, null, 2)}</Code>
    </Card>
  )
}

function Details({
  children,
  open: openProp,
  summary,
}: {
  children?: React.ReactNode
  open?: boolean
  summary?: React.ReactNode
}) {
  const [open, setOpen] = useState(openProp || false)

  return (
    <Card borderLeft paddingLeft={2} tone="inherit">
      <Card as="button" padding={2} radius={2} onClick={() => setOpen((v) => !v)} tone="inherit">
        {summary}
      </Card>
      <Box hidden={!open} paddingX={2} paddingTop={2}>
        {children}
      </Box>
    </Card>
  )
}

function ColorPreview({name, value}: {name: string; value: string}) {
  return (
    <Box>
      <Flex align="center">
        <Card
          radius={2}
          style={{
            backgroundColor: value,
            boxShadow: 'inset 0 0 0 1px var(--card-shadow-outline-color)',
          }}
          paddingTop={5}
          paddingLeft={6}
          tone="inherit"
        />
        <Box flex={1} marginLeft={3}>
          <Code muted>{name}</Code>
        </Box>
      </Flex>
    </Box>
  )
}

function ColorObjectPreview({name, value}: {name: string; value: Record<string, unknown>}) {
  const entries = Object.entries(value)

  return (
    <Details summary={<Code>{name}</Code>}>
      <Stack space={2}>
        {entries.map(([key, value]) => {
          if (value && typeof value === 'object') {
            return (
              <ColorObjectPreview key={key} name={key} value={value as Record<string, unknown>} />
            )
          }

          if (typeof value !== 'string') {
            return null
          }

          return <ColorPreview key={key} name={key} value={value} />
        })}
      </Stack>
    </Details>
  )
}
