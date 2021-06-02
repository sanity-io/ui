import {
  Box,
  Button,
  Card,
  Code,
  Container,
  Dialog,
  Flex,
  Popover,
  Stack,
  Text,
  Tooltip,
  Tree,
  TreeItem,
  useRootTheme,
  useTheme,
} from '@sanity/ui'
import {defineScope} from '@sanity/ui-workshop'

import React, {useCallback, useState} from 'react'

export default defineScope('theme', 'Theme', [
  {name: 'layer', title: 'Layer', component: LayerStory},
  {name: 'color', title: 'Color', component: ColorStory},
  {name: 'context', title: 'Context', component: ContextStory},
])

function LayerStory() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const openDialog = useCallback(() => setDialogOpen(true), [])
  const closeDialog = useCallback(() => setDialogOpen(false), [])

  return (
    <Flex padding={[4, 5, 6]}>
      <Container>
        {dialogOpen && (
          <Dialog header="Dialog" id="dialog" onClickOutside={closeDialog} onClose={closeDialog}>
            <Box padding={4}>
              <Stack space={[4, 5, 6]}>
                <Popover
                  content={
                    <Box padding={2}>
                      <Text>Popover content</Text>
                    </Box>
                  }
                  open
                  portal
                >
                  <Text>Popover</Text>
                </Popover>

                <Flex>
                  <Tooltip
                    content={
                      <Box padding={2}>
                        <Text>Tooltip content</Text>
                      </Box>
                    }
                    placement="top"
                    portal
                  >
                    <Text size={1}>Tooltip</Text>
                  </Tooltip>
                </Flex>
              </Stack>
            </Box>
          </Dialog>
        )}

        <Stack space={[4, 5, 6]}>
          <Popover
            content={
              <Box padding={2}>
                <Text>Popover content</Text>
              </Box>
            }
            open
            portal
          >
            <Text>Popover</Text>
          </Popover>

          <Flex>
            <Tooltip
              content={
                <Box padding={2}>
                  <Text size={1}>Tooltip content</Text>
                </Box>
              }
              placement="top"
              portal
            >
              <Text>Tooltip</Text>
            </Tooltip>
          </Flex>

          <Button onClick={openDialog} text="Open dialog" />
        </Stack>
      </Container>
    </Flex>
  )
}

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
