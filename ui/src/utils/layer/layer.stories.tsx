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
import {withKnobs} from '@storybook/addon-knobs'
import React, {useCallback, useState} from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Utils/Layer',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  return (
    <LayerProvider>
      <Example />
    </LayerProvider>
  )
}

export const multipleRoots = () => {
  return (
    <Stack space={4}>
      <LayerProvider baseDepth={100}>
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
      <LayerProvider baseDepth={200}>
        <Card as={Layer as any} padding={3} shadow={5} style={{top: -50, left: 30}}>
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
  )
}

function LayerDebugInfo() {
  const layer = useLayer()

  return (
    <Code>
      depth={layer.depth}, size={layer.size}
    </Code>
  )
}

function Example() {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <Card radius={2}>
      <Box padding={3}>
        <Text>
          <strong>Root layer</strong>
        </Text>
      </Box>
      <Box padding={3}>
        <Stack space={3}>
          <LayerDebugInfo />
          <Button mode="ghost" onClick={handleOpen} text="Open layer 1" />
          {open && (
            <Layer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Layer1 onClose={handleClose} />
            </Layer>
          )}
        </Stack>
      </Box>
    </Card>
  )
}

function Layer1({onClose}: {onClose: () => void}) {
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
          <Button icon="close" mode="bleed" onClick={onClose} padding={2} />
        </Box>
      </Flex>
      <Box padding={3}>
        <Stack space={3}>
          <LayerDebugInfo />
          <Button mode="ghost" onClick={handleOpen} text="Open layer 2" />
          {open && (
            <Layer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Layer2 onClose={handleClose} />
            </Layer>
          )}
        </Stack>
      </Box>
    </Card>
  )
}

function Layer2({onClose}: {onClose: () => void}) {
  return (
    <Card radius={2} shadow={3}>
      <Flex>
        <Box flex={1} padding={3}>
          <Text>
            <strong>Layer 2</strong>
          </Text>
        </Box>
        <Box padding={1}>
          <Button icon="close" mode="bleed" onClick={onClose} padding={2} />
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
