import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Flex,
  Popover,
  Stack,
  Text,
  ThemeProvider,
  Tooltip,
  Tree,
  TreeItem,
  useRootTheme,
} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useCallback, useState} from 'react'

import {BuildStory} from './build/BuildStory'
import {CanvasStory} from './CanvasStory'
import {DebugStory} from './DebugStory'

const meta: Meta = {
  parameters: {controls: {include: []}},
}

export default meta
type Story = StoryObj

export const Debug: Story = {
  parameters: {padding: 0},
  render: () => <DebugStory />,
}

export const Build: Story = {
  parameters: {padding: 0},
  render: () => <BuildStory />,
  // The theme-builder preview renders an enormous DOM which crashes headless
  // Chromium when it runs as a browser test
  tags: ['!test'],
}

export const Canvas: Story = {
  parameters: {padding: 0},
  render: () => <CanvasStory />,
  // The color canvas preview is too heavy to render within the browser test
  // timeout
  tags: ['!test'],
}

export const NestedProvider: Story = {
  render: () => (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <ThemeProvider>
        <Card padding={[3, 4, 5]} radius={3} tone="primary">
          <Text>
            This card is wrapped in a nested <code>ThemeProvider</code>
          </Text>
        </Card>
      </ThemeProvider>
    </Flex>
  ),
}

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
              {/* oxlint-disable-next-line no-deprecated */}
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

        {/* oxlint-disable-next-line no-deprecated */}
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

export const Layer: Story = {
  render: () => <LayerStory />,
}

function ColorStory() {
  const {theme} = useRootTheme()

  // oxlint-disable-next-line no-deprecated
  if (!theme.color) {
    return null
  }

  return (
    <Box padding={[4, 5, 6]}>
      {/* oxlint-disable-next-line no-deprecated */}
      <Tree space={1}>
        {/* oxlint-disable-next-line no-deprecated */}
        {Object.entries(theme.color).map(([key, value]) => (
          <ColorGroup key={key} name={key} value={value} />
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
          // oxlint-disable-next-line no-unsafe-type-assertion
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

export const Color: Story = {
  render: () => <ColorStory />,
  // The color tree preview is too heavy to render as a browser test
  tags: ['!test'],
}
