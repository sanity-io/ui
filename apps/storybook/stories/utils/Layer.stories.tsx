import {CloseIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Code,
  Flex,
  Layer,
  LayerProvider,
  Stack,
  Text,
  useLayer,
} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react'
import {useCallback, useState} from 'react'

const meta: Meta = {
  parameters: {controls: {include: []}},
}

export default meta
type Story = StoryObj

function LayerDebugInfo(props: {id?: string}) {
  const {id} = props
  const layer = useLayer()

  return (
    <Code id={id} size={1}>
      {[
        //
        `isTopLayer=${layer.isTopLayer}`,
        `size=${layer.size}`,
        `zIndex=${layer.zIndex}`,
      ].join('\n')}
    </Code>
  )
}

function NestedRoot() {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <LayerProvider>
      <Card radius={2} shadow={1}>
        <Box padding={3}>
          <Text>
            <strong>Root layer</strong>
          </Text>
        </Box>
        <Box padding={3}>
          <Stack space={3}>
            <LayerDebugInfo id="layer-debug-info-1" />
            <Button id="open-layer-1" mode="ghost" onClick={handleOpen} text="Open layer 1" />
            {open && (
              <Layer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <NestedLayer1 onClose={handleClose} />
              </Layer>
            )}
          </Stack>
        </Box>
      </Card>
    </LayerProvider>
  )
}

function NestedLayer1({onClose}: {onClose: () => void}) {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <Card radius={2} shadow={3}>
      <Flex>
        <Box flex={1} padding={3}>
          <Text>
            <strong>Layer 1</strong>
          </Text>
        </Box>
        <Box padding={1}>
          <Button icon={CloseIcon} mode="bleed" onClick={onClose} padding={2} />
        </Box>
      </Flex>
      <Box padding={3}>
        <Stack space={3}>
          <LayerDebugInfo />
          <Button id="open-layer-2" mode="ghost" onClick={handleOpen} text="Open layer 2" />
          {open && (
            <Layer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <NestedLayer2 onClose={handleClose} />
            </Layer>
          )}
        </Stack>
      </Box>
    </Card>
  )
}

function NestedLayer2({onClose}: {onClose: () => void}) {
  return (
    <Card radius={2} shadow={3}>
      <Flex>
        <Box flex={1} padding={3}>
          <Text>
            <strong>Layer 2</strong>
          </Text>
        </Box>
        <Box padding={1}>
          <Button icon={CloseIcon} mode="bleed" onClick={onClose} padding={2} />
        </Box>
      </Flex>
      <Box padding={3}>
        <Stack space={3}>
          <LayerDebugInfo />
        </Stack>
      </Box>
    </Card>
  )
}

export const Nested: Story = {
  render: () => (
    <Box padding={3}>
      <NestedRoot />
      <NestedRoot />
      <NestedRoot />
    </Box>
  ),
}

export const MultipleRoots: Story = {
  render: () => (
    <Stack space={4}>
      <LayerProvider zOffset={100}>
        <Card padding={3} shadow={1}>
          <Stack space={3}>
            <LayerDebugInfo />
            <Layer>
              <Card padding={3} shadow={1}>
                <Stack space={3}>
                  <LayerDebugInfo />
                  <Layer>
                    <Card padding={3} shadow={1}>
                      <LayerDebugInfo />
                    </Card>
                  </Layer>
                </Stack>
              </Card>
            </Layer>
          </Stack>
        </Card>
      </LayerProvider>

      <LayerProvider zOffset={200}>
        <Card as={Layer} padding={3} shadow={5} style={{top: -50, left: 30}}>
          <Stack space={3}>
            <LayerDebugInfo />
            <Layer>
              <Card padding={3} shadow={1}>
                <Stack space={3}>
                  <LayerDebugInfo />
                  <Layer>
                    <Card padding={3} shadow={1}>
                      <LayerDebugInfo />
                    </Card>
                  </Layer>
                </Stack>
              </Card>
            </Layer>
          </Stack>
        </Card>
      </LayerProvider>
    </Stack>
  ),
}

export const ResponsiveZOffset: Story = {
  render: () => (
    <Layer id="responsive-layer" zOffset={[1, 2, 3, 4, 5, 6, 7]}>
      <Card padding={[1, 2, 3, 4, 5, 6, 7]} shadow={1}>
        <LayerDebugInfo />
      </Card>
    </Layer>
  ),
}
